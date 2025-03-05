# backend/app/routes/streams.py
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Dict
import signal

from app.db.database import get_db
from app.db.models import Camera as CameraDB
from app.utils.logger import log_info
from app.core.security import get_api_key  # If you want to secure these endpoints
from app.streams.ffmpeg import start_ffmpeg_transcode

router = APIRouter()

# In-memory storage for FFmpeg processes {camera_id: subprocess.Popen}
ffmpeg_processes: Dict[str, "subprocess.Popen"] = {}

@router.post("/start/{camera_id}", dependencies=[Depends(get_api_key)])
def start_stream(camera_id: str, db: Session = Depends(get_db)):
    """
    Launch an FFmpeg process to transcode the RTSP feed for a specific camera.
    """
    # Check if we're already streaming this camera
    if camera_id in ffmpeg_processes:
        raise HTTPException(status_code=400, detail="Stream already running for this camera")

    # Lookup camera in DB
    camera = db.query(CameraDB).filter(CameraDB.id == camera_id).first()
    if not camera:
        raise HTTPException(status_code=404, detail="Camera not found")

    rtsp_url = camera.rtsp_url
    if not rtsp_url:
        raise HTTPException(status_code=400, detail="No RTSP URL for this camera")

    # Spawn FFmpeg
    process = start_ffmpeg_transcode(rtsp_url, camera_id)
    ffmpeg_processes[camera_id] = process
    log_info(f"Started FFmpeg process for camera: {camera_id}")

    return {"detail": "Transcoding started", "camera_id": camera_id}

@router.post("/stop/{camera_id}", dependencies=[Depends(get_api_key)])
def stop_stream(camera_id: str):
    """
    Stop the FFmpeg process for a specific camera, if running.
    """
    process = ffmpeg_processes.pop(camera_id, None)
    if not process:
        raise HTTPException(status_code=404, detail="No active process for this camera")

    # Gracefully terminate
    process.send_signal(signal.SIGTERM)
    log_info(f"Stopped FFmpeg process for camera: {camera_id}")

    return {"detail": "Transcoding stopped", "camera_id": camera_id}
