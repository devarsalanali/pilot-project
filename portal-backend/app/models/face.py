from pydantic import BaseModel
from typing import Optional, Any

class Face(BaseModel):
    id: Optional[str] = None
    name: str
    image: Optional[str] = None
    extra_data: Optional[Any] = None
    embedding: Optional[Any] = None

    class Config:
        from_attributes = True
