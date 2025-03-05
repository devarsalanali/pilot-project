import uuid
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Camera(Base):
    __tablename__ = "cameras"
    __table_args__ = {'extend_existing': True}  # Optional: allows redefinition in development
    id = Column(String, primary_key=True, index=True, default=generate_uuid)
    name = Column(String, nullable=False)
    location = Column(String, default="")
    rtsp_url = Column(String, nullable=False)
    username = Column(String, nullable=True)
    password = Column(String, nullable=True)

    alerts = relationship("Alert", back_populates="camera", cascade="all, delete")

class Alert(Base):
    __tablename__ = "alerts"
    __table_args__ = {'extend_existing': True}
    id = Column(String, primary_key=True, index=True, default=generate_uuid)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    camera_id = Column(String, ForeignKey("cameras.id"), nullable=False)
    face_snapshot = Column(String, default="")  # Base64 encoded image string
    confidence = Column(Float, nullable=False)
    description = Column(String, default="Unknown face detected")

    camera = relationship("Camera", back_populates="alerts")

class Face(Base):
    __tablename__ = "faces"
    __table_args__ = {'extend_existing': True}
    id = Column(String, primary_key=True, index=True, default=generate_uuid)
    name = Column(String, nullable=False)
    image = Column(String, nullable=True)
    extra_data = Column(JSON, nullable=True)  # Renamed from "metadata"
    embedding = Column(JSON, nullable=True)
