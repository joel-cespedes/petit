import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:3000${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function EditContactPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('en');

    const languages = ['en', 'es', 'nl'];
    const languageNames = { en: 'English', es: 'Spanish', nl: 'Dutch' };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/contact-page`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) setData(await res.json());
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        if (data[field]) formData.append('old_url', data[field]);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            if (res.ok) {
                const result = await res.json();
                handleChange(field, result.url);
            } else {
                alert('Error uploading image');
            }
        } catch (err) {
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/contact-page`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            setMessage(res.ok ? 'Saved successfully!' : 'Error saving data');
        } catch (err) {
            setMessage('Error saving data');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <AdminLayout title="Edit Contact Page"><p>Loading...</p></AdminLayout>;
    }

    // Campo de texto multi-idioma
    const langField = (label, field, type = 'input') => (
        <div style={styles.formGroup}>
            <label style={styles.label}>{label} ({languageNames[activeTab]})</label>
            {type === 'textarea' ? (
                <textarea
                    value={data?.[`${field}_${activeTab}`] || ''}
                    onChange={(e) => handleChange(`${field}_${activeTab}`, e.target.value)}
                    rows={3}
                    style={{ ...styles.input, resize: 'vertical' }}
                />
            ) : (
                <input
                    type="text"
                    value={data?.[`${field}_${activeTab}`] || ''}
                    onChange={(e) => handleChange(`${field}_${activeTab}`, e.target.value)}
                    style={styles.input}
                />
            )}
        </div>
    );

    // Campo único (sin idioma)
    const plainField = (label, field, placeholder = '', help = '') => (
        <div style={styles.formGroup}>
            <label style={styles.label}>{label}</label>
            <input
                type="text"
                value={data?.[field] || ''}
                onChange={(e) => handleChange(field, e.target.value)}
                style={styles.input}
                placeholder={placeholder}
            />
            {help && <span style={styles.help}>{help}</span>}
        </div>
    );

    return (
        <AdminLayout title="Edit Contact Page">
            <div style={styles.tabs}>
                {languages.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setActiveTab(lang)}
                        style={{
                            ...styles.tab,
                            backgroundColor: activeTab === lang ? '#c19d56' : '#fff',
                            color: activeTab === lang ? '#fff' : '#333',
                        }}
                    >
                        {languageNames[lang]}
                    </button>
                ))}
            </div>

            {message && (
                <div style={{
                    ...styles.message,
                    backgroundColor: message.includes('Error') ? '#fee' : '#efe',
                    color: message.includes('Error') ? '#c00' : '#0a0',
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Contact details (no idioma) */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Contact Details</h3>
                    <div style={styles.row}>
                        {plainField('Email destino (donde LLEGAN los mensajes del formulario)', 'email_to', 'info@bucareconsultancy.com', 'Aquí llegan los correos enviados desde el formulario.')}
                        {plainField('Email mostrado (botón mailto)', 'email_mailto', 'info@bucareconsultancy.com', 'El que ve el visitante al pulsar el email.')}
                    </div>
                    <div style={styles.row}>
                        {plainField('WhatsApp (número internacional, sin + ni espacios)', 'whatsapp_number', '34123456789', 'Ej: 34612345678. Vacío = oculta el botón.')}
                        {plainField('Teléfono', 'phone', '+34 600 000 000')}
                    </div>
                    {plainField('LinkedIn URL', 'linkedin_url', 'https://www.linkedin.com/company/...')}
                </div>

                {/* Page header */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Page Header</h3>
                    <div style={styles.row}>
                        {langField('Page Title', 'page_title')}
                        {langField('Breadcrumb', 'page_breadcrumb')}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Background Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'background_image')}
                            style={styles.input}
                            disabled={uploading}
                        />
                        {data?.background_image && (
                            <div style={{ marginTop: '10px' }}>
                                <img src={getImageUrl(data.background_image)} alt="Background" style={styles.previewImg} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Section header */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Section Header</h3>
                    {langField('Tag', 'section_tag')}
                    {langField('Title', 'section_title')}
                    {langField('Subtitle', 'section_subtitle', 'textarea')}
                </div>

                {/* Form labels */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Form Labels</h3>
                    <div style={styles.row}>
                        {langField('Name Label', 'form_name_label')}
                        {langField('Email Label', 'form_email_label')}
                    </div>
                    <div style={styles.row}>
                        {langField('Message Label', 'form_message_label')}
                        {langField('Button Text', 'form_button')}
                    </div>
                    {langField('Success Message', 'form_success', 'textarea')}
                    {langField('Address', 'address')}
                </div>

                {uploading && <p>Uploading image...</p>}

                <button type="submit" style={styles.submitBtn} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </AdminLayout>
    );
}

const styles = {
    tabs: { display: 'flex', gap: '10px', marginBottom: '20px' },
    tab: { padding: '10px 20px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 },
    message: { padding: '10px 15px', borderRadius: '4px', marginBottom: '20px' },
    section: { backgroundColor: '#fff', padding: '25px', borderRadius: '8px', marginBottom: '20px' },
    sectionTitle: { marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #eee', color: '#333' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', fontWeight: 500, color: '#333' },
    input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' },
    help: { display: 'block', marginTop: '4px', fontSize: '12px', color: '#888' },
    previewImg: { maxWidth: '250px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' },
    submitBtn: { padding: '12px 30px', backgroundColor: '#c19d56', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
};
