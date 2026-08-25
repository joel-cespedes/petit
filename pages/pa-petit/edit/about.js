import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:3000${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function EditAboutPage() {
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
            const res = await fetch(`${API_URL}/api/admin/about`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                setData(await res.json());
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

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        if (data[field]) {
            formData.append('old_url', data[field]);
        }

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

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
            const res = await fetch(`${API_URL}/api/admin/about`, {
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
            <AdminLayout title="Edit About Page">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit About Page">
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
                {/* Page Header Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Page Header</h3>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Page Title</label>
                            <input
                                type="text"
                                value={data?.[`page_title_${activeTab}`] || ''}
                                onChange={(e) => handleChange(`page_title_${activeTab}`, e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Breadcrumb</label>
                            <input
                                type="text"
                                value={data?.[`page_breadcrumb_${activeTab}`] || ''}
                                onChange={(e) => handleChange(`page_breadcrumb_${activeTab}`, e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Background Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'background_image')}
                            style={styles.fileInput}
                            disabled={uploading}
                        />
                        {data?.background_image && (
                            <div style={styles.imagePreview}>
                                <img src={getImageUrl(data.background_image)} alt="Background" style={styles.previewImg} />
                            </div>
                        )}
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Team Profiles</h3>
                    <p style={{ color: '#666', margin: 0 }}>
                        Profiles (photo, contact, social links and text sections) are now managed
                        as a list in <strong>Team Profiles</strong>, so you can add as many as you need.
                    </p>
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
        padding: '25px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    sectionTitle: {
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee',
        color: '#333',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
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
    fileInput: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
    },
    imagePreview: {
        marginTop: '10px',
    },
    previewImg: {
        maxWidth: '200px',
        maxHeight: '150px',
        objectFit: 'cover',
        borderRadius: '4px',
        border: '1px solid #ddd',
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
};
