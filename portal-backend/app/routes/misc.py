from fastapi import APIRouter, Depends
from app.utils.logger import log_info
from app.core.security import get_api_key

router = APIRouter()

@router.post("/sync", tags=["Misc"], dependencies=[Depends(get_api_key)])
def sync_data():
    log_info("Data sync initiated.")
    return {"detail": "Sync initiated"}

@router.get("/video/snapshot", tags=["Misc"], dependencies=[Depends(get_api_key)])
def video_snapshot():
    log_info("Video snapshot requested.")
    return {"snapshot": "dummy_base64_image_string"}

@router.get("/logs", tags=["Misc"], dependencies=[Depends(get_api_key)])
def get_logs():
    log_info("Logs endpoint accessed.")
    return {"detail": "Logs are available in the console."}
