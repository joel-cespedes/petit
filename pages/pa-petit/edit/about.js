import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminLayout from '../../../components/admin/AdminLayout';

const RichTextEditor = dynamic(
    () => import('../../../components/admin/RichTextEditor'),
    { ssr: false, loading: () => <p>Loading editor...</p> }
);

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

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
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

                {/* Profile Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Profile Information</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'profile_image')}
                            style={styles.fileInput}
                            disabled={uploading}
                        />
                        {data?.profile_image && (
                            <div style={styles.imagePreview}>
                                <img src={getImageUrl(data.profile_image)} alt="Profile" style={styles.previewImg} />
                            </div>
                        )}
                    </div>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name</label>
                            <input
                                type="text"
                                value={data?.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Title/Position</label>
                            <input
                                type="text"
                                value={data?.[`title_${activeTab}`] || ''}
                                onChange={(e) => handleChange(`title_${activeTab}`, e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Contact Information</h3>
                    <div style={styles.row}>
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
                    </div>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Experience</label>
                            <input
                                type="text"
                                value={data?.[`experience_${activeTab}`] || ''}
                                onChange={(e) => handleChange(`experience_${activeTab}`, e.target.value)}
                                style={styles.input}
                                placeholder="e.g., 15 Years"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Address</label>
                            <input
                                type="text"
                                value={data?.[`address_${activeTab}`] || ''}
                                onChange={(e) => handleChange(`address_${activeTab}`, e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Social Links</h3>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Facebook URL</label>
                            <input
                                type="url"
                                value={data?.social_facebook || ''}
                                onChange={(e) => handleChange('social_facebook', e.target.value)}
                                style={styles.input}
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Twitter URL</label>
                            <input
                                type="url"
                                value={data?.social_twitter || ''}
                                onChange={(e) => handleChange('social_twitter', e.target.value)}
                                style={styles.input}
                                placeholder="https://twitter.com/..."
                            />
                        </div>
                    </div>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>LinkedIn URL</label>
                            <input
                                type="url"
                                value={data?.social_linkedin || ''}
                                onChange={(e) => handleChange('social_linkedin', e.target.value)}
                                style={styles.input}
                                placeholder="https://linkedin.com/..."
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Instagram URL</label>
                            <input
                                type="url"
                                value={data?.social_instagram || ''}
                                onChange={(e) => handleChange('social_instagram', e.target.value)}
                                style={styles.input}
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Pinterest URL</label>
                        <input
                            type="url"
                            value={data?.social_pinterest || ''}
                            onChange={(e) => handleChange('social_pinterest', e.target.value)}
                            style={styles.input}
                            placeholder="https://pinterest.com/..."
                        />
                    </div>
                </div>

                {/* Content Sections */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>About Me Section</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section Title</label>
                        <input
                            type="text"
                            value={data?.[`about_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`about_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Content</label>
                        <RichTextEditor
                            value={data?.[`about_content_${activeTab}`] || ''}
                            onChange={(value) => handleChange(`about_content_${activeTab}`, value)}
                        />
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Experience Section</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section Title</label>
                        <input
                            type="text"
                            value={data?.[`experience_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`experience_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Content</label>
                        <RichTextEditor
                            value={data?.[`experience_content_${activeTab}`] || ''}
                            onChange={(value) => handleChange(`experience_content_${activeTab}`, value)}
                        />
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Education Section</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section Title</label>
                        <input
                            type="text"
                            value={data?.[`education_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`education_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Content</label>
                        <RichTextEditor
                            value={data?.[`education_content_${activeTab}`] || ''}
                            onChange={(value) => handleChange(`education_content_${activeTab}`, value)}
                        />
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Achievements Section</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section Title</label>
                        <input
                            type="text"
                            value={data?.[`achievements_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`achievements_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Content</label>
                        <RichTextEditor
                            value={data?.[`achievements_content_${activeTab}`] || ''}
                            onChange={(value) => handleChange(`achievements_content_${activeTab}`, value)}
                        />
                    </div>
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
