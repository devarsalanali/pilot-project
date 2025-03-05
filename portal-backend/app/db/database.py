from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import uuid

SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def generate_uuid():
    return str(uuid.uuid4())

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
