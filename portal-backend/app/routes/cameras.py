from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from typing import List
from app.models.camera import Camera  # Pydantic model
from app.db.database import get_db
from app.db.models import Camera as CameraDB  # SQLAlchemy model
from app.utils.logger import log_info, log_error
from app.core.security import get_api_key  # Import the security dependency

router = APIRouter()

@router.get("/", response_model=List[Camera], dependencies=[Depends(get_api_key)])
def get_cameras(db: Session = Depends(get_db)):
    cameras = db.query(CameraDB).all()
    log_info("Fetched all cameras.")
    return cameras

@router.get("/{camera_id}", response_model=Camera, dependencies=[Depends(get_api_key)])
def get_camera(camera_id: UUID, db: Session = Depends(get_db)):
    camera = db.query(CameraDB).filter(CameraDB.id == str(camera_id)).first()
    if camera is None:
        log_error(f"Camera not found: {camera_id}")
        raise HTTPException(status_code=404, detail="Camera not found")
    log_info(f"Fetched camera: {camera_id}")
    return camera

@router.post("/", response_model=Camera, dependencies=[Depends(get_api_key)])
def create_camera(camera: Camera, db: Session = Depends(get_db)):
    camera_db = CameraDB(
        id=str(camera.id),
        name=camera.name,
        location=camera.location,
        rtsp_url=camera.rtsp_url,
        username=camera.username,
        password=camera.password
    )
    db.add(camera_db)
    db.commit()
    db.refresh(camera_db)
    log_info(f"Created camera with id: {camera_db.id}")
    return camera_db

@router.put("/{camera_id}", response_model=Camera, dependencies=[Depends(get_api_key)])
def update_camera(camera_id: UUID, updated_camera: Camera, db: Session = Depends(get_db)):
    camera_db = db.query(CameraDB).filter(CameraDB.id == str(camera_id)).first()
    if camera_db is None:
        log_error(f"Attempted update on non-existent camera: {camera_id}")
        raise HTTPException(status_code=404, detail="Camera not found")
    camera_db.name = updated_camera.name
    camera_db.location = updated_camera.location
    camera_db.rtsp_url = updated_camera.rtsp_url
    camera_db.username = updated_camera.username
    camera_db.password = updated_camera.password
    db.commit()
    db.refresh(camera_db)
    log_info(f"Updated camera with id: {camera_id}")
    return camera_db

@router.delete("/{camera_id}", dependencies=[Depends(get_api_key)])
def delete_camera(camera_id: UUID, db: Session = Depends(get_db)):
    camera_db = db.query(CameraDB).filter(CameraDB.id == str(camera_id)).first()
    if camera_db is None:
        log_error(f"Attempted deletion on non-existent camera: {camera_id}")
        raise HTTPException(status_code=404, detail="Camera not found")
    db.delete(camera_db)
    db.commit()
    log_info(f"Deleted camera with id: {camera_id}")
    return {"detail": "Camera deleted"}
