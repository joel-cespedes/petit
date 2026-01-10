import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function EditGlobal() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState({});
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('en');

    const languages = ['en', 'es', 'nl'];
    const languageNames = { en: 'English', es: 'Spanish', nl: 'Dutch' };

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('/images')) return `http://localhost:3000${path}`;
        return path;
    };

    const handleImageUpload = async (field, file) => {
        if (!file) return;
        setUploading(prev => ({ ...prev, [field]: true }));
        try {
            const token = localStorage.getItem('admin_token');
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(`${API_URL}/api/admin/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            if (res.ok) {
                const result = await res.json();
                setData(prev => ({ ...prev, [field]: result.url }));
                setMessage('Image uploaded successfully!');
            } else {
                setMessage('Error uploading image');
            }
        } catch (err) {
            setMessage('Error uploading image');
        } finally {
            setUploading(prev => ({ ...prev, [field]: false }));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/global`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                const result = await res.json();
                setData(result);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/global`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setMessage('Saved successfully!');
            } else {
                setMessage('Error saving data');
            }
        } catch (err) {
            setMessage('Error saving data');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Edit Global Content">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    const translatedFields = [
        { name: 'footer_about_text', label: 'Footer About Text', type: 'textarea' },
        { name: 'footer_nav_title', label: 'Footer Navigation Title', type: 'text' },
        { name: 'footer_contact_title', label: 'Footer Contact Title', type: 'text' },
        { name: 'footer_copyright', label: 'Copyright Text', type: 'text' },
    ];

    return (
        <AdminLayout title="Edit Global Content">
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

            {/* Logo Section */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Site Logos</h3>
                <div style={styles.logoGrid}>
                    <div style={styles.imageUpload}>
                        <label style={styles.label}>Logo Dark (for light backgrounds)</label>
                        {data?.logo_url && (
                            <img src={getImageUrl(data.logo_url)} alt="Logo Dark" style={styles.imagePreview} />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('logo_url', e.target.files[0])}
                            style={styles.fileInput}
                            disabled={uploading.logo_url}
                        />
                        {uploading.logo_url && <span>Uploading...</span>}
                    </div>
                    <div style={{...styles.imageUpload, backgroundColor: '#333'}}>
                        <label style={{...styles.label, color: '#fff'}}>Logo White (for dark backgrounds)</label>
                        {data?.logo_white && (
                            <img src={getImageUrl(data.logo_white)} alt="Logo White" style={styles.imagePreview} />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('logo_white', e.target.files[0])}
                            style={styles.fileInput}
                            disabled={uploading.logo_white}
                        />
                        {uploading.logo_white && <span style={{color: '#fff'}}>Uploading...</span>}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Translated Content ({languageNames[activeTab]})</h3>
                    {translatedFields.map((field) => {
                        const fieldName = `${field.name}_${activeTab}`;
                        return (
                            <div key={fieldName} style={styles.formGroup}>
                                <label style={styles.label}>{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        value={data?.[fieldName] || ''}
                                        onChange={(e) => handleChange(fieldName, e.target.value)}
                                        style={styles.textarea}
                                        rows={3}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={data?.[fieldName] || ''}
                                        onChange={(e) => handleChange(fieldName, e.target.value)}
                                        style={styles.input}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Contact Information (All Languages)</h3>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Phone</label>
                            <input
                                type="text"
                                value={data?.phone || ''}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                value={data?.email || ''}
                                onChange={(e) => handleChange('email', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Address</label>
                            <input
                                type="text"
                                value={data?.address || ''}
                                onChange={(e) => handleChange('address', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Social Media Links</h3>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Facebook URL</label>
                            <input
                                type="url"
                                value={data?.social_facebook || ''}
                                onChange={(e) => handleChange('social_facebook', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Twitter URL</label>
                            <input
                                type="url"
                                value={data?.social_twitter || ''}
                                onChange={(e) => handleChange('social_twitter', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Instagram URL</label>
                            <input
                                type="url"
                                value={data?.social_instagram || ''}
                                onChange={(e) => handleChange('social_instagram', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>LinkedIn URL</label>
                            <input
                                type="url"
                                value={data?.social_linkedin || ''}
                                onChange={(e) => handleChange('social_linkedin', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Pinterest URL</label>
                            <input
                                type="url"
                                value={data?.social_pinterest || ''}
                                onChange={(e) => handleChange('social_pinterest', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" style={styles.submitBtn} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </AdminLayout>
    );
}

const styles = {
    tabs: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
    },
    tab: {
        padding: '10px 20px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
    },
    message: {
        padding: '10px 15px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    section: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    sectionTitle: {
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginBottom: '20px',
        color: '#333',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '500',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        boxSizing: 'border-box',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        boxSizing: 'border-box',
        resize: 'vertical',
    },
    submitBtn: {
        padding: '12px 30px',
        backgroundColor: '#c19d56',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    logoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
    },
    imageUpload: {
        border: '2px dashed #ddd',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
    },
    imagePreview: {
        maxWidth: '100%',
        maxHeight: '100px',
        objectFit: 'contain',
        borderRadius: '4px',
        marginBottom: '10px',
    },
    fileInput: {
        width: '100%',
        padding: '10px',
        cursor: 'pointer',
    },
};
