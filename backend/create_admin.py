"""
Script to create or update admin user.
Run this from the command line:

    python create_admin.py <username> <password>

Example:
    python create_admin.py admin mySecurePassword123
"""

import sys
from sqlalchemy import text
from database import engine
from auth import hash_password


def create_admin(username: str, password: str):
    """Create or update admin user"""
    password_hash = hash_password(password)

    with engine.connect() as conn:
        # Check if user exists
        result = conn.execute(
            text("SELECT id FROM admin_users WHERE username = :username"),
            {"username": username}
        ).fetchone()

        if result:
            # Update existing user
            conn.execute(
                text("UPDATE admin_users SET password_hash = :password_hash WHERE username = :username"),
                {"username": username, "password_hash": password_hash}
            )
            conn.commit()
            print(f"Updated password for user: {username}")
        else:
            # Create new user
            conn.execute(
                text("INSERT INTO admin_users (username, password_hash) VALUES (:username, :password_hash)"),
                {"username": username, "password_hash": password_hash}
            )
            conn.commit()
            print(f"Created admin user: {username}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python create_admin.py <username> <password>")
        print("Example: python create_admin.py admin mySecurePassword123")
        sys.exit(1)

    username = sys.argv[1]
    password = sys.argv[2]

    create_admin(username, password)
