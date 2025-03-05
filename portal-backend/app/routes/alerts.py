from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from app.models.alert import Alert  # Pydantic model
from app.db.database import get_db
from app.db.models import Alert as AlertDB  # SQLAlchemy model
from app.utils.logger import log_info, log_error
from app.core.security import get_api_key

router = APIRouter()

@router.get("/", response_model=List[Alert], dependencies=[Depends(get_api_key)])
def get_alerts(db: Session = Depends(get_db)):
    alerts = db.query(AlertDB).all()
    log_info("Fetched all alerts.")
    return alerts

@router.post("/", response_model=Alert, dependencies=[Depends(get_api_key)])
def create_alert(alert: Alert, db: Session = Depends(get_db)):
    alert_db = AlertDB(
        id=str(alert.id),
        camera_id=str(alert.camera_id),
        face_snapshot=alert.face_snapshot,
        confidence=alert.confidence,
        description=alert.description
    )
    db.add(alert_db)
    db.commit()
    db.refresh(alert_db)
    log_info(f"Created alert with id: {alert_db.id}")
    return alert_db
