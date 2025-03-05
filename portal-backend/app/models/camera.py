from pydantic import BaseModel, Field
from uuid import uuid4, UUID
from typing import Optional

class Camera(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str
    location: str = ""
    rtsp_url: str
    username: Optional[str] = None
    password: Optional[str] = None
