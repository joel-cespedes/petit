import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function EditHome() {
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
        // If it starts with http, it's already a full URL
        if (path.startsWith('http')) return path;
        // If it starts with /images, it's a Next.js public path
        if (path.startsWith('/images')) return `http://localhost:3000${path}`;
        // Otherwise return as is
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
            const res = await fetch(`${API_URL}/api/admin/home`, {
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
            const res = await fetch(`${API_URL}/api/admin/home`, {
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
            <AdminLayout title="Edit Home Page">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit Home Page">
            {/* Images Section - Above language tabs */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Images (All Languages)</h3>
                <div style={styles.imagesGrid}>
                    <div style={styles.imageUpload}>
                        <label style={styles.label}>Hero Background Image</label>
                        {data?.hero_image && (
                            <img src={getImageUrl(data.hero_image)} alt="Hero" style={styles.imagePreview} />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('hero_image', e.target.files[0])}
                            style={styles.fileInput}
                            disabled={uploading.hero_image}
                        />
                        {uploading.hero_image && <span>Uploading...</span>}
                    </div>
                    <div style={styles.imageUpload}>
                        <label style={styles.label}>About Section Image</label>
                        {data?.about_image && (
                            <img src={getImageUrl(data.about_image)} alt="About" style={styles.imagePreview} />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('about_image', e.target.files[0])}
                            style={styles.fileInput}
                            disabled={uploading.about_image}
                        />
                        {uploading.about_image && <span>Uploading...</span>}
                    </div>
                    <div style={styles.imageUpload}>
                        <label style={styles.label}>Testimonial Quote Icon</label>
                        {data?.testimonial_quote_icon && (
                            <img src={getImageUrl(data.testimonial_quote_icon)} alt="Quote Icon" style={styles.imagePreview} />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('testimonial_quote_icon', e.target.files[0])}
                            style={styles.fileInput}
                            disabled={uploading.testimonial_quote_icon}
                        />
                        {uploading.testimonial_quote_icon && <span>Uploading...</span>}
                    </div>
                </div>
                <p style={{marginTop: '15px', color: '#666', fontSize: '14px'}}>
                    Logo and Partners are edited in their respective sections: Global Settings and Partners.
                </p>
            </div>

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
                {/* Hero Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Hero Section</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Hero Title ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`hero_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`hero_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Hero Subtitle ({languageNames[activeTab]})</label>
                        <textarea
                            value={data?.[`hero_subtitle_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`hero_subtitle_${activeTab}`, e.target.value)}
                            style={styles.textarea}
                            rows={3}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Hero Button Text ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`hero_button_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`hero_button_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Features Section</h3>
                    {[1, 2, 3].map((num) => (
                        <div key={num} style={styles.funfactRow}>
                            <h4>Feature {num}</h4>
                            <div style={styles.row}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Icon (flaticon class)</label>
                                    <input
                                        type="text"
                                        value={data?.[`feature${num}_icon`] || ''}
                                        onChange={(e) => handleChange(`feature${num}_icon`, e.target.value)}
                                        style={styles.input}
                                        placeholder="flaticon-sheriff"
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Title ({languageNames[activeTab]})</label>
                                    <input
                                        type="text"
                                        value={data?.[`feature${num}_title_${activeTab}`] || ''}
                                        onChange={(e) => handleChange(`feature${num}_title_${activeTab}`, e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Description ({languageNames[activeTab]})</label>
                                <textarea
                                    value={data?.[`feature${num}_description_${activeTab}`] || ''}
                                    onChange={(e) => handleChange(`feature${num}_description_${activeTab}`, e.target.value)}
                                    style={styles.textarea}
                                    rows={2}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* About Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>About Section</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>About Tag ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`about_tag_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`about_tag_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>About Title ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`about_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`about_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>About Description Bold ({languageNames[activeTab]})</label>
                        <textarea
                            value={data?.[`about_description_bold_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`about_description_bold_${activeTab}`, e.target.value)}
                            style={styles.textarea}
                            rows={2}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>About Description ({languageNames[activeTab]})</label>
                        <textarea
                            value={data?.[`about_description_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`about_description_${activeTab}`, e.target.value)}
                            style={styles.textarea}
                            rows={4}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>About Phone</label>
                        <input
                            type="text"
                            value={data?.about_phone || ''}
                            onChange={(e) => handleChange('about_phone', e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>

                {/* Services Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Services Section Header</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tag ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`services_tag_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`services_tag_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Title ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`services_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`services_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description ({languageNames[activeTab]})</label>
                        <textarea
                            value={data?.[`services_description_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`services_description_${activeTab}`, e.target.value)}
                            style={styles.textarea}
                            rows={3}
                        />
                    </div>
                </div>

                {/* Testimonial Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Testimonial Section</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Quote ({languageNames[activeTab]})</label>
                        <textarea
                            value={data?.[`testimonial_quote_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`testimonial_quote_${activeTab}`, e.target.value)}
                            style={styles.textarea}
                            rows={3}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Author Name</label>
                        <input
                            type="text"
                            value={data?.testimonial_author || ''}
                            onChange={(e) => handleChange('testimonial_author', e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>

                {/* Fun Facts */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Fun Facts</h3>
                    {[1, 2, 3, 4].map((num) => (
                        <div key={num} style={styles.funfactRow}>
                            <h4>Fun Fact {num}</h4>
                            <div style={styles.row}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Number</label>
                                    <input
                                        type="text"
                                        value={data?.[`funfact_${num}_number`] || ''}
                                        onChange={(e) => handleChange(`funfact_${num}_number`, e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Symbol</label>
                                    <input
                                        type="text"
                                        value={data?.[`funfact_${num}_symbol`] || ''}
                                        onChange={(e) => handleChange(`funfact_${num}_symbol`, e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Label ({languageNames[activeTab]})</label>
                                    <input
                                        type="text"
                                        value={data?.[`funfact_${num}_label_${activeTab}`] || ''}
                                        onChange={(e) => handleChange(`funfact_${num}_label_${activeTab}`, e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Icon</label>
                                    <input
                                        type="text"
                                        value={data?.[`funfact_${num}_icon`] || ''}
                                        onChange={(e) => handleChange(`funfact_${num}_icon`, e.target.value)}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Partner/CTA Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Partner/CTA Section</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tag ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`partner_tag_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`partner_tag_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Title ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`partner_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`partner_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description ({languageNames[activeTab]})</label>
                        <textarea
                            value={data?.[`partner_description_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`partner_description_${activeTab}`, e.target.value)}
                            style={styles.textarea}
                            rows={3}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Button Text ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`partner_button_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`partner_button_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>

                {/* Blog Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Blog Section</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tag ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`blog_tag_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`blog_tag_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Title ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={data?.[`blog_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`blog_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description ({languageNames[activeTab]})</label>
                        <textarea
                            value={data?.[`blog_description_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`blog_description_${activeTab}`, e.target.value)}
                            style={styles.textarea}
                            rows={3}
                        />
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
    row: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '15px',
    },
    funfactRow: {
        borderBottom: '1px solid #eee',
        paddingBottom: '15px',
        marginBottom: '15px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '500',
        color: '#333',
        fontSize: '14px',
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
    imagesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
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
        maxHeight: '150px',
        objectFit: 'cover',
        borderRadius: '4px',
        marginBottom: '10px',
    },
    fileInput: {
        width: '100%',
        padding: '10px',
        cursor: 'pointer',
    },
};
