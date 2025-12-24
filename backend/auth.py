import os
import jwt
import bcrypt
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends, Header
from dotenv import load_dotenv

load_dotenv()

# Secret key for JWT - change this in production!
SECRET_KEY = os.getenv("SECRET_KEY", "your-super-secret-key-change-this-in-production")
ALGORITHM = "HS256"
TOKEN_EXPIRE_HOURS = 24


def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def verify_password(password: str, hashed: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))


def create_token(username: str) -> str:
    """Create a JWT token"""
    expire = datetime.utcnow() + timedelta(hours=TOKEN_EXPIRE_HOURS)
    payload = {
        "sub": username,
        "exp": expire
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(authorization: str = Header(...)) -> str:
    """Verify JWT token from Authorization header"""
    try:
        # Expect "Bearer <token>"
        if not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid authorization header")

        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")

        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")

        return username

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
