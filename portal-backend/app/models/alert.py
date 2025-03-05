from pydantic import BaseModel, Field
from uuid import uuid4, UUID
from datetime import datetime

class Alert(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    camera_id: UUID
    face_snapshot: str = ""  # Base64 encoded image string
    confidence: float
    description: str = "Unknown face detected"
