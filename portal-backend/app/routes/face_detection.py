# backend/app/routes/face_detection.py

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.ai.face_recognition import get_face_embedding_from_base64, is_unknown_face
from app.utils.logger import log_info
from app.core.security import get_api_key  # if you want to secure this endpoint

router = APIRouter()

# For demonstration, we simulate known face embeddings.
# In a production scenario, you’d retrieve these from your database.
KNOWN_EMBEDDINGS = [
    # For example, numpy arrays representing embeddings of known faces.
    # np.array([...]), np.array([...]), etc.
]

class FaceDetectionRequest(BaseModel):
    image_base64: str

@router.post("/detect-face", dependencies=[Depends(get_api_key)])
def detect_face(request: FaceDetectionRequest):
    embedding = get_face_embedding_from_base64(request.image_base64)
    if embedding is None:
        raise HTTPException(status_code=400, detail="No face detected in the image")
    unknown = is_unknown_face(embedding, KNOWN_EMBEDDINGS)
    log_info(f"Face detection performed. Unknown: {unknown}")
    return {"unknown": unknown}
