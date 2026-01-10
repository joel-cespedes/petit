-- =============================================
-- JHAIR DATABASE SCHEMA
-- Column-based multi-language (EN, ES, NL)
-- =============================================

-- =============================================
-- ADMIN USERS
-- =============================================

CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- HOME PAGE
-- =============================================

CREATE TABLE home_page (
    id SERIAL PRIMARY KEY,

    -- Hero Section
    hero_title_en TEXT,
    hero_title_es TEXT,
    hero_title_nl TEXT,
    hero_subtitle_en TEXT,
    hero_subtitle_es TEXT,
    hero_subtitle_nl TEXT,
    hero_button_en VARCHAR(100),
    hero_button_es VARCHAR(100),
    hero_button_nl VARCHAR(100),
    hero_image VARCHAR(500),

    -- Features Section (3 items)
    feature1_icon VARCHAR(100),
    feature1_title_en VARCHAR(255),
    feature1_title_es VARCHAR(255),
    feature1_title_nl VARCHAR(255),
    feature1_description_en TEXT,
    feature1_description_es TEXT,
    feature1_description_nl TEXT,

    feature2_icon VARCHAR(100),
    feature2_title_en VARCHAR(255),
    feature2_title_es VARCHAR(255),
    feature2_title_nl VARCHAR(255),
    feature2_description_en TEXT,
    feature2_description_es TEXT,
    feature2_description_nl TEXT,

    feature3_icon VARCHAR(100),
    feature3_title_en VARCHAR(255),
    feature3_title_es VARCHAR(255),
    feature3_title_nl VARCHAR(255),
    feature3_description_en TEXT,
    feature3_description_es TEXT,
    feature3_description_nl TEXT,

    -- About Section
    about_tag_en VARCHAR(255),
    about_tag_es VARCHAR(255),
    about_tag_nl VARCHAR(255),
    about_title_en TEXT,
    about_title_es TEXT,
    about_title_nl TEXT,
    about_description_bold_en TEXT,
    about_description_bold_es TEXT,
    about_description_bold_nl TEXT,
    about_description_en TEXT,
    about_description_es TEXT,
    about_description_nl TEXT,
    about_phone VARCHAR(100),
    about_image VARCHAR(500),

    -- Services Section Header (for home page)
    services_tag_en VARCHAR(100),
    services_tag_es VARCHAR(100),
    services_tag_nl VARCHAR(100),
    services_title_en TEXT,
    services_title_es TEXT,
    services_title_nl TEXT,
    services_description_en TEXT,
    services_description_es TEXT,
    services_description_nl TEXT,

    -- Testimonial Section
    testimonial_quote_en TEXT,
    testimonial_quote_es TEXT,
    testimonial_quote_nl TEXT,
    testimonial_author VARCHAR(100),
    testimonial_quote_icon VARCHAR(500),

    -- FunFact Section (4 items)
    funfact_1_number VARCHAR(20),
    funfact_1_symbol VARCHAR(10),
    funfact_1_label_en VARCHAR(100),
    funfact_1_label_es VARCHAR(100),
    funfact_1_label_nl VARCHAR(100),
    funfact_1_icon VARCHAR(100),

    funfact_2_number VARCHAR(20),
    funfact_2_symbol VARCHAR(10),
    funfact_2_label_en VARCHAR(100),
    funfact_2_label_es VARCHAR(100),
    funfact_2_label_nl VARCHAR(100),
    funfact_2_icon VARCHAR(100),

    funfact_3_number VARCHAR(20),
    funfact_3_symbol VARCHAR(10),
    funfact_3_label_en VARCHAR(100),
    funfact_3_label_es VARCHAR(100),
    funfact_3_label_nl VARCHAR(100),
    funfact_3_icon VARCHAR(100),

    funfact_4_number VARCHAR(20),
    funfact_4_symbol VARCHAR(10),
    funfact_4_label_en VARCHAR(100),
    funfact_4_label_es VARCHAR(100),
    funfact_4_label_nl VARCHAR(100),
    funfact_4_icon VARCHAR(100),

    -- Partner/CTA Section
    partner_tag_en VARCHAR(100),
    partner_tag_es VARCHAR(100),
    partner_tag_nl VARCHAR(100),
    partner_title_en TEXT,
    partner_title_es TEXT,
    partner_title_nl TEXT,
    partner_description_en TEXT,
    partner_description_es TEXT,
    partner_description_nl TEXT,
    partner_button_en VARCHAR(100),
    partner_button_es VARCHAR(100),
    partner_button_nl VARCHAR(100),
    partner_image VARCHAR(500),

    -- Contact Section
    contact_phone_message_en TEXT,
    contact_phone_message_es TEXT,
    contact_phone_message_nl TEXT,
    contact_tag_en VARCHAR(100),
    contact_tag_es VARCHAR(100),
    contact_tag_nl VARCHAR(100),
    contact_title_en TEXT,
    contact_title_es TEXT,
    contact_title_nl TEXT,

    -- Blog Section
    blog_tag_en VARCHAR(100),
    blog_tag_es VARCHAR(100),
    blog_tag_nl VARCHAR(100),
    blog_title_en TEXT,
    blog_title_es TEXT,
    blog_title_nl TEXT,
    blog_description_en TEXT,
    blog_description_es TEXT,
    blog_description_nl TEXT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SERVICES PAGE (lista de servicios - textos estáticos)
-- /services
-- =============================================

CREATE TABLE services_page (
    id SERIAL PRIMARY KEY,

    -- Page header
    page_title_en VARCHAR(255),
    page_title_es VARCHAR(255),
    page_title_nl VARCHAR(255),
    page_breadcrumb_en VARCHAR(100),
    page_breadcrumb_es VARCHAR(100),
    page_breadcrumb_nl VARCHAR(100),
    background_image VARCHAR(500),

    -- Section title
    section_tag_en VARCHAR(100),
    section_tag_es VARCHAR(100),
    section_tag_nl VARCHAR(100),
    section_title_en TEXT,
    section_title_es TEXT,
    section_title_nl TEXT,
    section_description_en TEXT,
    section_description_es TEXT,
    section_description_nl TEXT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SERVICE SINGLE PAGE (textos estáticos del sidebar y formulario)
-- /service-single/[slug]
-- =============================================

CREATE TABLE service_single_page (
    id SERIAL PRIMARY KEY,

    -- Page header
    page_breadcrumb_en VARCHAR(100),
    page_breadcrumb_es VARCHAR(100),
    page_breadcrumb_nl VARCHAR(100),
    background_image VARCHAR(500),

    -- Sidebar - Service list widget
    sidebar_all_services_en VARCHAR(100),
    sidebar_all_services_es VARCHAR(100),
    sidebar_all_services_nl VARCHAR(100),

    -- Sidebar - Features widget
    sidebar_features_title_en VARCHAR(100),
    sidebar_features_title_es VARCHAR(100),
    sidebar_features_title_nl VARCHAR(100),
    sidebar_feature_1_en VARCHAR(255),
    sidebar_feature_1_es VARCHAR(255),
    sidebar_feature_1_nl VARCHAR(255),
    sidebar_feature_2_en VARCHAR(255),
    sidebar_feature_2_es VARCHAR(255),
    sidebar_feature_2_nl VARCHAR(255),
    sidebar_feature_3_en VARCHAR(255),
    sidebar_feature_3_es VARCHAR(255),
    sidebar_feature_3_nl VARCHAR(255),
    sidebar_feature_4_en VARCHAR(255),
    sidebar_feature_4_es VARCHAR(255),
    sidebar_feature_4_nl VARCHAR(255),

    -- Sidebar - Download widget
    sidebar_download_en VARCHAR(100),
    sidebar_download_es VARCHAR(100),
    sidebar_download_nl VARCHAR(100),

    -- Sidebar - Contact/Help widget
    sidebar_help_title_en VARCHAR(100),
    sidebar_help_title_es VARCHAR(100),
    sidebar_help_title_nl VARCHAR(100),
    sidebar_help_text_en TEXT,
    sidebar_help_text_es TEXT,
    sidebar_help_text_nl TEXT,
    sidebar_help_phone VARCHAR(100),
    sidebar_contact_link_en VARCHAR(100),
    sidebar_contact_link_es VARCHAR(100),
    sidebar_contact_link_nl VARCHAR(100),

    -- Request service form
    form_title_en VARCHAR(255),
    form_title_es VARCHAR(255),
    form_title_nl VARCHAR(255),
    form_name_placeholder_en VARCHAR(100),
    form_name_placeholder_es VARCHAR(100),
    form_name_placeholder_nl VARCHAR(100),
    form_email_placeholder_en VARCHAR(100),
    form_email_placeholder_es VARCHAR(100),
    form_email_placeholder_nl VARCHAR(100),
    form_phone_placeholder_en VARCHAR(100),
    form_phone_placeholder_es VARCHAR(100),
    form_phone_placeholder_nl VARCHAR(100),
    form_submit_button_en VARCHAR(100),
    form_submit_button_es VARCHAR(100),
    form_submit_button_nl VARCHAR(100),

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SERVICES (contenido dinámico de cada servicio)
-- Cada fila = 1 servicio con 3 secciones
-- =============================================

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,

    -- Basic info (shown in services list /services)
    title_en VARCHAR(255),
    title_es VARCHAR(255),
    title_nl VARCHAR(255),
    description_en TEXT,
    description_es TEXT,
    description_nl TEXT,
    icon VARCHAR(100),
    background_image VARCHAR(500),

    -- Section 1 (title + rich text content)
    section_1_title_en VARCHAR(255),
    section_1_title_es VARCHAR(255),
    section_1_title_nl VARCHAR(255),
    section_1_content_en TEXT,  -- HTML/rich text
    section_1_content_es TEXT,
    section_1_content_nl TEXT,

    -- Section 2 (title + rich text content)
    section_2_title_en VARCHAR(255),
    section_2_title_es VARCHAR(255),
    section_2_title_nl VARCHAR(255),
    section_2_content_en TEXT,  -- HTML/rich text
    section_2_content_es TEXT,
    section_2_content_nl TEXT,

    -- Section 3 (title + rich text content)
    section_3_title_en VARCHAR(255),
    section_3_title_es VARCHAR(255),
    section_3_title_nl VARCHAR(255),
    section_3_content_en TEXT,  -- HTML/rich text
    section_3_content_es TEXT,
    section_3_content_nl TEXT,

    -- Meta
    is_published BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ABOUT PAGE (Quienes Somos)
-- /about
-- =============================================

CREATE TABLE about_page (
    id SERIAL PRIMARY KEY,

    -- Page header
    page_title_en VARCHAR(255),
    page_title_es VARCHAR(255),
    page_title_nl VARCHAR(255),
    page_breadcrumb_en VARCHAR(100),
    page_breadcrumb_es VARCHAR(100),
    page_breadcrumb_nl VARCHAR(100),
    background_image VARCHAR(500),

    -- Profile info
    profile_image VARCHAR(500),
    name VARCHAR(255),
    title_en VARCHAR(255),
    title_es VARCHAR(255),
    title_nl VARCHAR(255),

    -- Contact info
    phone VARCHAR(100),
    email VARCHAR(255),
    experience_en VARCHAR(100),
    experience_es VARCHAR(100),
    experience_nl VARCHAR(100),
    address_en TEXT,
    address_es TEXT,
    address_nl TEXT,

    -- Social links
    social_facebook VARCHAR(500),
    social_twitter VARCHAR(500),
    social_linkedin VARCHAR(500),
    social_pinterest VARCHAR(500),
    social_instagram VARCHAR(500),

    -- Content sections
    about_title_en VARCHAR(255),
    about_title_es VARCHAR(255),
    about_title_nl VARCHAR(255),
    about_content_en TEXT,
    about_content_es TEXT,
    about_content_nl TEXT,

    experience_title_en VARCHAR(255),
    experience_title_es VARCHAR(255),
    experience_title_nl VARCHAR(255),
    experience_content_en TEXT,
    experience_content_es TEXT,
    experience_content_nl TEXT,

    education_title_en VARCHAR(255),
    education_title_es VARCHAR(255),
    education_title_nl VARCHAR(255),
    education_content_en TEXT,
    education_content_es TEXT,
    education_content_nl TEXT,

    achievements_title_en VARCHAR(255),
    achievements_title_es VARCHAR(255),
    achievements_title_nl VARCHAR(255),
    achievements_content_en TEXT,
    achievements_content_es TEXT,
    achievements_content_nl TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- BLOG PAGE (lista de blogs - textos estáticos)
-- /blog
-- =============================================

CREATE TABLE blog_page (
    id SERIAL PRIMARY KEY,

    page_title_en VARCHAR(255),
    page_title_es VARCHAR(255),
    page_title_nl VARCHAR(255),
    page_breadcrumb_en VARCHAR(100),
    page_breadcrumb_es VARCHAR(100),
    page_breadcrumb_nl VARCHAR(100),

    read_more_en VARCHAR(50),
    read_more_es VARCHAR(50),
    read_more_nl VARCHAR(50),
    comments_suffix_en VARCHAR(50),
    comments_suffix_es VARCHAR(50),
    comments_suffix_nl VARCHAR(50),

    -- Sidebar
    sidebar_search_title_en VARCHAR(100),
    sidebar_search_title_es VARCHAR(100),
    sidebar_search_title_nl VARCHAR(100),
    sidebar_search_placeholder_en VARCHAR(100),
    sidebar_search_placeholder_es VARCHAR(100),
    sidebar_search_placeholder_nl VARCHAR(100),
    sidebar_about_title_en VARCHAR(100),
    sidebar_about_title_es VARCHAR(100),
    sidebar_about_title_nl VARCHAR(100),
    sidebar_about_text_en TEXT,
    sidebar_about_text_es TEXT,
    sidebar_about_text_nl TEXT,
    sidebar_about_link_en VARCHAR(100),
    sidebar_about_link_es VARCHAR(100),
    sidebar_about_link_nl VARCHAR(100),
    sidebar_categories_title_en VARCHAR(100),
    sidebar_categories_title_es VARCHAR(100),
    sidebar_categories_title_nl VARCHAR(100),
    sidebar_related_title_en VARCHAR(100),
    sidebar_related_title_es VARCHAR(100),
    sidebar_related_title_nl VARCHAR(100),
    sidebar_tags_title_en VARCHAR(100),
    sidebar_tags_title_es VARCHAR(100),
    sidebar_tags_title_nl VARCHAR(100),

    -- Background image
    background_image VARCHAR(500),

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- BLOG SINGLE PAGE (textos estáticos)
-- /blog-single/[slug]
-- =============================================

CREATE TABLE blog_single_page (
    id SERIAL PRIMARY KEY,

    page_breadcrumb_en VARCHAR(100),
    page_breadcrumb_es VARCHAR(100),
    page_breadcrumb_nl VARCHAR(100),
    background_image VARCHAR(500),

    tags_label_en VARCHAR(50),
    tags_label_es VARCHAR(50),
    tags_label_nl VARCHAR(50),
    share_label_en VARCHAR(50),
    share_label_es VARCHAR(50),
    share_label_nl VARCHAR(50),
    author_label_en VARCHAR(50),
    author_label_es VARCHAR(50),
    author_label_nl VARCHAR(50),

    comments_title_en VARCHAR(100),
    comments_title_es VARCHAR(100),
    comments_title_nl VARCHAR(100),
    reply_button_en VARCHAR(50),
    reply_button_es VARCHAR(50),
    reply_button_nl VARCHAR(50),
    post_comments_title_en VARCHAR(100),
    post_comments_title_es VARCHAR(100),
    post_comments_title_nl VARCHAR(100),

    form_comment_placeholder_en VARCHAR(255),
    form_comment_placeholder_es VARCHAR(255),
    form_comment_placeholder_nl VARCHAR(255),
    form_website_placeholder_en VARCHAR(100),
    form_website_placeholder_es VARCHAR(100),
    form_website_placeholder_nl VARCHAR(100),
    form_name_placeholder_en VARCHAR(100),
    form_name_placeholder_es VARCHAR(100),
    form_name_placeholder_nl VARCHAR(100),
    form_email_placeholder_en VARCHAR(100),
    form_email_placeholder_es VARCHAR(100),
    form_email_placeholder_nl VARCHAR(100),
    form_submit_button_en VARCHAR(100),
    form_submit_button_es VARCHAR(100),
    form_submit_button_nl VARCHAR(100),

    nav_previous_en VARCHAR(100),
    nav_previous_es VARCHAR(100),
    nav_previous_nl VARCHAR(100),
    nav_next_en VARCHAR(100),
    nav_next_es VARCHAR(100),
    nav_next_nl VARCHAR(100),

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- BLOGS (contenido dinámico de cada blog)
-- =============================================

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,

    title_en VARCHAR(500),
    title_es VARCHAR(500),
    title_nl VARCHAR(500),

    description_en TEXT,
    description_es TEXT,
    description_nl TEXT,

    content_en TEXT,
    content_es TEXT,
    content_nl TEXT,

    -- Quote/blockquote section
    quote_text_en TEXT,
    quote_text_es TEXT,
    quote_text_nl TEXT,
    quote_author VARCHAR(100),

    image_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    background_image VARCHAR(500),

    published_at DATE,
    is_published BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TAGS
-- =============================================

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,

    name_en VARCHAR(100),
    name_es VARCHAR(100),
    name_nl VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_tags (
    blog_id INTEGER REFERENCES blogs(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_id, tag_id)
);

-- =============================================
-- GLOBAL CONTENT (Navbar + Footer)
-- =============================================

CREATE TABLE global_content (
    id SERIAL PRIMARY KEY,

    -- Navbar
    nav_home_en VARCHAR(50),
    nav_home_es VARCHAR(50),
    nav_home_nl VARCHAR(50),
    nav_services_en VARCHAR(50),
    nav_services_es VARCHAR(50),
    nav_services_nl VARCHAR(50),
    nav_blog_en VARCHAR(50),
    nav_blog_es VARCHAR(50),
    nav_blog_nl VARCHAR(50),
    nav_contact_en VARCHAR(50),
    nav_contact_es VARCHAR(50),
    nav_contact_nl VARCHAR(50),
    nav_about_en VARCHAR(50),
    nav_about_es VARCHAR(50),
    nav_about_nl VARCHAR(50),

    -- Footer
    footer_about_text_en TEXT,
    footer_about_text_es TEXT,
    footer_about_text_nl TEXT,
    footer_nav_title_en VARCHAR(100),
    footer_nav_title_es VARCHAR(100),
    footer_nav_title_nl VARCHAR(100),
    footer_contact_title_en VARCHAR(100),
    footer_contact_title_es VARCHAR(100),
    footer_contact_title_nl VARCHAR(100),
    footer_about_us_en VARCHAR(100),
    footer_about_us_es VARCHAR(100),
    footer_about_us_nl VARCHAR(100),
    footer_contact_us_en VARCHAR(100),
    footer_contact_us_es VARCHAR(100),
    footer_contact_us_nl VARCHAR(100),
    footer_case_studies_en VARCHAR(100),
    footer_case_studies_es VARCHAR(100),
    footer_case_studies_nl VARCHAR(100),
    footer_our_services_en VARCHAR(100),
    footer_our_services_es VARCHAR(100),
    footer_our_services_nl VARCHAR(100),
    footer_phone VARCHAR(100),
    footer_email VARCHAR(255),
    footer_office_hours_en VARCHAR(100),
    footer_office_hours_es VARCHAR(100),
    footer_office_hours_nl VARCHAR(100),
    footer_copyright_en TEXT,
    footer_copyright_es TEXT,
    footer_copyright_nl TEXT,

    -- Social links
    social_facebook VARCHAR(500),
    social_twitter VARCHAR(500),
    social_linkedin VARCHAR(500),
    social_instagram VARCHAR(500),
    social_pinterest VARCHAR(500),

    -- Logo
    logo_url VARCHAR(500),
    logo_white VARCHAR(500),

    -- Contact Info (used in footer)
    phone VARCHAR(100),
    email VARCHAR(255),
    address VARCHAR(500),

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- BLOG COMMENTS
-- =============================================

CREATE TABLE blog_comments (
    id SERIAL PRIMARY KEY,
    blog_id INTEGER REFERENCES blogs(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES blog_comments(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    author_website VARCHAR(255),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SERVICE REQUESTS
-- =============================================

CREATE TABLE service_requests (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_blogs_published ON blogs(is_published, published_at DESC);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_services_published ON services(is_published, sort_order);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_blog_comments_blog ON blog_comments(blog_id, is_approved);

-- =============================================
-- INSERT DEFAULT DATA (1 row for static pages)
-- =============================================

INSERT INTO home_page (id) VALUES (1);
INSERT INTO blog_page (id) VALUES (1);
INSERT INTO blog_single_page (id) VALUES (1);
INSERT INTO services_page (id) VALUES (1);
INSERT INTO service_single_page (id) VALUES (1);
INSERT INTO global_content (id) VALUES (1);

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Sample services
INSERT INTO services (slug, title_en, title_es, title_nl, description_en, description_es, description_nl, icon, sort_order) VALUES
    ('market-research', 'Market Research', 'Investigación de Mercado', 'Marktonderzoek',
     'Comprehensive market analysis and research services',
     'Servicios completos de análisis e investigación de mercado',
     'Uitgebreide marktanalyse en onderzoeksdiensten',
     'flaticon-gift', 1),
    ('corporate-finance', 'Corporate Finance', 'Finanzas Corporativas', 'Bedrijfsfinanciën',
     'Expert financial consulting for your business',
     'Consultoría financiera experta para su negocio',
     'Deskundige financiële consultancy voor uw bedrijf',
     'flaticon-suitcase', 2),
    ('advanced-analytics', 'Advanced Analytics', 'Análisis Avanzado', 'Geavanceerde Analyse',
     'Data-driven insights for better decisions',
     'Información basada en datos para mejores decisiones',
     'Data-gedreven inzichten voor betere beslissingen',
     'flaticon-stats', 3);

-- Sample blogs
INSERT INTO blogs (slug, title_en, title_es, title_nl, description_en, description_es, description_nl, published_at, image_url, thumbnail_url) VALUES
    ('consulting-success', 'Consulting Success Guide', 'Guía de Éxito en Consultoría', 'Consultancy Succesgids',
     'Learn the secrets of successful consulting',
     'Aprende los secretos de la consultoría exitosa',
     'Leer de geheimen van succesvolle consultancy',
     '2024-02-16', '/images/blog/img-1.jpg', '/images/blog/img-1.jpg'),
    ('grow-your-practice', 'Grow Your Practice', 'Haz Crecer tu Práctica', 'Laat je Praktijk Groeien',
     'Tips and strategies for business growth',
     'Consejos y estrategias para el crecimiento empresarial',
     'Tips en strategieën voor bedrijfsgroei',
     '2024-03-17', '/images/blog/img-2.jpg', '/images/blog/img-2.jpg');

-- Sample tags
INSERT INTO tags (slug, name_en, name_es, name_nl) VALUES
    ('consulting', 'Consulting', 'Consultoría', 'Consultancy'),
    ('marketing', 'Marketing', 'Marketing', 'Marketing'),
    ('strategy', 'Strategy', 'Estrategia', 'Strategie'),
    ('finance', 'Finance', 'Finanzas', 'Financiën');

-- Sample partners
INSERT INTO partners (name, logo_url, sort_order) VALUES
    ('Partner 1', '/images/partners/img-1.png', 1),
    ('Partner 2', '/images/partners/img-2.png', 2),
    ('Partner 3', '/images/partners/img-3.png', 3),
    ('Partner 4', '/images/partners/img-4.png', 4);
