import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function EditServiceSinglePage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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
            const res = await fetch(`${API_URL}/api/admin/service-single-page`, {
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
            const res = await fetch(`${API_URL}/api/admin/service-single-page`, {
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
            <AdminLayout title="Edit Service Single Page">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    const translatableFields = [
        { name: 'page_breadcrumb', label: 'Page Breadcrumb', type: 'text' },
        { name: 'sidebar_all_services', label: 'Sidebar: All Services Link Text', type: 'text' },
        { name: 'sidebar_features_title', label: 'Sidebar: Features Title', type: 'text' },
        { name: 'sidebar_feature_1', label: 'Sidebar: Feature 1', type: 'text' },
        { name: 'sidebar_feature_2', label: 'Sidebar: Feature 2', type: 'text' },
        { name: 'sidebar_feature_3', label: 'Sidebar: Feature 3', type: 'text' },
        { name: 'sidebar_feature_4', label: 'Sidebar: Feature 4', type: 'text' },
        { name: 'sidebar_help_title', label: 'Sidebar: Help Title', type: 'text' },
        { name: 'sidebar_help_text', label: 'Sidebar: Help Text', type: 'textarea' },
        { name: 'sidebar_contact_link', label: 'Sidebar: Contact Link Text', type: 'text' },
    ];

    return (
        <AdminLayout title="Edit Service Single Page">
            <p style={styles.description}>
                This page configures the sidebar and static text shown on individual service detail pages.
            </p>

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
                <div style={styles.form}>
                    {translatableFields.map((field) => {
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

                    <h3 style={styles.sectionTitle}>Non-translatable fields</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Phone Number</label>
                        <input
                            type="text"
                            value={data?.sidebar_help_phone || ''}
                            onChange={(e) => handleChange('sidebar_help_phone', e.target.value)}
                            style={styles.input}
                            placeholder="+1234567890"
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
    description: {
        color: '#666',
        marginBottom: '20px',
    },
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
    form: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
    },
    formGroup: {
        marginBottom: '20px',
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
    sectionTitle: {
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginTop: '30px',
        marginBottom: '20px',
        color: '#333',
    },
    submitBtn: {
        padding: '12px 30px',
        backgroundColor: '#c19d56',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
    },
};
