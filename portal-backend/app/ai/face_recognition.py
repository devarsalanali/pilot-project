# backend/app/ai/face_recognition.py

import base64
import numpy as np
from io import BytesIO
from PIL import Image
from facenet_pytorch import MTCNN, InceptionResnetV1

# Initialize the models (you might want to load them once at startup)
mtcnn = MTCNN(image_size=160, margin=0)
resnet = InceptionResnetV1(pretrained='vggface2').eval()

def decode_base64_image(base64_str: str) -> Image.Image:
    """Decode a base64-encoded image into a PIL Image."""
    try:
        image_data = base64.b64decode(base64_str)
        image = Image.open(BytesIO(image_data)).convert("RGB")
        return image
    except Exception as e:
        raise ValueError("Invalid image data") from e

def get_face_embedding_from_base64(base64_str: str):
    """Return a face embedding vector from a base64-encoded image."""
    image = decode_base64_image(base64_str)
    # Use MTCNN to detect and align the face
    face_tensor = mtcnn(image)
    if face_tensor is None:
        return None  # No face detected
    # Get the embedding from the face
    embedding = resnet(face_tensor.unsqueeze(0))
    return embedding.detach().numpy()[0]

def is_unknown_face(embedding, known_embeddings, threshold=0.8) -> bool:
    """
    Compare the given embedding with a list of known embeddings.
    Return True if the minimum distance is greater than threshold.
    """
    if embedding is None or not known_embeddings:
        # If no embedding is provided or no known faces exist, consider it unknown.
        return True
    distances = [np.linalg.norm(embedding - known) for known in known_embeddings]
    min_distance = min(distances)
    return min_distance > threshold
