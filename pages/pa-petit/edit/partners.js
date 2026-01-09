import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function EditPartners() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('/images')) return `http://localhost:3000${path}`;
        return path;
    };

    const handleImageUpload = async (file) => {
        if (!file) return;
        setUploading(true);
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
                setEditing(prev => ({ ...prev, logo_url: result.url }));
                setMessage('Image uploaded successfully!');
            } else {
                setMessage('Error uploading image');
            }
        } catch (err) {
            setMessage('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/partners`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setPartners(data);
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => {
        setEditing({
            name: '',
            logo_url: '',
            website_url: '',
        });
    };

    const handleEdit = (partner) => {
        setEditing({ ...partner });
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
                ? `${API_URL}/api/admin/partners`
                : `${API_URL}/api/admin/partners/${editing.id}`;

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
                fetchPartners();
            } else {
                setMessage('Error saving');
            }
        } catch (err) {
            setMessage('Error saving');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this partner?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/partners/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {
                setMessage('Deleted successfully!');
                fetchPartners();
            } else {
                setMessage('Error deleting');
            }
        } catch (err) {
            setMessage('Error deleting');
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Edit Partners">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    if (editing) {
        return (
            <AdminLayout title={editing.id ? 'Edit Partner' : 'New Partner'}>
                <button onClick={() => setEditing(null)} style={styles.backBtn}>
                    ← Back to list
                </button>

                <div style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Partner Name</label>
                        <input
                            type="text"
                            value={editing.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Partner Logo</label>
                        <div style={styles.imageUpload}>
                            {editing.logo_url && (
                                <img src={getImageUrl(editing.logo_url)} alt="Logo" style={styles.imagePreview} />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                                style={styles.fileInput}
                                disabled={uploading}
                            />
                            {uploading && <span>Uploading...</span>}
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Website URL</label>
                        <input
                            type="url"
                            value={editing.website_url || ''}
                            onChange={(e) => handleChange('website_url', e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <button onClick={handleSave} style={styles.saveBtn}>
                        Save Partner
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit Partners">
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
                + Add New Partner
            </button>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Website</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {partners.map((partner) => (
                        <tr key={partner.id}>
                            <td style={styles.td}>{partner.id}</td>
                            <td style={styles.td}>{partner.name}</td>
                            <td style={styles.td}>{partner.website_url}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleEdit(partner)} style={styles.editBtn}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(partner.id)} style={styles.deleteBtn}>
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
    imageUpload: {
        border: '2px dashed #ddd',
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
    },
    imagePreview: {
        maxWidth: '150px',
        maxHeight: '80px',
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
