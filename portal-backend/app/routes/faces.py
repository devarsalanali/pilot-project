from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List, Any, Optional
from app.models.face import Face  # Pydantic model
from app.db.database import get_db
from app.db.models import Face as FaceDB  # SQLAlchemy model
from app.utils.logger import log_info, log_error
from app.core.security import get_api_key
from app.ai.face_recognition import get_face_embedding_from_base64

router = APIRouter()

@router.get("/", response_model=List[Face], dependencies=[Depends(get_api_key)])
def get_faces(db: Session = Depends(get_db)):
    faces = db.query(FaceDB).all()
    log_info("Fetched all faces.")
    return faces

@router.get("/{face_id}", response_model=Face, dependencies=[Depends(get_api_key)])
def get_face(face_id: UUID, db: Session = Depends(get_db)):
    face = db.query(FaceDB).filter(FaceDB.id == str(face_id)).first()
    if face is None:
        log_error(f"Face not found: {face_id}")
        raise HTTPException(status_code=404, detail="Face not found")
    log_info(f"Fetched face: {face_id}")
    return face

@router.post("/", response_model=Face, dependencies=[Depends(get_api_key)])
def create_face(face: Face, db: Session = Depends(get_db)):
    # If an image is provided, generate its embedding
    embedding: Optional[Any] = None
    if face.image:
        try:
            embedding_array = get_face_embedding_from_base64(face.image)
            if embedding_array is not None:
                embedding = embedding_array.tolist()
        except Exception as e:
            log_error(f"Error generating embedding: {e}")
            raise HTTPException(status_code=400, detail="Failed to generate face embedding")
    
    # Build data dictionary without explicitly setting 'id' if it's None
    data = {
        "name": face.name,
        "image": face.image,
        "extra_data": face.extra_data,
        "embedding": embedding
    }
    # Only pass an id if provided (non-None)
    if face.id is not None:
        data["id"] = str(face.id)
    
    face_db = FaceDB(**data)
    db.add(face_db)
    db.commit()
    db.refresh(face_db)
    log_info(f"Created face with id: {face_db.id}")
    return face_db

@router.put("/{face_id}", response_model=Face, dependencies=[Depends(get_api_key)])
def update_face(face_id: UUID, updated_face: Face, db: Session = Depends(get_db)):
    face_db = db.query(FaceDB).filter(FaceDB.id == str(face_id)).first()
    if face_db is None:
        log_error(f"Attempted update on non-existent face: {face_id}")
        raise HTTPException(status_code=404, detail="Face not found")
    
    face_db.name = updated_face.name
    face_db.image = updated_face.image
    face_db.extra_data = updated_face.extra_data
    
    # Regenerate embedding if a new image is provided
    if updated_face.image:
        try:
            embedding_array = get_face_embedding_from_base64(updated_face.image)
            if embedding_array is not None:
                face_db.embedding = embedding_array.tolist()
        except Exception as e:
            log_error(f"Error updating embedding: {e}")
            raise HTTPException(status_code=400, detail="Failed to generate updated face embedding")
    
    db.commit()
    db.refresh(face_db)
    log_info(f"Updated face with id: {face_id}")
    return face_db

@router.delete("/{face_id}", dependencies=[Depends(get_api_key)])
def delete_face(face_id: UUID, db: Session = Depends(get_db)):
    face_db = db.query(FaceDB).filter(FaceDB.id == str(face_id)).first()
    if face_db is None:
        log_error(f"Attempted deletion on non-existent face: {face_id}")
        raise HTTPException(status_code=404, detail="Face not found")
    db.delete(face_db)
    db.commit()
    log_info(f"Deleted face with id: {face_id}")
    return {"detail": "Face deleted"}
