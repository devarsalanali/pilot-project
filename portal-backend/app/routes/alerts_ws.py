# backend/app/routes/alerts_ws.py

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
import asyncio
from app.db.database import get_db
from app.db.models import Alert as AlertDB
from app.utils.logger import log_info, log_error

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        log_info("WebSocket connection accepted.")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            log_info("WebSocket connection removed.")

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception as e:
                log_error(f"Error sending message: {e}")

manager = ConnectionManager()

@router.websocket("/ws/alerts")
async def alerts_websocket(websocket: WebSocket, db: Session = Depends(get_db)):
    """
    A WebSocket endpoint that polls for the latest alerts every 5 seconds
    and sends them to connected clients.
    """
    await manager.connect(websocket)
    try:
        while True:
            # For demonstration, fetch the 5 most recent alerts
            alerts = db.query(AlertDB).order_by(AlertDB.timestamp.desc()).limit(5).all()
            alerts_data = [
                {
                    "id": alert.id,
                    "timestamp": alert.timestamp.isoformat(),
                    "camera_id": alert.camera_id,
                    "description": alert.description,
                    "confidence": alert.confidence,
                    "face_snapshot": alert.face_snapshot
                }
                for alert in alerts
            ]
            await websocket.send_json({"alerts": alerts_data})
            await asyncio.sleep(5)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        log_info("WebSocket client disconnected.")
