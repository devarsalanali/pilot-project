# backend/app/routes/detection.py

from fastapi import APIRouter, HTTPException, Depends
from app.core.security import get_api_key
from app.ai.detection_service import start_detection, stop_detection

router = APIRouter()

@router.post("/start/{camera_id}", dependencies=[Depends(get_api_key)])
def start_detection_route(camera_id: str):
    """
    Start continuous face detection on a specific camera.
    """
    try:
        start_detection(camera_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error starting detection: {e}")
    return {"detail": f"Detection started for camera {camera_id}"}

@router.post("/stop/{camera_id}", dependencies=[Depends(get_api_key)])
def stop_detection_route(camera_id: str):
    """
    Stop continuous face detection on a specific camera.
    """
    try:
        stop_detection(camera_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error stopping detection: {e}")
    return {"detail": f"Detection stopped for camera {camera_id}"}
