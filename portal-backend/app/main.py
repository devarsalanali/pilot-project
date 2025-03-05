from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session
from app.routes import cameras, alerts, faces, misc,streams,face_detection,detection
from app.db.database import engine, get_db
from app.db import models  # This registers the models with Base
from app.utils.logger import log_info
from app.db.models import Camera as CameraDB, Alert as AlertDB, Face as FaceDB
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os

# Create the tables in the database (if they don't exist)
models.Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    log_info("Application startup: Tables created and routers included.")
    yield
    # Shutdown logic (optional)
    log_info("Application shutdown.")

# Create a single FastAPI app instance with the lifespan handler
app = FastAPI(title="Edge Device API",redirect_slashes=False, lifespan=lifespan)

# Allow all origins for development (adjust for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the absolute path to the `backend/hls` directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # this is `backend/app/`
HLS_DIR = os.path.join(BASE_DIR, "..", "hls")          # now points to `backend/hls`

app.mount("/hls", StaticFiles(directory=HLS_DIR), name="hls")

# Include routers from different modules
app.include_router(cameras.router, prefix="/cameras", tags=["Cameras"])
app.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])
app.include_router(faces.router, prefix="/faces", tags=["Faces"])
app.include_router(misc.router, prefix="/misc", tags=["Misc"])
app.include_router(streams.router, prefix="/streams", tags=["Streams"])
app.include_router(face_detection.router, prefix="/face-detection", tags=["FaceDetection"])
app.include_router(detection.router, prefix="/detection", tags=["Detection"])

@app.get("/health", tags=["Health"])
def health_check():
    log_info("Health check endpoint accessed.")
    return {"status": "OK"}

@app.get("/status", tags=["Status"])
def status(db: Session = Depends(get_db)):
    cameras_count = db.query(CameraDB).count()
    alerts_count = db.query(AlertDB).count()
    faces_count = db.query(FaceDB).count()
    log_info("Status endpoint accessed.")
    return {
        "uptime": "unknown",
        "cameras_count": cameras_count,
        "alerts_count": alerts_count,
        "faces_count": faces_count
    }
