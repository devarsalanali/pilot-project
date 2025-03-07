import cv2
import time
import threading
import numpy as np
import base64
from datetime import datetime

from app.db.database import SessionLocal
from app.db.models import Camera as CameraDB, Alert as AlertDB, Face as FaceDB
from app.ai.face_recognition import get_face_embedding_from_base64, is_unknown_face
from app.utils.logger import log_info, log_error

def get_face_embedding_from_cv2(image_bgr: np.ndarray) -> np.ndarray:
    """
    Convert an OpenCV BGR image to a base64-encoded JPEG,
    then generate and return its face embedding using the existing function.
    """
    ret, buffer = cv2.imencode('.jpg', image_bgr)
    if not ret:
        log_error("Failed to encode image to JPEG")
        return None
    base64_str = base64.b64encode(buffer).decode('utf-8')
    try:
        embedding = get_face_embedding_from_base64(base64_str)
        return embedding
    except Exception as e:
        log_error(f"Error generating embedding from CV2 image: {e}")
        return None

def load_known_embeddings(db) -> list:
    """
    Load known face embeddings from the database.
    Returns a list of NumPy arrays for each known face embedding.
    """
    known_faces = db.query(FaceDB).all()
    embeddings = []
    for face in known_faces:
        if face.embedding is not None:
            try:
                emb = np.array(face.embedding, dtype=np.float32)
                embeddings.append(emb)
            except Exception as e:
                log_error(f"Error loading embedding for face {face.id}: {e}")
    log_info(f"Loaded {len(embeddings)} known embeddings")
    return embeddings

def create_alert(camera_id: str, frame: np.ndarray):
    """
    Create an alert in the database when an unknown face is detected.
    The frame is encoded to JPEG and then to base64 for storage.
    """
    ret, buffer = cv2.imencode('.jpg', frame)
    if not ret:
        log_error("Failed to encode frame for alert")
        return
    b64_str = base64.b64encode(buffer).decode("utf-8")
    
    db = SessionLocal()
    try:
        alert = AlertDB(
            camera_id=camera_id,
            face_snapshot=b64_str,
            confidence=0.99,  # Example confidence value
            description="Unknown face detected",
            timestamp=datetime.utcnow()
        )
        db.add(alert)
        db.commit()
        log_info(f"Alert created for camera {camera_id} at {datetime.utcnow()}")
    except Exception as e:
        log_error(f"Error creating alert for camera {camera_id}: {e}")
    finally:
        db.close()

def detection_loop(camera_id: str, stop_event: threading.Event):
    """
    Continuously capture frames from the camera's RTSP stream, detect faces,
    generate embeddings, compare with known embeddings, and create alerts if needed.
    """
    db = SessionLocal()
    camera = db.query(CameraDB).filter(CameraDB.id == camera_id).first()
    if not camera:
        log_error(f"Camera {camera_id} not found in DB.")
        db.close()
        return

    rtsp_url = camera.rtsp_url
    if not rtsp_url:
        log_error(f"No RTSP URL found for camera {camera_id}.")
        db.close()
        return

    # Load known embeddings once for this detection loop
    known_embeddings = load_known_embeddings(db)
    db.close()

    cap = cv2.VideoCapture(rtsp_url)
    if not cap.isOpened():
        log_error(f"Failed to open RTSP stream for camera {camera_id}.")
        return

    # Using Haar cascade for face detection (simple demonstration)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

    log_info(f"Starting detection loop for camera {camera_id}.")
    while not stop_event.is_set():
        ret, frame = cap.read()
        if not ret:
            log_error(f"Failed to read frame for camera {camera_id}.")
            time.sleep(1)
            continue

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

        for (x, y, w, h) in faces:
            face_roi = frame[y:y+h, x:x+w]
            embedding = get_face_embedding_from_cv2(face_roi)
            if embedding is None:
                continue

            # Check if the face is unknown
            if is_unknown_face(embedding, known_embeddings):
                log_info(f"Unknown face detected on camera {camera_id}.")
                create_alert(camera_id, frame)
        time.sleep(0.5)  # Adjust delay as needed

    cap.release()
    log_info(f"Detection loop stopped for camera {camera_id}.")

# Dictionary to keep track of active detection threads per camera
detection_threads = {}

def start_detection(camera_id: str):
    """
    Start a background detection thread for the specified camera.
    """
    if camera_id in detection_threads:
        log_info(f"Detection already running for camera {camera_id}.")
        return
    stop_event = threading.Event()
    thread = threading.Thread(target=detection_loop, args=(camera_id, stop_event), daemon=True)
    detection_threads[camera_id] = (thread, stop_event)
    thread.start()
    log_info(f"Detection thread started for camera {camera_id}.")

def stop_detection(camera_id: str):
    """
    Stop the background detection thread for the specified camera.
    """
    if camera_id not in detection_threads:
        log_info(f"No detection running for camera {camera_id}.")
        return
    thread, stop_event = detection_threads.pop(camera_id)
    stop_event.set()
    thread.join()
    log_info(f"Detection thread stopped for camera {camera_id}.")
