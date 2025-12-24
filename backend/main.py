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
from database import get_db, get_page_content, get_dynamic_content, get_single_item
from auth import verify_password, create_token, verify_token

# Create uploads directory
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(title="Jhair API", version="1.0.0")

# CORS - allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

VALID_LANGUAGES = ["en", "es", "nl"]


def validate_lang(lang: str):
    if lang not in VALID_LANGUAGES:
        raise HTTPException(status_code=400, detail=f"Invalid language. Use: {VALID_LANGUAGES}")
    return lang


# =============================================
# AUTH ENDPOINTS
# =============================================

class LoginRequest(BaseModel):
    username: str
    password: str


@app.post("/api/auth/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    """Login and get JWT token"""
    query = text("SELECT username, password_hash FROM admin_users WHERE username = :username")
    result = db.execute(query, {"username": data.username}).fetchone()

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(data.password, result.password_hash):
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


@app.get("/api/contact-form")
def get_contact_form(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_page_content(db, "contact_form", lang)


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
def get_blogs(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_dynamic_content(db, "blogs", lang, "is_published = true ORDER BY published_at DESC")


@app.get("/api/blogs/{slug}")
def get_blog(slug: str, lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    blog = get_single_item(db, "blogs", lang, slug)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@app.get("/api/tags")
def get_tags(lang: str = Query("en"), db: Session = Depends(get_db)):
    validate_lang(lang)
    return get_dynamic_content(db, "tags", lang)


@app.get("/api/partners")
def get_partners(db: Session = Depends(get_db)):
    query = text("SELECT * FROM partners WHERE is_published = true ORDER BY sort_order")
    result = db.execute(query).fetchall()
    return [dict(row._mapping) for row in result]


# =============================================
# PUBLIC ENDPOINTS - FORM SUBMISSIONS
# =============================================

class ContactSubmission(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str


@app.post("/api/contact")
def submit_contact(data: ContactSubmission, db: Session = Depends(get_db)):
    query = text("""
        INSERT INTO contact_submissions (name, email, phone, subject, message)
        VALUES (:name, :email, :phone, :subject, :message)
        RETURNING id
    """)
    result = db.execute(query, data.model_dump())
    db.commit()
    return {"success": True, "id": result.fetchone()[0]}


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

    # Build UPDATE query dynamically
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
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE service_single_page SET {set_clauses}, updated_at = NOW() WHERE id = 1")
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.get("/api/admin/blog-page")
def admin_get_blog_page(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    return get_all_columns(db, "blog_page")


@app.put("/api/admin/blog-page")
def admin_update_blog_page(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
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
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE blog_single_page SET {set_clauses}, updated_at = NOW() WHERE id = 1")
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.get("/api/admin/contact-form")
def admin_get_contact_form(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    return get_all_columns(db, "contact_form")


@app.put("/api/admin/contact-form")
def admin_update_contact_form(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    if not data:
        raise HTTPException(status_code=400, detail="No data provided")
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE contact_form SET {set_clauses}, updated_at = NOW() WHERE id = 1")
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
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE services SET {set_clauses}, updated_at = NOW() WHERE id = :id")
    data["id"] = id
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.delete("/api/admin/services/{id}")
def admin_delete_service(id: int, username: str = Depends(verify_token), db: Session = Depends(get_db)):
    """Delete service"""
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
    return dict(result._mapping)


@app.post("/api/admin/blogs")
def admin_create_blog(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    columns = ", ".join(data.keys())
    values = ", ".join([f":{key}" for key in data.keys()])
    query = text(f"INSERT INTO blogs ({columns}) VALUES ({values}) RETURNING id")
    result = db.execute(query, data)
    db.commit()
    return {"success": True, "id": result.fetchone()[0]}


@app.put("/api/admin/blogs/{id}")
def admin_update_blog(
    id: int,
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE blogs SET {set_clauses}, updated_at = NOW() WHERE id = :id")
    data["id"] = id
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.delete("/api/admin/blogs/{id}")
def admin_delete_blog(id: int, username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("DELETE FROM blogs WHERE id = :id")
    db.execute(query, {"id": id})
    db.commit()
    return {"success": True}


# =============================================
# ADMIN ENDPOINTS - PARTNERS CRUD (Protected)
# =============================================

@app.get("/api/admin/partners")
def admin_get_partners(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("SELECT * FROM partners ORDER BY sort_order")
    result = db.execute(query).fetchall()
    return [dict(row._mapping) for row in result]


@app.post("/api/admin/partners")
def admin_create_partner(
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    columns = ", ".join(data.keys())
    values = ", ".join([f":{key}" for key in data.keys()])
    query = text(f"INSERT INTO partners ({columns}) VALUES ({values}) RETURNING id")
    result = db.execute(query, data)
    db.commit()
    return {"success": True, "id": result.fetchone()[0]}


@app.put("/api/admin/partners/{id}")
def admin_update_partner(
    id: int,
    data: dict = Body(...),
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    set_clauses = ", ".join([f"{key} = :{key}" for key in data.keys()])
    query = text(f"UPDATE partners SET {set_clauses} WHERE id = :id")
    data["id"] = id
    db.execute(query, data)
    db.commit()
    return {"success": True}


@app.delete("/api/admin/partners/{id}")
def admin_delete_partner(id: int, username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("DELETE FROM partners WHERE id = :id")
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

@app.get("/api/admin/contact-submissions")
def admin_get_contact_submissions(username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("SELECT * FROM contact_submissions ORDER BY created_at DESC")
    result = db.execute(query).fetchall()
    return [dict(row._mapping) for row in result]


@app.put("/api/admin/contact-submissions/{id}/read")
def admin_mark_contact_read(id: int, username: str = Depends(verify_token), db: Session = Depends(get_db)):
    query = text("UPDATE contact_submissions SET is_read = true WHERE id = :id")
    db.execute(query, {"id": id})
    db.commit()
    return {"success": True}


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

    # Return URL
    return {"url": f"http://localhost:8000/uploads/{unique_name}"}


# =============================================
# HEALTH CHECK
# =============================================

@app.get("/api/health")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
