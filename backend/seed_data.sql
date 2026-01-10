-- Insert admin user
INSERT INTO admin_users (username, password_hash) VALUES (
    'pttadmin',
    '$2b$12$u1gca2iaMs4syHZuvQ04kOaTXk/VQEAvEPmTuU/FHbcL60OhR7iXe'
) ON CONFLICT (username) DO NOTHING;

-- Insert initial rows for all tables
INSERT INTO home_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO global_content (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Seed data for home_page (UPDATE existing row)
UPDATE home_page SET
    -- Hero Section
    hero_title_en = 'Normal sleeps, super dreams',
    hero_title_es = 'Sueños normales, super sueños',
    hero_title_nl = 'Normale slaap, super dromen',
    hero_subtitle_en = 'Raising a heavy fur muff that covered the whole of her lower arm towards the viewer.',
    hero_subtitle_es = 'Levantando un pesado manguito de piel que cubría todo su antebrazo hacia el espectador.',
    hero_subtitle_nl = 'Een zware bontmof opheffend die haar hele onderarm bedekte naar de kijker.',
    hero_button_en = 'Discover More',
    hero_button_es = 'Descubrir Más',
    hero_button_nl = 'Ontdek Meer',
    hero_image = '/images/slider/slide-1.jpg',

    -- Features Section
    feature1_icon = 'flaticon-sheriff',
    feature1_title_en = 'Business Consulting',
    feature1_title_es = 'Consultoría Empresarial',
    feature1_title_nl = 'Bedrijfsadvies',
    feature1_description_en = 'Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table.',
    feature1_description_es = 'Pacíficamente entre sus cuatro paredes familiares. Una colección de muestras textiles estaba esparcida sobre la mesa.',
    feature1_description_nl = 'Vredig tussen zijn vier vertrouwde muren. Een verzameling textielen lag uitgespreid op de tafel.',

    feature2_icon = 'flaticon-diamond',
    feature2_title_en = 'Market Research',
    feature2_title_es = 'Investigación de Mercado',
    feature2_title_nl = 'Marktonderzoek',
    feature2_description_en = 'Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table.',
    feature2_description_es = 'Pacíficamente entre sus cuatro paredes familiares. Una colección de muestras textiles estaba esparcida sobre la mesa.',
    feature2_description_nl = 'Vredig tussen zijn vier vertrouwde muren. Een verzameling textielen lag uitgespreid op de tafel.',

    feature3_icon = 'flaticon-idea',
    feature3_title_en = 'Thought Leadership',
    feature3_title_es = 'Liderazgo de Pensamiento',
    feature3_title_nl = 'Thought Leadership',
    feature3_description_en = 'Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table.',
    feature3_description_es = 'Pacíficamente entre sus cuatro paredes familiares. Una colección de muestras textiles estaba esparcida sobre la mesa.',
    feature3_description_nl = 'Vredig tussen zijn vier vertrouwde muren. Een verzameling textielen lag uitgespreid op de tafel.',

    -- About Section
    about_tag_en = 'We are consulting agency!',
    about_tag_es = '¡Somos una agencia de consultoría!',
    about_tag_nl = 'Wij zijn een adviesbureau!',
    about_title_en = 'We''re interested to share about us',
    about_title_es = 'Estamos interesados en compartir sobre nosotros',
    about_title_nl = 'We willen graag over ons delen',
    about_description_bold_en = 'It wasn''t a dream. His room, a proper human room although little too small, lay peacefully between its four familiar walls.',
    about_description_bold_es = 'No era un sueño. Su habitación, una habitación humana apropiada aunque un poco pequeña, yacía pacíficamente entre sus cuatro paredes familiares.',
    about_description_bold_nl = 'Het was geen droom. Zijn kamer, een echte mensenkamer hoewel iets te klein, lag vredig tussen zijn vier vertrouwde muren.',
    about_description_en = 'Peacefully between its four familiar walls a collection of textile samples lay spread out on the table - Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window.',
    about_description_es = 'Una colección de muestras textiles estaba esparcida sobre la mesa - Samsa era un viajante de comercio y encima colgaba una imagen que había recortado recientemente de una revista ilustrada y enmarcado en un bonito marco dorado. Mostraba a una dama equipada con un sombrero de piel y una boa de piel que estaba sentada erguida, levantando un pesado manguito de piel.',
    about_description_nl = 'Een verzameling textielen lag uitgespreid op de tafel - Samsa was een handelsreiziger en daarboven hing een foto die hij onlangs uit een tijdschrift had geknipt en in een mooi verguld lijstje had gezet.',
    about_phone = '012345645, +6546521145',
    about_image = '/images/about/about-2.jpg',

    -- Services Section Header
    services_tag_en = 'Services',
    services_tag_es = 'Servicios',
    services_tag_nl = 'Diensten',
    services_title_en = 'Best services',
    services_title_es = 'Mejores servicios',
    services_title_nl = 'Beste diensten',
    services_description_en = 'Showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look',
    services_description_es = 'Mostraba a una dama equipada con un sombrero de piel y una boa de piel que estaba sentada erguida, levantando un pesado manguito de piel que cubría todo su antebrazo hacia el espectador.',
    services_description_nl = 'Toonde een dame uitgerust met een bontmuts die rechtop zat, een zware bontmof opheffend naar de kijker.',

    -- Testimonial Section
    testimonial_quote_en = 'Lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table Samsa was a travelling salesman it there hung a picture that he had recently cut out of an',
    testimonial_quote_es = 'Yacía pacíficamente entre sus cuatro paredes familiares. Una colección de muestras textiles estaba esparcida sobre la mesa. Samsa era un viajante de comercio y encima colgaba una imagen que había recortado recientemente.',
    testimonial_quote_nl = 'Lag vredig tussen zijn vier vertrouwde muren. Een verzameling textielen lag uitgespreid op de tafel. Samsa was een handelsreiziger en daarboven hing een foto.',
    testimonial_author = 'Thomas Calvin',
    testimonial_quote_icon = '/images/quote.png',

    -- FunFact Section
    funfact_1_number = '25',
    funfact_1_symbol = '+',
    funfact_1_label_en = 'Years of experience',
    funfact_1_label_es = 'Años de experiencia',
    funfact_1_label_nl = 'Jaar ervaring',
    funfact_1_icon = 'flaticon-diamond',

    funfact_2_number = '500',
    funfact_2_symbol = '+',
    funfact_2_label_en = 'Happy clients',
    funfact_2_label_es = 'Clientes felices',
    funfact_2_label_nl = 'Tevreden klanten',
    funfact_2_icon = 'flaticon-happy',

    funfact_3_number = '350',
    funfact_3_symbol = '+',
    funfact_3_label_en = 'Projects done',
    funfact_3_label_es = 'Proyectos realizados',
    funfact_3_label_nl = 'Projecten voltooid',
    funfact_3_icon = 'flaticon-projector',

    funfact_4_number = '50',
    funfact_4_symbol = '+',
    funfact_4_label_en = 'Awards won',
    funfact_4_label_es = 'Premios ganados',
    funfact_4_label_nl = 'Prijzen gewonnen',
    funfact_4_icon = 'flaticon-medal',

    -- Partner/CTA Section
    partner_tag_en = 'Meet up',
    partner_tag_es = 'Conócenos',
    partner_tag_nl = 'Ontmoet ons',
    partner_title_en = 'Need help with a Project?',
    partner_title_es = '¿Necesitas ayuda con un Proyecto?',
    partner_title_nl = 'Hulp nodig bij een Project?',
    partner_description_en = 'Showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer gregor then turned to look around the world.',
    partner_description_es = 'Mostraba a una dama equipada con un sombrero de piel y una boa de piel que estaba sentada erguida, levantando un pesado manguito de piel que cubría todo su antebrazo hacia el espectador.',
    partner_description_nl = 'Toonde een dame uitgerust met een bontmuts die rechtop zat, een zware bontmof opheffend naar de kijker.',
    partner_button_en = 'Get In Touch',
    partner_button_es = 'Contáctanos',
    partner_button_nl = 'Neem Contact Op',
    partner_image = '/images/about/about-2.jpg',

    -- Contact Section
    contact_phone_message_en = 'Don''t hesitate to contact with us. phone: 01245643654',
    contact_phone_message_es = 'No dudes en contactarnos. teléfono: 01245643654',
    contact_phone_message_nl = 'Aarzel niet om contact met ons op te nemen. telefoon: 01245643654',
    contact_tag_en = 'Contact',
    contact_tag_es = 'Contacto',
    contact_tag_nl = 'Contact',
    contact_title_en = 'Request a free consulting',
    contact_title_es = 'Solicita una consulta gratuita',
    contact_title_nl = 'Vraag een gratis adviesgesprek aan',

    -- Blog Section
    blog_tag_en = 'News',
    blog_tag_es = 'Noticias',
    blog_tag_nl = 'Nieuws',
    blog_title_en = 'Latest News & Events',
    blog_title_es = 'Últimas Noticias y Eventos',
    blog_title_nl = 'Laatste Nieuws & Evenementen',
    blog_description_en = 'Showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer gregor then turned to look around the world.',
    blog_description_es = 'Mostraba a una dama equipada con un sombrero de piel y una boa de piel que estaba sentada erguida, levantando un pesado manguito de piel que cubría todo su antebrazo hacia el espectador.',
    blog_description_nl = 'Toonde een dame uitgerust met een bontmuts die rechtop zat, een zware bontmof opheffend naar de kijker.'
WHERE id = 1;

-- Update global_content
UPDATE global_content SET
    nav_home_en = 'Home',
    nav_home_es = 'Inicio',
    nav_home_nl = 'Home',
    nav_services_en = 'Services',
    nav_services_es = 'Servicios',
    nav_services_nl = 'Diensten',
    nav_blog_en = 'Blog',
    nav_blog_es = 'Blog',
    nav_blog_nl = 'Blog',
    nav_contact_en = 'Contact',
    nav_contact_es = 'Contacto',
    nav_contact_nl = 'Contact',
    nav_about_en = 'About Us',
    nav_about_es = 'Quienes Somos',
    nav_about_nl = 'Over Ons',

    footer_about_text_en = 'Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and housed.',
    footer_about_text_es = 'Samsa era un viajante de comercio y encima colgaba una imagen que había recortado recientemente de una revista ilustrada.',
    footer_about_text_nl = 'Samsa was een handelsreiziger en daarboven hing een foto die hij onlangs uit een tijdschrift had geknipt.',

    footer_nav_title_en = 'Navigation',
    footer_nav_title_es = 'Navegación',
    footer_nav_title_nl = 'Navigatie',
    footer_contact_title_en = 'Contact Info',
    footer_contact_title_es = 'Información de Contacto',
    footer_contact_title_nl = 'Contactgegevens',

    footer_about_us_en = 'About us',
    footer_about_us_es = 'Sobre nosotros',
    footer_about_us_nl = 'Over ons',
    footer_contact_us_en = 'Contact us',
    footer_contact_us_es = 'Contáctanos',
    footer_contact_us_nl = 'Contact',
    footer_case_studies_en = 'Case Studies',
    footer_case_studies_es = 'Casos de Estudio',
    footer_case_studies_nl = 'Case Studies',
    footer_our_services_en = 'Our Services',
    footer_our_services_es = 'Nuestros Servicios',
    footer_our_services_nl = 'Onze Diensten',

    footer_phone = '+87655285654',
    footer_email = 'jhair@demo.com',
    footer_office_hours_en = 'Office Time: 10AM - 5PM',
    footer_office_hours_es = 'Horario: 10AM - 5PM',
    footer_office_hours_nl = 'Kantooruren: 10:00 - 17:00',

    footer_copyright_en = 'Copyright © 2023 Jhair. All rights reserved.',
    footer_copyright_es = 'Copyright © 2023 Jhair. Todos los derechos reservados.',
    footer_copyright_nl = 'Copyright © 2023 Jhair. Alle rechten voorbehouden.',

    social_facebook = 'https://facebook.com/jhair',
    social_twitter = 'https://twitter.com/jhair',
    social_linkedin = 'https://linkedin.com/company/jhair',
    social_instagram = 'https://instagram.com/jhair',
    social_pinterest = 'https://pinterest.com/jhair',

    logo_url = '/images/logo-2.png',
    logo_white = '/images/logo.png',

    -- Contact Info
    phone = '+31 20 123 4567',
    email = 'info@jhair.com',
    address = 'Herengracht 123, 1015 BG Amsterdam, Netherlands'
WHERE id = 1;

-- Insert about_page initial row
INSERT INTO about_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Update about_page
UPDATE about_page SET
    page_title_en = 'About Us',
    page_title_es = 'Quienes Somos',
    page_title_nl = 'Over Ons',
    page_breadcrumb_en = 'About',
    page_breadcrumb_es = 'Nosotros',
    page_breadcrumb_nl = 'Over',
    background_image = '/images/page-title.jpg',

    profile_image = '/images/team/img-1.jpg',
    name = 'Jhair',
    title_en = 'Founder & CEO',
    title_es = 'Fundador y CEO',
    title_nl = 'Oprichter & CEO',

    phone = '+1 234 567 890',
    email = 'info@jhair.com',
    experience_en = '15 Years',
    experience_es = '15 Años',
    experience_nl = '15 Jaar',
    address_en = '123 Business Street, City, Country',
    address_es = 'Calle Negocios 123, Ciudad, País',
    address_nl = 'Zakenstraat 123, Stad, Land',

    social_facebook = 'https://facebook.com',
    social_twitter = 'https://twitter.com',
    social_linkedin = 'https://linkedin.com',
    social_pinterest = 'https://pinterest.com',
    social_instagram = 'https://instagram.com',

    about_title_en = 'About Me',
    about_title_es = 'Sobre Mí',
    about_title_nl = 'Over Mij',
    about_content_en = 'I am a passionate entrepreneur with over 15 years of experience in business consulting and strategy development. My journey began with a simple vision: to help businesses thrive in an ever-changing market landscape.',
    about_content_es = 'Soy un emprendedor apasionado con más de 15 años de experiencia en consultoría empresarial y desarrollo de estrategias. Mi viaje comenzó con una visión simple: ayudar a las empresas a prosperar en un panorama de mercado en constante cambio.',
    about_content_nl = 'Ik ben een gepassioneerde ondernemer met meer dan 15 jaar ervaring in bedrijfsadvies en strategieontwikkeling. Mijn reis begon met een eenvoudige visie: bedrijven helpen bloeien in een steeds veranderend marktlandschap.',

    experience_title_en = 'Experience',
    experience_title_es = 'Experiencia',
    experience_title_nl = 'Ervaring',
    experience_content_en = 'Throughout my career, I have worked with companies of all sizes, from startups to Fortune 500 corporations. My expertise spans across multiple industries including technology, finance, and healthcare.',
    experience_content_es = 'A lo largo de mi carrera, he trabajado con empresas de todos los tamaños, desde startups hasta corporaciones Fortune 500. Mi experiencia abarca múltiples industrias, incluyendo tecnología, finanzas y salud.',
    experience_content_nl = 'Gedurende mijn carrière heb ik gewerkt met bedrijven van alle groottes, van startups tot Fortune 500-bedrijven. Mijn expertise strekt zich uit over meerdere industrieën, waaronder technologie, financiën en gezondheidszorg.',

    education_title_en = 'Education',
    education_title_es = 'Educación',
    education_title_nl = 'Opleiding',
    education_content_en = 'MBA from Harvard Business School, Bachelor''s degree in Business Administration from MIT. Continuous learner with multiple certifications in project management and strategic planning.',
    education_content_es = 'MBA de Harvard Business School, Licenciatura en Administración de Empresas del MIT. Aprendiz continuo con múltiples certificaciones en gestión de proyectos y planificación estratégica.',
    education_content_nl = 'MBA van Harvard Business School, Bachelor in Bedrijfskunde van MIT. Continu lerende met meerdere certificeringen in projectmanagement en strategische planning.',

    achievements_title_en = 'Achievements',
    achievements_title_es = 'Logros',
    achievements_title_nl = 'Prestaties',
    achievements_content_en = '<ul><li>- Best Business Consultant Award 2020</li><li>- Successfully led 100+ consulting projects</li><li>- Featured speaker at international business conferences</li><li>- Author of "Strategic Growth" bestseller book</li></ul>',
    achievements_content_es = '<ul><li>- Premio al Mejor Consultor Empresarial 2020</li><li>- Lideró con éxito más de 100 proyectos de consultoría</li><li>- Orador destacado en conferencias de negocios internacionales</li><li>- Autor del libro bestseller "Crecimiento Estratégico"</li></ul>',
    achievements_content_nl = '<ul><li>- Beste Bedrijfsadviseur Award 2020</li><li>- Succesvol geleid 100+ adviesprojecten</li><li>- Uitgelichte spreker op internationale zakelijke conferenties</li><li>- Auteur van bestseller boek "Strategische Groei"</li></ul>'
WHERE id = 1;

-- Insert service_single_page initial row
INSERT INTO service_single_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Update service_single_page
UPDATE service_single_page SET
    page_breadcrumb_en = 'Service Details',
    page_breadcrumb_es = 'Detalles del Servicio',
    page_breadcrumb_nl = 'Service Details',
    background_image = '/images/page-title.jpg',

    sidebar_all_services_en = 'All Services',
    sidebar_all_services_es = 'Todos los Servicios',
    sidebar_all_services_nl = 'Alle Diensten',

    sidebar_features_title_en = 'Why Choose Us',
    sidebar_features_title_es = '¿Por Qué Elegirnos?',
    sidebar_features_title_nl = 'Waarom Ons Kiezen',
    sidebar_feature_1_en = 'Expert Team',
    sidebar_feature_1_es = 'Equipo Experto',
    sidebar_feature_1_nl = 'Expert Team',
    sidebar_feature_2_en = 'Proven Results',
    sidebar_feature_2_es = 'Resultados Probados',
    sidebar_feature_2_nl = 'Bewezen Resultaten',
    sidebar_feature_3_en = 'Custom Solutions',
    sidebar_feature_3_es = 'Soluciones Personalizadas',
    sidebar_feature_3_nl = 'Maatwerkoplossingen',
    sidebar_feature_4_en = '24/7 Support',
    sidebar_feature_4_es = 'Soporte 24/7',
    sidebar_feature_4_nl = '24/7 Ondersteuning',

    sidebar_download_en = 'Download Brochure',
    sidebar_download_es = 'Descargar Folleto',
    sidebar_download_nl = 'Download Brochure',

    sidebar_help_title_en = 'Need Help?',
    sidebar_help_title_es = '¿Necesitas Ayuda?',
    sidebar_help_title_nl = 'Hulp Nodig?',
    sidebar_help_text_en = 'Contact us for a free consultation about your project.',
    sidebar_help_text_es = 'Contáctenos para una consulta gratuita sobre su proyecto.',
    sidebar_help_text_nl = 'Neem contact met ons op voor een gratis adviesgesprek.',
    sidebar_help_phone = '+31 20 123 4567',
    sidebar_contact_link_en = 'Contact Us',
    sidebar_contact_link_es = 'Contáctanos',
    sidebar_contact_link_nl = 'Neem Contact Op',

    form_title_en = 'Request This Service',
    form_title_es = 'Solicitar Este Servicio',
    form_title_nl = 'Vraag Deze Dienst Aan',
    form_name_placeholder_en = 'Your Name',
    form_name_placeholder_es = 'Tu Nombre',
    form_name_placeholder_nl = 'Uw Naam',
    form_email_placeholder_en = 'Your Email',
    form_email_placeholder_es = 'Tu Correo',
    form_email_placeholder_nl = 'Uw E-mail',
    form_phone_placeholder_en = 'Your Phone',
    form_phone_placeholder_es = 'Tu Teléfono',
    form_phone_placeholder_nl = 'Uw Telefoon',
    form_submit_button_en = 'Send Request',
    form_submit_button_es = 'Enviar Solicitud',
    form_submit_button_nl = 'Verstuur Aanvraag'
WHERE id = 1;

-- Insert blog_single_page initial row
INSERT INTO blog_single_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Update blog_single_page
UPDATE blog_single_page SET
    page_breadcrumb_en = 'Blog',
    page_breadcrumb_es = 'Blog',
    page_breadcrumb_nl = 'Blog',
    background_image = '/images/page-title.jpg',

    tags_label_en = 'Tags',
    tags_label_es = 'Etiquetas',
    tags_label_nl = 'Tags',
    share_label_en = 'Share',
    share_label_es = 'Compartir',
    share_label_nl = 'Delen',
    author_label_en = 'By',
    author_label_es = 'Por',
    author_label_nl = 'Door',

    comments_title_en = 'Comments',
    comments_title_es = 'Comentarios',
    comments_title_nl = 'Reacties',
    reply_button_en = 'Reply',
    reply_button_es = 'Responder',
    reply_button_nl = 'Reageren',
    post_comments_title_en = 'Leave a Comment',
    post_comments_title_es = 'Dejar un Comentario',
    post_comments_title_nl = 'Laat een Reactie Achter',

    form_comment_placeholder_en = 'Write your comment...',
    form_comment_placeholder_es = 'Escribe tu comentario...',
    form_comment_placeholder_nl = 'Schrijf uw reactie...',
    form_website_placeholder_en = 'Website (optional)',
    form_website_placeholder_es = 'Sitio Web (opcional)',
    form_website_placeholder_nl = 'Website (optioneel)',
    form_name_placeholder_en = 'Your Name',
    form_name_placeholder_es = 'Tu Nombre',
    form_name_placeholder_nl = 'Uw Naam',
    form_email_placeholder_en = 'Your Email',
    form_email_placeholder_es = 'Tu Correo',
    form_email_placeholder_nl = 'Uw E-mail',
    form_submit_button_en = 'Post Comment',
    form_submit_button_es = 'Publicar Comentario',
    form_submit_button_nl = 'Reactie Plaatsen',

    nav_previous_en = 'Previous Post',
    nav_previous_es = 'Artículo Anterior',
    nav_previous_nl = 'Vorig Bericht',
    nav_next_en = 'Next Post',
    nav_next_es = 'Siguiente Artículo',
    nav_next_nl = 'Volgend Bericht'
WHERE id = 1;

-- Insert services_page initial row
INSERT INTO services_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Update services_page
UPDATE services_page SET
    page_title_en = 'Our Services',
    page_title_es = 'Nuestros Servicios',
    page_title_nl = 'Onze Diensten',
    page_breadcrumb_en = 'Services',
    page_breadcrumb_es = 'Servicios',
    page_breadcrumb_nl = 'Diensten',
    background_image = '/images/page-title.jpg',
    section_tag_en = 'Services',
    section_tag_es = 'Servicios',
    section_tag_nl = 'Diensten',
    section_title_en = 'Best services',
    section_title_es = 'Mejores servicios',
    section_title_nl = 'Beste diensten',
    section_description_en = 'Showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look.',
    section_description_es = 'Mostraba a una dama equipada con un sombrero de piel y una boa de piel que estaba sentada erguida, levantando un pesado manguito de piel que cubría todo su antebrazo hacia el espectador.',
    section_description_nl = 'Toonde een dame uitgerust met een bontmuts en bontboa die rechtop zat, een zware bontmof opheffend die haar hele onderarm bedekte naar de kijker.'
WHERE id = 1;

-- Insert blog_page initial row
INSERT INTO blog_page (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Update blog_page
UPDATE blog_page SET
    page_title_en = 'Latest News & Events',
    page_title_es = 'Últimas Noticias y Eventos',
    page_title_nl = 'Laatste Nieuws & Evenementen',
    page_breadcrumb_en = 'Blog',
    page_breadcrumb_es = 'Blog',
    page_breadcrumb_nl = 'Blog',
    read_more_en = 'Read More',
    read_more_es = 'Leer Más',
    read_more_nl = 'Lees Meer',
    comments_suffix_en = 'Comments',
    comments_suffix_es = 'Comentarios',
    comments_suffix_nl = 'Reacties',
    sidebar_search_title_en = 'Search',
    sidebar_search_title_es = 'Buscar',
    sidebar_search_title_nl = 'Zoeken',
    sidebar_search_placeholder_en = 'Search here...',
    sidebar_search_placeholder_es = 'Buscar aquí...',
    sidebar_search_placeholder_nl = 'Zoek hier...',
    sidebar_about_title_en = 'About Us',
    sidebar_about_title_es = 'Sobre Nosotros',
    sidebar_about_title_nl = 'Over Ons',
    sidebar_about_text_en = 'We are a consulting agency dedicated to helping businesses grow.',
    sidebar_about_text_es = 'Somos una agencia de consultoría dedicada a ayudar a las empresas a crecer.',
    sidebar_about_text_nl = 'Wij zijn een adviesbureau dat bedrijven helpt groeien.',
    sidebar_about_link_en = 'Learn More',
    sidebar_about_link_es = 'Saber Más',
    sidebar_about_link_nl = 'Meer Info',
    sidebar_categories_title_en = 'Categories',
    sidebar_categories_title_es = 'Categorías',
    sidebar_categories_title_nl = 'Categorieën',
    sidebar_related_title_en = 'Related Posts',
    sidebar_related_title_es = 'Artículos Relacionados',
    sidebar_related_title_nl = 'Gerelateerde Berichten',
    sidebar_tags_title_en = 'Tags',
    sidebar_tags_title_es = 'Etiquetas',
    sidebar_tags_title_nl = 'Tags'
WHERE id = 1;

-- Update existing services with full content
UPDATE services SET
    background_image = '/images/page-title.jpg',
    description_en = 'Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and.',
    description_es = 'Samsa era un viajante de comercio y encima colgaba una imagen que había recortado recientemente de una revista ilustrada.',
    description_nl = 'Samsa was een handelsreiziger en daarboven hing een foto die hij onlangs uit een tijdschrift had geknipt.',
    section_1_title_en = 'Overview',
    section_1_title_es = 'Descripción General',
    section_1_title_nl = 'Overzicht',
    section_1_content_en = '<p>Our market research services provide comprehensive insights into your target market, helping you make informed business decisions.</p>',
    section_1_content_es = '<p>Nuestros servicios de investigación de mercado proporcionan información completa sobre su mercado objetivo, ayudándole a tomar decisiones comerciales informadas.</p>',
    section_1_content_nl = '<p>Onze marktonderzoeksdiensten bieden uitgebreide inzichten in uw doelmarkt.</p>',
    section_2_title_en = 'Our Approach',
    section_2_title_es = 'Nuestro Enfoque',
    section_2_title_nl = 'Onze Aanpak',
    section_2_content_en = '<p>We use cutting-edge methodologies and tools to gather and analyze market data.</p>',
    section_2_content_es = '<p>Utilizamos metodologías y herramientas de vanguardia para recopilar y analizar datos del mercado.</p>',
    section_2_content_nl = '<p>We gebruiken geavanceerde methodologieën en tools om marktgegevens te verzamelen.</p>',
    section_3_title_en = 'Results',
    section_3_title_es = 'Resultados',
    section_3_title_nl = 'Resultaten',
    section_3_content_en = '<p>Our clients see measurable improvements in their market positioning and business performance.</p>',
    section_3_content_es = '<p>Nuestros clientes ven mejoras medibles en su posicionamiento de mercado y rendimiento empresarial.</p>',
    section_3_content_nl = '<p>Onze klanten zien meetbare verbeteringen in hun marktpositie.</p>'
WHERE slug = 'market-research';

UPDATE services SET
    background_image = '/images/page-title.jpg',
    description_en = 'Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and.',
    description_es = 'Samsa era un viajante de comercio y encima colgaba una imagen que había recortado recientemente de una revista ilustrada.',
    description_nl = 'Samsa was een handelsreiziger en daarboven hing een foto die hij onlangs uit een tijdschrift had geknipt.',
    section_1_title_en = 'Overview',
    section_1_title_es = 'Descripción General',
    section_1_title_nl = 'Overzicht',
    section_1_content_en = '<p>Expert financial advisory services to help your business grow and succeed.</p>',
    section_1_content_es = '<p>Servicios de asesoría financiera experta para ayudar a su negocio a crecer y tener éxito.</p>',
    section_1_content_nl = '<p>Deskundige financiële adviesdiensten om uw bedrijf te laten groeien.</p>',
    section_2_title_en = 'Our Approach',
    section_2_title_es = 'Nuestro Enfoque',
    section_2_title_nl = 'Onze Aanpak',
    section_2_content_en = '<p>We analyze your financial situation and create customized strategies.</p>',
    section_2_content_es = '<p>Analizamos su situación financiera y creamos estrategias personalizadas.</p>',
    section_2_content_nl = '<p>We analyseren uw financiële situatie en creëren strategieën op maat.</p>',
    section_3_title_en = 'Results',
    section_3_title_es = 'Resultados',
    section_3_title_nl = 'Resultaten',
    section_3_content_en = '<p>Improved financial performance and sustainable growth for your business.</p>',
    section_3_content_es = '<p>Mejor rendimiento financiero y crecimiento sostenible para su negocio.</p>',
    section_3_content_nl = '<p>Verbeterde financiële prestaties en duurzame groei voor uw bedrijf.</p>'
WHERE slug = 'corporate-finance';

UPDATE services SET
    background_image = '/images/page-title.jpg',
    description_en = 'Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and.',
    description_es = 'Samsa era un viajante de comercio y encima colgaba una imagen que había recortado recientemente de una revista ilustrada.',
    description_nl = 'Samsa was een handelsreiziger en daarboven hing een foto die hij onlangs uit een tijdschrift had geknipt.',
    section_1_title_en = 'Overview',
    section_1_title_es = 'Descripción General',
    section_1_title_nl = 'Overzicht',
    section_1_content_en = '<p>Data-driven insights to transform your business operations and decision-making.</p>',
    section_1_content_es = '<p>Información basada en datos para transformar las operaciones de su negocio y la toma de decisiones.</p>',
    section_1_content_nl = '<p>Datagestuurde inzichten om uw bedrijfsvoering te transformeren.</p>',
    section_2_title_en = 'Our Approach',
    section_2_title_es = 'Nuestro Enfoque',
    section_2_title_nl = 'Onze Aanpak',
    section_2_content_en = '<p>We leverage advanced analytics tools and machine learning algorithms.</p>',
    section_2_content_es = '<p>Aprovechamos herramientas de análisis avanzado y algoritmos de aprendizaje automático.</p>',
    section_2_content_nl = '<p>We maken gebruik van geavanceerde analysetools en machine learning-algoritmen.</p>',
    section_3_title_en = 'Results',
    section_3_title_es = 'Resultados',
    section_3_title_nl = 'Resultaten',
    section_3_content_en = '<p>Better business decisions backed by comprehensive data analysis.</p>',
    section_3_content_es = '<p>Mejores decisiones comerciales respaldadas por un análisis de datos completo.</p>',
    section_3_content_nl = '<p>Betere zakelijke beslissingen ondersteund door data-analyse.</p>'
WHERE slug = 'advanced-analytics';

-- Update blog_page with background image
UPDATE blog_page SET
    background_image = '/images/page-title.jpg'
WHERE id = 1;

-- Insert Tags (use ON CONFLICT to avoid duplicates)
INSERT INTO tags (slug, name_en, name_es, name_nl) VALUES
('business', 'Business', 'Negocios', 'Zakelijk'),
('technology', 'Technology', 'Tecnología', 'Technologie')
ON CONFLICT (slug) DO NOTHING;

-- Insert 6 Example Blogs
INSERT INTO blogs (slug, title_en, title_es, title_nl, description_en, description_es, description_nl, content_en, content_es, content_nl, image_url, thumbnail_url, published_at, is_published) VALUES
('consulting-success-strategies',
 'Consulting Success: Key Strategies for Growth',
 'Éxito en Consultoría: Estrategias Clave para el Crecimiento',
 'Consultingsucces: Belangrijke Strategieën voor Groei',
 'Discover the essential strategies that leading consulting firms use to drive growth and success.',
 'Descubre las estrategias esenciales que utilizan las principales firmas de consultoría para impulsar el crecimiento.',
 'Ontdek de essentiële strategieën die toonaangevende adviesbureaus gebruiken voor groei.',
 '<p>In today''s competitive business landscape, consulting firms must continuously evolve their strategies to stay ahead. This article explores the key approaches that successful consultants use to drive growth.</p><h3>1. Client-Centric Approach</h3><p>The most successful consulting firms prioritize their clients'' needs above all else. By deeply understanding client challenges and goals, consultants can provide tailored solutions that deliver real value.</p><h3>2. Continuous Learning</h3><p>The business world is constantly changing. Successful consultants invest in continuous learning and skill development to stay relevant and provide cutting-edge advice.</p>',
 '<p>En el competitivo panorama empresarial actual, las firmas de consultoría deben evolucionar continuamente sus estrategias para mantenerse a la vanguardia.</p><h3>1. Enfoque Centrado en el Cliente</h3><p>Las firmas de consultoría más exitosas priorizan las necesidades de sus clientes por encima de todo.</p><h3>2. Aprendizaje Continuo</h3><p>El mundo empresarial está en constante cambio. Los consultores exitosos invierten en aprendizaje continuo.</p>',
 '<p>In het huidige competitieve bedrijfslandschap moeten adviesbureaus hun strategieën continu ontwikkelen om voorop te blijven.</p><h3>1. Klantgerichte Aanpak</h3><p>De meest succesvolle adviesbureaus geven prioriteit aan de behoeften van hun klanten.</p>',
 '/images/blog/img-1.jpg',
 '/images/blog/img-1.jpg',
 '2024-01-15',
 true),

('digital-transformation-guide',
 'A Complete Guide to Digital Transformation',
 'Guía Completa para la Transformación Digital',
 'Complete Gids voor Digitale Transformatie',
 'Learn how businesses are leveraging digital technologies to transform their operations and customer experiences.',
 'Aprende cómo las empresas están aprovechando las tecnologías digitales para transformar sus operaciones.',
 'Leer hoe bedrijven digitale technologieën benutten om hun activiteiten te transformeren.',
 '<p>Digital transformation is no longer optional—it''s essential for business survival. This guide covers the fundamental aspects of implementing a successful digital transformation strategy.</p><h3>Understanding Digital Transformation</h3><p>At its core, digital transformation involves using technology to fundamentally change how businesses operate and deliver value to customers.</p><h3>Key Technologies</h3><p>Cloud computing, artificial intelligence, and data analytics are driving the digital revolution across industries.</p>',
 '<p>La transformación digital ya no es opcional—es esencial para la supervivencia empresarial.</p><h3>Entendiendo la Transformación Digital</h3><p>En esencia, la transformación digital implica usar la tecnología para cambiar fundamentalmente cómo operan las empresas.</p>',
 '<p>Digitale transformatie is niet langer optioneel—het is essentieel voor bedrijfsoverleving.</p><h3>Digitale Transformatie Begrijpen</h3><p>In de kern gaat digitale transformatie over het gebruik van technologie om fundamenteel te veranderen hoe bedrijven opereren.</p>',
 '/images/blog/img-2.jpg',
 '/images/blog/img-2.jpg',
 '2024-01-20',
 true),

('financial-planning-tips',
 'Top 10 Financial Planning Tips for Businesses',
 '10 Consejos de Planificación Financiera para Empresas',
 'Top 10 Financiële Planningstips voor Bedrijven',
 'Essential financial planning strategies that every business owner should know to ensure long-term success.',
 'Estrategias esenciales de planificación financiera que todo empresario debe conocer.',
 'Essentiële financiële planningsstrategieën die elke ondernemer moet kennen.',
 '<p>Sound financial planning is the foundation of any successful business. Here are ten essential tips to help you manage your business finances effectively.</p><h3>1. Create a Budget</h3><p>A detailed budget helps you track expenses and allocate resources efficiently.</p><h3>2. Build an Emergency Fund</h3><p>Having cash reserves protects your business during unexpected downturns.</p>',
 '<p>Una planificación financiera sólida es la base de cualquier negocio exitoso.</p><h3>1. Crear un Presupuesto</h3><p>Un presupuesto detallado te ayuda a rastrear gastos y asignar recursos eficientemente.</p>',
 '<p>Goede financiële planning is de basis van elk succesvol bedrijf.</p><h3>1. Maak een Budget</h3><p>Een gedetailleerd budget helpt u uitgaven te volgen en middelen efficiënt toe te wijzen.</p>',
 '/images/blog/img-3.jpg',
 '/images/blog/img-3.jpg',
 '2024-02-01',
 true),

('leadership-in-crisis',
 'Leadership in Times of Crisis',
 'Liderazgo en Tiempos de Crisis',
 'Leiderschap in Crisistijden',
 'How effective leaders navigate their organizations through challenging times and emerge stronger.',
 'Cómo los líderes efectivos guían a sus organizaciones a través de tiempos difíciles.',
 'Hoe effectieve leiders hun organisaties door uitdagende tijden navigeren.',
 '<p>Crisis situations test the mettle of every leader. This article examines the qualities and strategies that define effective crisis leadership.</p><h3>Stay Calm and Focused</h3><p>In times of crisis, teams look to their leaders for guidance and reassurance.</p><h3>Communicate Transparently</h3><p>Clear, honest communication builds trust and keeps everyone aligned.</p>',
 '<p>Las situaciones de crisis ponen a prueba a cada líder.</p><h3>Mantén la Calma</h3><p>En tiempos de crisis, los equipos buscan orientación en sus líderes.</p>',
 '<p>Crisissituaties testen elke leider.</p><h3>Blijf Kalm en Gefocust</h3><p>In tijden van crisis kijken teams naar hun leiders voor begeleiding.</p>',
 '/images/blog/img-4.jpg',
 '/images/blog/img-4.jpg',
 '2024-02-10',
 true),

('sustainable-business-practices',
 'Implementing Sustainable Business Practices',
 'Implementando Prácticas Empresariales Sostenibles',
 'Implementatie van Duurzame Bedrijfspraktijken',
 'A comprehensive look at how businesses can adopt sustainable practices while maintaining profitability.',
 'Una mirada integral sobre cómo las empresas pueden adoptar prácticas sostenibles.',
 'Een uitgebreide blik op hoe bedrijven duurzame praktijken kunnen toepassen.',
 '<p>Sustainability is no longer just a buzzword—it''s a business imperative. Learn how to integrate sustainable practices into your operations.</p><h3>Why Sustainability Matters</h3><p>Consumers increasingly prefer brands that demonstrate environmental responsibility.</p><h3>Getting Started</h3><p>Begin with an audit of your current environmental impact and identify areas for improvement.</p>',
 '<p>La sostenibilidad ya no es solo una palabra de moda—es un imperativo empresarial.</p><h3>Por Qué Importa la Sostenibilidad</h3><p>Los consumidores prefieren cada vez más las marcas que demuestran responsabilidad ambiental.</p>',
 '<p>Duurzaamheid is niet langer alleen een modewoord—het is een zakelijke noodzaak.</p><h3>Waarom Duurzaamheid Belangrijk Is</h3><p>Consumenten geven steeds meer de voorkeur aan merken die milieuverantwoordelijkheid tonen.</p>',
 '/images/blog/img-5.jpg',
 '/images/blog/img-5.jpg',
 '2024-02-15',
 true),

('market-trends-2024',
 'Market Trends to Watch in 2024',
 'Tendencias del Mercado a Observar en 2024',
 'Markttrends om te Volgen in 2024',
 'Stay ahead of the curve with our analysis of the most important market trends shaping business in 2024.',
 'Mantente a la vanguardia con nuestro análisis de las tendencias más importantes del mercado.',
 'Blijf voorop met onze analyse van de belangrijkste markttrends die het bedrijfsleven vormgeven.',
 '<p>As we move through 2024, several key trends are reshaping the business landscape. Understanding these trends is crucial for strategic planning.</p><h3>AI Integration</h3><p>Artificial intelligence is becoming increasingly integrated into business operations across all sectors.</p><h3>Remote Work Evolution</h3><p>The future of work continues to evolve, with hybrid models becoming the new standard.</p>',
 '<p>A medida que avanzamos en 2024, varias tendencias clave están remodelando el panorama empresarial.</p><h3>Integración de IA</h3><p>La inteligencia artificial se está integrando cada vez más en las operaciones empresariales.</p>',
 '<p>Terwijl we door 2024 gaan, hervormen verschillende belangrijke trends het zakelijke landschap.</p><h3>AI-Integratie</h3><p>Kunstmatige intelligentie wordt steeds meer geïntegreerd in bedrijfsactiviteiten.</p>',
 '/images/blog/img-6.jpg',
 '/images/blog/img-6.jpg',
 '2024-02-20',
 true);

-- Associate blogs with tags
INSERT INTO blog_tags (blog_id, tag_id)
SELECT b.id, t.id FROM blogs b, tags t
WHERE b.slug = 'consulting-success-strategies' AND t.slug IN ('business', 'consulting');

INSERT INTO blog_tags (blog_id, tag_id)
SELECT b.id, t.id FROM blogs b, tags t
WHERE b.slug = 'digital-transformation-guide' AND t.slug IN ('technology', 'business');

INSERT INTO blog_tags (blog_id, tag_id)
SELECT b.id, t.id FROM blogs b, tags t
WHERE b.slug = 'financial-planning-tips' AND t.slug IN ('finance', 'business');

INSERT INTO blog_tags (blog_id, tag_id)
SELECT b.id, t.id FROM blogs b, tags t
WHERE b.slug = 'leadership-in-crisis' AND t.slug IN ('business', 'strategy');

INSERT INTO blog_tags (blog_id, tag_id)
SELECT b.id, t.id FROM blogs b, tags t
WHERE b.slug = 'sustainable-business-practices' AND t.slug IN ('business', 'strategy');

INSERT INTO blog_tags (blog_id, tag_id)
SELECT b.id, t.id FROM blogs b, tags t
WHERE b.slug = 'market-trends-2024' AND t.slug IN ('business', 'marketing');
