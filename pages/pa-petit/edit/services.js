import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminLayout from '../../../components/admin/AdminLayout';

const RichTextEditor = dynamic(
    () => import('../../../components/admin/RichTextEditor'),
    { ssr: false, loading: () => <p>Loading editor...</p> }
);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function EditServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('en');

    const languages = ['en', 'es', 'nl'];
    const languageNames = { en: 'English', es: 'Spanish', nl: 'Dutch' };

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/services`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => {
        setEditing({
            slug: '',
            icon: '',
            title_en: '', title_es: '', title_nl: '',
            description_en: '', description_es: '', description_nl: '',
            section_1_title_en: '', section_1_title_es: '', section_1_title_nl: '',
            section_1_content_en: '', section_1_content_es: '', section_1_content_nl: '',
            section_2_title_en: '', section_2_title_es: '', section_2_title_nl: '',
            section_2_content_en: '', section_2_content_es: '', section_2_content_nl: '',
            section_3_title_en: '', section_3_title_es: '', section_3_title_nl: '',
            section_3_content_en: '', section_3_content_es: '', section_3_content_nl: '',
        });
    };

    const handleEdit = (service) => {
        setEditing({ ...service });
    };

    const handleChange = (field, value) => {
        setEditing(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setMessage('');
        try {
            const token = localStorage.getItem('admin_token');
            const isNew = !editing.id;
            const url = isNew
                ? `${API_URL}/api/admin/services`
                : `${API_URL}/api/admin/services/${editing.id}`;

            const res = await fetch(url, {
                method: isNew ? 'POST' : 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editing),
            });

            if (res.ok) {
                setMessage('Saved successfully!');
                setEditing(null);
                fetchServices();
            } else {
                setMessage('Error saving');
            }
        } catch (err) {
            setMessage('Error saving');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/services/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {
                setMessage('Deleted successfully!');
                fetchServices();
            } else {
                setMessage('Error deleting');
            }
        } catch (err) {
            setMessage('Error deleting');
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Edit Services">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    if (editing) {
        return (
            <AdminLayout title={editing.id ? 'Edit Service' : 'New Service'}>
                <button onClick={() => setEditing(null)} style={styles.backBtn}>
                    ← Back to list
                </button>

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

                <div style={styles.form}>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Slug (URL)</label>
                            <input
                                type="text"
                                value={editing.slug || ''}
                                onChange={(e) => handleChange('slug', e.target.value)}
                                style={styles.input}
                                placeholder="my-service-name"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Icon (class name)</label>
                            <input
                                type="text"
                                value={editing.icon || ''}
                                onChange={(e) => handleChange('icon', e.target.value)}
                                style={styles.input}
                                placeholder="flaticon-consultant"
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Title ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={editing[`title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description ({languageNames[activeTab]})</label>
                        <RichTextEditor
                            value={editing[`description_${activeTab}`] || ''}
                            onChange={(value) => handleChange(`description_${activeTab}`, value)}
                        />
                    </div>

                    <h3 style={styles.sectionTitle}>Section 1</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section 1 Title ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={editing[`section_1_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`section_1_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section 1 Content ({languageNames[activeTab]})</label>
                        <RichTextEditor
                            value={editing[`section_1_content_${activeTab}`] || ''}
                            onChange={(value) => handleChange(`section_1_content_${activeTab}`, value)}
                        />
                    </div>

                    <h3 style={styles.sectionTitle}>Section 2</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section 2 Title ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={editing[`section_2_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`section_2_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section 2 Content ({languageNames[activeTab]})</label>
                        <RichTextEditor
                            value={editing[`section_2_content_${activeTab}`] || ''}
                            onChange={(value) => handleChange(`section_2_content_${activeTab}`, value)}
                        />
                    </div>

                    <h3 style={styles.sectionTitle}>Section 3</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section 3 Title ({languageNames[activeTab]})</label>
                        <input
                            type="text"
                            value={editing[`section_3_title_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`section_3_title_${activeTab}`, e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Section 3 Content ({languageNames[activeTab]})</label>
                        <RichTextEditor
                            value={editing[`section_3_content_${activeTab}`] || ''}
                            onChange={(value) => handleChange(`section_3_content_${activeTab}`, value)}
                        />
                    </div>

                    <button onClick={handleSave} style={styles.saveBtn}>
                        Save Service
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit Services">
            {message && (
                <div style={{
                    ...styles.message,
                    backgroundColor: message.includes('Error') ? '#fee' : '#efe',
                    color: message.includes('Error') ? '#c00' : '#0a0',
                }}>
                    {message}
                </div>
            )}

            <button onClick={handleNew} style={styles.addBtn}>
                + Add New Service
            </button>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Slug</th>
                        <th style={styles.th}>Title (EN)</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td style={styles.td}>{service.id}</td>
                            <td style={styles.td}>{service.slug}</td>
                            <td style={styles.td}>{service.title_en}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleEdit(service)} style={styles.editBtn}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(service.id)} style={styles.deleteBtn}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}

const styles = {
    addBtn: {
        padding: '10px 20px',
        backgroundColor: '#27ae60',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        padding: '15px',
        textAlign: 'left',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
    },
    td: {
        padding: '15px',
        borderBottom: '1px solid #eee',
    },
    editBtn: {
        padding: '5px 15px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    deleteBtn: {
        padding: '5px 15px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    backBtn: {
        padding: '10px 20px',
        backgroundColor: '#95a5a6',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
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
    form: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
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
        fontFamily: 'monospace',
    },
    sectionTitle: {
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
        marginTop: '30px',
        marginBottom: '20px',
        color: '#333',
    },
    saveBtn: {
        padding: '12px 30px',
        backgroundColor: '#c19d56',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
    },
    message: {
        padding: '10px 15px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
};
