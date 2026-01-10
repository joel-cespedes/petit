from fastapi import FastAPI, Depends, HTTPException, Query, Body, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy import text
from pydantic import BaseModel
from typing import Optional
import os
import uuid
import shutil
from database import get_db, get_page_content, get_dynamic_content, get_single_item, engine
from auth import verify_password, create_token, verify_token, hash_password
from dotenv import load_dotenv

load_dotenv()

# Create uploads directory in frontend's public folder
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(title="Jhair API", version="1.0.0")


# Auto-create admin user from environment variables on startup
@app.on_event("startup")
def create_default_admin():
    admin_user = os.getenv("ADMIN_USER")
    admin_pass = os.getenv("ADMIN_PASS")

    if not admin_user or not admin_pass:
        print("WARNING: ADMIN_USER or ADMIN_PASS not set. Skipping admin creation.")
        return

    try:
        with engine.connect() as conn:
            # Check if admin exists
            result = conn.execute(
                text("SELECT id FROM admin_users WHERE username = :username"),
                {"username": admin_user}
            ).fetchone()

            if not result:
                # Create admin
                password_hash = hash_password(admin_pass)
                conn.execute(
                    text("INSERT INTO admin_users (username, password_hash) VALUES (:username, :password_hash)"),
                    {"username": admin_user, "password_hash": password_hash}
                )
                conn.commit()
                print(f"Created admin user: {admin_user}")
            else:
                print(f"Admin user '{admin_user}' already exists.")
    except Exception as e:
        print(f"Error creating admin: {e}")

# CORS - allow frontend to access API
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VALID_LANGUAGES = ["en", "es", "nl"]


def validate_lang(lang: str):
    if lang not in VALID_LANGUAGES:
        raise HTTPException(status_code=400, detail=f"Invalid language. Use: {VALID_LANGUAGES}")
    return lang


def clean_update_data(data: dict) -> dict:
    """Remove auto-managed fields from update data to prevent duplicate assignments"""
    data.pop("id", None)
    data.pop("created_at", None)
    data.pop("updated_at", None)
    return data


# Image fields that should be cleaned up when replaced
IMAGE_FIELDS = ['image_url', 'thumbnail_url', 'background_image', 'profile_image', 'hero_image', 'logo_url', 'logo_white']


def delete_old_image(old_url: str):
    """Delete an image file from uploads folder if it exists"""
    if not old_url:
        return
    # Only delete files from /uploads (not /images which are static assets)
    if not old_url.startswith('/uploads/'):
        return
    try:
        # Convert URL path to filesystem path
        filename = old_url.replace('/uploads/', '')
        file_path = os.path.join(UPLOAD_DIR, filename)
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"Deleted old image: {file_path}")
    except Exception as e:
        print(f"Error deleting image: {e}")


def cleanup_replaced_images(db, table: str, record_id: int, new_data: dict):
    """Compare old and new data, delete replaced images"""
    # Get current record to compare
    query = text(f"SELECT * FROM {table} WHERE id = :id")
    result = db.execute(query, {"id": record_id}).fetchone()
    if not result:
        return

    old_data = dict(result._mapping)

    for field in IMAGE_FIELDS:
        old_value = old_data.get(field)
        new_value = new_data.get(field)
        # If field exists in new data and has changed, delete old image
        if field in new_data and old_value and old_value != new_value:
            delete_old_image(old_value)


# =============================================
# AUTH ENDPOINTS
# =============================================

class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/api/auth/login")
def login(data: LoginRequest):
    """Login and get JWT token"""
    admin_user = os.getenv("ADMIN_USER")
    admin_hash = os.getenv("ADMIN_PASSWORD_HASH")

    if data.username != admin_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, admin_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token(data.username)
    return {"token": token, "username": data.username}


@app.get("/api/auth/verify")
def verify_auth(username: str = Depends(verify_token)):
    """Verify if token is valid"""
    return {"valid": True, "username": username}


# =============================================
# PUBLIC ENDPOINTS - STATIC PAGES
# =============================================

