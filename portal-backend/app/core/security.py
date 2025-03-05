from fastapi import Header, HTTPException
from starlette.status import HTTP_403_FORBIDDEN

API_KEY = "mysecretapikey"  # In production, store this securely (e.g., environment variable)
API_KEY_NAME = "X-API-Key"

def get_api_key(api_key: str = Header(...)):
    if api_key != API_KEY:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials"
        )
    return api_key
