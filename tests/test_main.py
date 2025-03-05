import sys
import os

# 1. Calculate paths
current_dir = os.path.dirname(os.path.abspath(__file__))  # Path to tests/ directory
portal_backend_path = os.path.join(current_dir, "..", "portal-backend")

# 2. Insert the portal-backend path into sys.path
sys.path.insert(0, portal_backend_path)

# 3. Now you can import from 'app'
from fastapi.testclient import TestClient
from app.main import app  # <-- This assumes main.py is inside portal-backend/app

client = TestClient(app)

API_KEY_HEADER = {"X-API-Key": "mysecretapikey"}

def test_health():
    response = client.get("/health", headers=API_KEY_HEADER)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "OK"

def test_status():
    response = client.get("/status", headers=API_KEY_HEADER)
    assert response.status_code == 200
    data = response.json()
    assert "uptime" in data
    assert "cameras_count" in data
    assert "alerts_count" in data
    assert "faces_count" in data