@app.get("/api/home")
def get_home(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_page_content(db, "home_page", lang)


@app.get("/api/global")
def get_global(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_page_content(db, "global_content", lang)


@app.get("/api/services-page")
def get_services_page(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_page_content(db, "services_page", lang)


@app.get("/api/service-single-page")
def get_service_single_page(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_page_content(db, "service_single_page", lang)


@app.get("/api/blog-page")
def get_blog_page(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_page_content(db, "blog_page", lang)


@app.get("/api/blog-single-page")
def get_blog_single_page(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_page_content(db, "blog_single_page", lang)


@app.get("/api/about")
def get_about_page(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_page_content(db, "about_page", lang)


# =============================================
# PUBLIC ENDPOINTS - DYNAMIC CONTENT
# =============================================

@app.get("/api/services")
def get_services(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_dynamic_content(db, "services", lang, "is_published = true ORDER BY sort_order")


@app.get("/api/services/{slug}")
def get_service(slug: str, lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    service = get_single_item(db, "services", lang, slug)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@app.get("/api/blogs")
def get_blogs(
    lang: str = Query("en"),
    tag: str = Query(None),
    page: int = Query(1, ge=1),
    per_page: int = Query(6, ge=1, le=50),
    db: Session = Depends(get_db)
):
    validate_lang(lang)
    offset = (page - 1) * per_page

    # Base query parts
    if tag:
        # Filter by tag
        count_query = text("""
            SELECT COUNT(*) FROM blogs b
            JOIN blog_tags bt ON b.id = bt.blog_id
            JOIN tags t ON bt.tag_id = t.id
            WHERE t.slug = :tag AND b.is_published = true
        """)
        total = db.execute(count_query, {"tag": tag}).scalar()

        query = text(f"""
            SELECT b.id, b.slug, b.title_{lang} as title, b.description_{lang} as description,
                   b.image_url, b.thumbnail_url, b.published_at, b.is_published
            FROM blogs b
            JOIN blog_tags bt ON b.id = bt.blog_id
            JOIN tags t ON bt.tag_id = t.id
            WHERE t.slug = :tag AND b.is_published = true
            ORDER BY b.published_at DESC
            LIMIT :limit OFFSET :offset
        """)
        result = db.execute(query, {"tag": tag, "limit": per_page, "offset": offset}).fetchall()
    else:
        # All blogs
        count_query = text("SELECT COUNT(*) FROM blogs WHERE is_published = true")
        total = db.execute(count_query).scalar()

        query = text(f"""
            SELECT id, slug, title_{lang} as title, description_{lang} as description,
                   image_url, thumbnail_url, published_at, is_published
            FROM blogs
            WHERE is_published = true
            ORDER BY published_at DESC
            LIMIT :limit OFFSET :offset
        """)
        result = db.execute(query, {"limit": per_page, "offset": offset}).fetchall()

    blogs = [dict(row._mapping) for row in result]
    total_pages = (total + per_page - 1) // per_page  # Ceiling division

    return {
        "blogs": blogs,
        "pagination": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": total_pages
        }
    }


@app.get("/api/blogs/{slug}")
def get_blog(slug: str, lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    blog = get_single_item(db, "blogs", lang, slug)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")

    # Get tags for this blog
    tags_query = text(f"""
        SELECT t.id, t.slug, t.name_{lang} as name
        FROM tags t
        JOIN blog_tags bt ON t.id = bt.tag_id
        JOIN blogs b ON bt.blog_id = b.id
        WHERE b.slug = :slug
    """)
    tags_result = db.execute(tags_query, {"slug": slug}).fetchall()
    blog["tags"] = [dict(row._mapping) for row in tags_result]

    return blog


@app.get("/api/tags")
def get_tags(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_dynamic_content(db, "tags", lang)


# =============================================
# PUBLIC ENDPOINTS - FORM SUBMISSIONS
# =============================================

class ServiceRequest(BaseModel):
    service_id: int
    name: str
    email: str
    phone: Optional[str] = None


@app.post("/api/service-request")
def submit_service_request(data: ServiceRequest, db: Session = Depends(get_db)):
    query = text("""
        INSERT INTO service_requests (service_id, name, email, phone)
        VALUES (:service_id, :name, :email, :phone)
        RETURNING id
    """)
    result = db.execute(query, data.model_dump())
    db.commit()
    return {"success": True, "id": result.fetchone()[0]}


# =============================================
# ADMIN ENDPOINTS - STATIC PAGES (Protected)
# =============================================

def get_all_columns(db, table_name: str):
    """Get all data from a static page table (for admin)"""
    query = text(f"SELECT * FROM {table_name} WHERE id = 1")
    result = db.execute(query).fetchone()
    if not result:
        return {}
    data = dict(result._mapping)
    data.pop('id', None)
    data.pop('created_at', None)
    data.pop('updated_at', None)
    return data


@app.get("/api/admin/home")
def admin_get_home(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    """Get all home page fields for editing"""
    return get_all_columns(db, "home_page")


@app.put("/api/admin/home")
def admin_update_home(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    """Update home page content"""
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")

    cleanup_replaced_images(db, "home_page", 1, data)
    clean_update_data(data)
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE home_page SET {set_clauses}, updated_at = NOW() WHERE id = 1")
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.get("/api/admin/global")
def admin_get_global(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    return get_all_columns(db, "global_content")


@app.put("/api/admin/global")
def admin_update_global(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
    cleanup_replaced_images(db, "global_content", 1, data)
    clean_update_data(data)
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE global_content SET {set_clauses}, updated_at = NOW() WHERE id = 1")
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.get("/api/admin/services-page")
def admin_get_services_page(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    return get_all_columns(db, "services_page")


@app.put("/api/admin/services-page")
def admin_update_services_page(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
    cleanup_replaced_images(db, "services_page", 1, data)
    clean_update_data(data)
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE services_page SET {set_clauses}, updated_at = NOW() WHERE id = 1")
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.get("/api/admin/service-single-page")
def admin_get_service_single_page(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    return get_all_columns(db, "service_single_page")


@app.put("/api/admin/service-single-page")
def admin_update_service_single_page(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
    cleanup_replaced_images(db, "service_single_page", 1, data)
    clean_update_data(data)
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE service_single_page SET {set_clauses}, updated_at = NOW() WHERE id = 1")
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.get("/api/admin/blog-page")
def admin_get_blog_page(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    return get_all_columns(db, "blog_page")


@app.get("/api/admin/about")
def admin_get_about_page(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    return get_all_columns(db, "about_page")


@app.put("/api/admin/about")
def admin_update_about_page(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
    cleanup_replaced_images(db, "about_page", 1, data)
    clean_update_data(data)
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE about_page SET {set_clauses}, updated_at = NOW() WHERE id = 1")
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.put("/api/admin/blog-page")
def admin_update_blog_page(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
    cleanup_replaced_images(db, "blog_page", 1, data)
    clean_update_data(data)
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE blog_page SET {set_clauses}, updated_at = NOW() WHERE id = 1")
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.get("/api/admin/blog-single-page")
def admin_get_blog_single_page(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    return get_all_columns(db, "blog_single_page")


@app.put("/api/admin/blog-single-page")
def admin_update_blog_single_page(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
    cleanup_replaced_images(db, "blog_single_page", 1, data)
    clean_update_data(data)
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE blog_single_page SET {set_clauses}, updated_at = NOW() WHERE id = 1")
    db.execute(query, data)
    db.commit()
    return {"success": True}


# =============================================
# ADMIN ENDPOINTS - SERVICES CRUD (Protected)
# =============================================

@app.get("/api/admin/services")
def admin_get_services(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    """Get all services for admin"""
    query = text("SELECT * FROM services ORDER BY sort_order")
    result = db.execute(query).fetchall()
    return [dict(row._mapping) for row in result]


@app.get("/api/admin/services/{id}")
def admin_get_service(id: int, username: str = Depends(verify_token), db: Session = Depends(get_db)):
    """Get single service by ID"""
    query = text("SELECT * FROM services WHERE id = :id")
    result = db.execute(query, {"id": id}).fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="Service not found")
    return dict(result._mapping)


@app.post("/api/admin/services")
def admin_create_service(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    """Create new service"""
    columns = ", ".join(data.keys())
    values = ", ".join([f":{key}" for key in data.keys()])
    query = text(f"INSERT INTO services ({columns}) VALUES ({values}) RETURNING id")
    result = db.execute(query, data)
    db.commit()
    return {"success": True, "id": result.fetchone()[0]}


@app.put("/api/admin/services/{id}")
def admin_update_service(
    id: int,
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    """Update service"""
    cleanup_replaced_images(db, "services", id, data)
    clean_update_data(data)
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE services SET {set_clauses}, updated_at = NOW() WHERE id = :id")
    data["id"] = id
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.delete("/api/admin/services/{id}")
def admin_delete_service(id: int, username: str = Depends(verify_token), db: Session = Depends(get_db)):
    """Delete service"""
    # Get record to delete its images
    record = db.execute(text("SELECT * FROM services WHERE id = :id"), {"id": id}).fetchone()
    if record:
        data = dict(record._mapping)
        for field in IMAGE_FIELDS:
            if field in data and data[field]:
                delete_old_image(data[field])

    query = text("DELETE FROM services WHERE id = :id")
    db.execute(query, {"id": id})
    db.commit()
    return {"success": True}


# =============================================
# ADMIN ENDPOINTS - BLOGS CRUD (Protected)
# =============================================

@app.get("/api/admin/blogs")
def admin_get_blogs(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("SELECT * FROM blogs ORDER BY published_at DESC")
    result = db.execute(query).fetchall()
    return [dict(row._mapping) for row in result]


@app.get("/api/admin/blogs/{id}")
def admin_get_blog(id: int, username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("SELECT * FROM blogs WHERE id = :id")
    result = db.execute(query, {"id": id}).fetchone()
    if not result:
        raise HTTPException(status_code=404, detail="Blog not found")

    blog = dict(result._mapping)

    # Get tag_ids for this blog
    tags_query = text("SELECT tag_id FROM blog_tags WHERE blog_id = :blog_id")
    tags_result = db.execute(tags_query, {"blog_id": id}).fetchall()
    blog["tag_ids"] = [row[0] for row in tags_result]

    return blog


@app.post("/api/admin/blogs")
def admin_create_blog(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    # Extract tag_ids (handled separately via blog_tags table)
    tag_ids = data.pop("tag_ids", None)
    data.pop("tags", None)

    columns = ", ".join(data.keys())
    values = ", ".join([f":{key}" for key in data.keys()])
    query = text(f"INSERT INTO blogs ({columns}) VALUES ({values}) RETURNING id")
    result = db.execute(query, data)
    blog_id = result.fetchone()[0]

    # Insert tags if provided
    if tag_ids:
        for tag_id in tag_ids:
            db.execute(
                text("INSERT INTO blog_tags (blog_id, tag_id) VALUES (:blog_id, :tag_id)"),
                {"blog_id": blog_id, "tag_id": tag_id}
            )

    db.commit()
    return {"success": True, "id": blog_id}


@app.put("/api/admin/blogs/{id}")
def admin_update_blog(
    id: int,
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    # Cleanup old images if they're being replaced
    cleanup_replaced_images(db, "blogs", id, data)

    # Extract tag_ids (handled separately via blog_tags table)
    tag_ids = data.pop("tag_ids", None)
    # Remove fields that are not columns or auto-managed
    data.pop("tags", None)
    data.pop("updated_at", None)
    data.pop("created_at", None)
    data.pop("id", None)

    # Update blog
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE blogs SET {set_clauses}, updated_at = NOW() WHERE id = :id")
    data["id"] = id
    db.execute(query, data)

    # Update tags if provided
    if tag_ids is not None:
        db.execute(text("DELETE FROM blog_tags WHERE blog_id = :blog_id"), {"blog_id": id})
        for tag_id in tag_ids:
            db.execute(
                text("INSERT INTO blog_tags (blog_id, tag_id) VALUES (:blog_id, :tag_id)"),
                {"blog_id": id, "tag_id": tag_id}
            )

    db.commit()
    return {"success": True}


@app.delete("/api/admin/blogs/{id}")
def admin_delete_blog(id: int, username: str = Depends(verify_token), db: Session = Depends(get_db)):
    # Get record to delete its images
    record = db.execute(text("SELECT * FROM blogs WHERE id = :id"), {"id": id}).fetchone()
    if record:
        data = dict(record._mapping)
        for field in IMAGE_FIELDS:
            if field in data and data[field]:
                delete_old_image(data[field])

    query = text("DELETE FROM blogs WHERE id = :id")
    db.execute(query, {"id": id})
    db.commit()
    return {"success": True}


# =============================================
# ADMIN ENDPOINTS - TAGS CRUD (Protected)
# =============================================

@app.get("/api/admin/tags")
def admin_get_tags(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("SELECT * FROM tags ORDER BY id")
    result = db.execute(query).fetchall()
    return [dict(row._mapping) for row in result]


@app.post("/api/admin/tags")
def admin_create_tag(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    columns = ", ".join(data.keys())
    values = ", ".join([f":{key}" for key in data.keys()])
    query = text(f"INSERT INTO tags ({columns}) VALUES ({values}) RETURNING id")
    result = db.execute(query, data)
    db.commit()
    return {"success": True, "id": result.fetchone()[0]}


@app.put("/api/admin/tags/{id}")
def admin_update_tag(
    id: int,
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE tags SET {set_clauses} WHERE id = :id")
    data["id"] = id
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.delete("/api/admin/tags/{id}")
def admin_delete_tag(id: int, username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("DELETE FROM tags WHERE id = :id")
    db.execute(query, {"id": id})
    db.commit()
    return {"success": True}


# =============================================
# ADMIN ENDPOINTS - VIEW SUBMISSIONS (Protected)
# =============================================

@app.get("/api/admin/service-requests")
def admin_get_service_requests(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("SELECT * FROM service_requests ORDER BY created_at DESC")
    result = db.execute(query).fetchall()
    return [dict(row._mapping) for row in result]


# =============================================
# FILE UPLOAD
# =============================================

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}

@app.post("/api/admin/upload")
async def upload_file(
    file: UploadFile = File(...),
    username: str = Depends(verify_token)
):
    """Upload an image file"""
    # Check file extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type not allowed. Use: {ALLOWED_EXTENSIONS}")

    # Generate unique filename
    unique_name = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Return URL (relative path for frontend)
    return {"url": f"/uploads/{unique_name}"}


# =============================================
# HEALTH CHECK
# =============================================

@app.get("/api/health")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
