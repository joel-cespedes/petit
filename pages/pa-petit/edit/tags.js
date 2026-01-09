import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function EditTags() {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/tags`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                setTags(await res.json());
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
            name_en: '',
            name_es: '',
            name_nl: '',
        });
    };

    const handleEdit = (tag) => {
        setEditing({ ...tag });
    };

    const handleChange = (field, value) => {
        setEditing(prev => ({ ...prev, [field]: value }));
    };

    // Auto-generate slug from English name
    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleNameChange = (value) => {
        setEditing(prev => ({
            ...prev,
            name_en: value,
            slug: prev.id ? prev.slug : generateSlug(value), // Only auto-generate for new tags
        }));
    };

    const handleSave = async () => {
        if (!editing.slug || !editing.name_en) {
            setMessage('Slug and English name are required');
            return;
        }

        setMessage('');
        try {
            const token = localStorage.getItem('admin_token');
            const isNew = !editing.id;
            const url = isNew
                ? `${API_URL}/api/admin/tags`
                : `${API_URL}/api/admin/tags/${editing.id}`;

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
                fetchTags();
            } else {
                const error = await res.json();
                setMessage(error.detail || 'Error saving');
            }
        } catch (err) {
            setMessage('Error saving');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure? This will remove this tag from all blogs.')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/tags/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {
                setMessage('Deleted successfully!');
                fetchTags();
            } else {
                setMessage('Error deleting');
            }
        } catch (err) {
            setMessage('Error deleting');
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Edit Tags">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    if (editing) {
        return (
            <AdminLayout title={editing.id ? 'Edit Tag' : 'New Tag'}>
                <button onClick={() => setEditing(null)} style={styles.backBtn}>
                    ← Back to list
                </button>

                {message && (
                    <div style={{
                        ...styles.message,
                        backgroundColor: message.includes('Error') || message.includes('required') ? '#fee' : '#efe',
                        color: message.includes('Error') || message.includes('required') ? '#c00' : '#0a0',
                    }}>
                        {message}
                    </div>
                )}

                <div style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Slug (URL identifier)</label>
                        <input
                            type="text"
                            value={editing.slug || ''}
                            onChange={(e) => handleChange('slug', e.target.value)}
                            style={styles.input}
                            placeholder="my-tag"
                        />
                        <small style={styles.hint}>Used in URLs. Auto-generated from English name for new tags.</small>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name (English) *</label>
                            <input
                                type="text"
                                value={editing.name_en || ''}
                                onChange={(e) => handleNameChange(e.target.value)}
                                style={styles.input}
                                placeholder="Business"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name (Spanish)</label>
                            <input
                                type="text"
                                value={editing.name_es || ''}
                                onChange={(e) => handleChange('name_es', e.target.value)}
                                style={styles.input}
                                placeholder="Negocios"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name (Dutch)</label>
                            <input
                                type="text"
                                value={editing.name_nl || ''}
                                onChange={(e) => handleChange('name_nl', e.target.value)}
                                style={styles.input}
                                placeholder="Zakelijk"
                            />
                        </div>
                    </div>

                    <button onClick={handleSave} style={styles.saveBtn}>
                        Save Tag
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit Tags">
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
                + Add New Tag
            </button>

            <p style={styles.hint}>
                Tags are used to categorize blog posts. You can assign tags to blogs in the Blogs editor.
            </p>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Slug</th>
                        <th style={styles.th}>English</th>
                        <th style={styles.th}>Spanish</th>
                        <th style={styles.th}>Dutch</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag) => (
                        <tr key={tag.id}>
                            <td style={styles.td}>{tag.id}</td>
                            <td style={styles.td}><code>{tag.slug}</code></td>
                            <td style={styles.td}>{tag.name_en}</td>
                            <td style={styles.td}>{tag.name_es}</td>
                            <td style={styles.td}>{tag.name_nl}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleEdit(tag)} style={styles.editBtn}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(tag.id)} style={styles.deleteBtn}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {tags.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{ ...styles.td, textAlign: 'center', color: '#999' }}>
                                No tags yet. Click "Add New Tag" to create one.
                            </td>
                        </tr>
                    )}
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
        marginBottom: '15px',
    },
    hint: {
        color: '#666',
        fontSize: '13px',
        marginBottom: '20px',
        display: 'block',
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
        fontWeight: '600',
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
    form: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
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
    saveBtn: {
        padding: '12px 30px',
        backgroundColor: '#c19d56',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    message: {
        padding: '10px 15px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
};
