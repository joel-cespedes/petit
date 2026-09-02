import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const EMPTY_IMAGE = {
    image_url: '',
    alt_text: '',
    sort_order: 0,
};

export default function EditPartnerImages() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState(false);

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://localhost:3000${path}`;
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/partner-images`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                setImages(await res.json());
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => setEditing({ ...EMPTY_IMAGE });

    const handleEdit = (img) => setEditing({ ...img });

    const handleChange = (field, value) => {
        setEditing(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        if (editing && editing.image_url) {
            formData.append('old_url', editing.image_url);
        }

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                handleChange('image_url', data.url);
            } else {
                alert('Error uploading image');
            }
        } catch (err) {
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setMessage('');

        if (!editing.image_url || !editing.image_url.trim()) {
            setMessage('Error: An image is required');
            return;
        }

        try {
            const token = localStorage.getItem('admin_token');
            const isNew = !editing.id;
            const url = isNew
                ? `${API_URL}/api/admin/partner-images`
                : `${API_URL}/api/admin/partner-images/${editing.id}`;

            const payload = {
                image_url: editing.image_url,
                alt_text: (editing.alt_text || '').trim(),
            };
            if (!isNew) {
                payload.sort_order = Number(editing.sort_order) || 0;
            }

            const res = await fetch(url, {
                method: isNew ? 'POST' : 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setMessage('Saved successfully!');
                setEditing(null);
                fetchImages();
            } else {
                setMessage('Error saving');
            }
        } catch (err) {
            setMessage('Error saving');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/partner-images/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {
                setMessage('Deleted successfully!');
                fetchImages();
            } else {
                setMessage('Error deleting');
            }
        } catch (err) {
            setMessage('Error deleting');
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Partner Carousel">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    if (editing) {
        return (
            <AdminLayout title={editing.id ? 'Edit Image' : 'New Image'}>
                <button onClick={() => setEditing(null)} style={styles.backBtn}>
                    &larr; Back to list
                </button>

                {message && (
                    <div style={{
                        ...styles.message,
                        backgroundColor: message.includes('Error') ? '#fee' : '#efe',
                        color: message.includes('Error') ? '#c00' : '#0a0',
                    }}>
                        {message}
                    </div>
                )}

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Carousel Image</h3>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={styles.fileInput}
                            disabled={uploading}
                        />
                        {editing.image_url && (
                            <div style={styles.imagePreview}>
                                <img src={getImageUrl(editing.image_url)} alt="Partner" style={styles.previewImg} />
                            </div>
                        )}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Alt text (accessibility &amp; SEO)</label>
                        <input
                            type="text"
                            value={editing.alt_text || ''}
                            onChange={(e) => handleChange('alt_text', e.target.value)}
                            style={styles.input}
                            maxLength={125}
                            placeholder="e.g. GoDutch - trusted business partner of Bucare Consultancy"
                        />
                        <span style={styles.hint}>
                            Describe each logo uniquely (the partner&apos;s name). Keep it under 125
                            characters. Leave empty only for purely decorative images.
                        </span>
                    </div>
                    {editing.id != null && (
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Order (lower shows first)</label>
                            <input
                                type="number"
                                value={editing.sort_order ?? 0}
                                onChange={(e) => handleChange('sort_order', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    )}
                </div>

                {uploading && <p>Uploading image...</p>}

                <button onClick={handleSave} style={styles.submitBtn} disabled={uploading}>
                    Save Changes
                </button>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Partner Carousel">
            {message && (
                <div style={{
                    ...styles.message,
                    backgroundColor: message.includes('Error') ? '#fee' : '#efe',
                    color: message.includes('Error') ? '#c00' : '#0a0',
                }}>
                    {message}
                </div>
            )}

            <p style={styles.hint}>
                Images for the &quot;Partner Network&quot; carousel on the home page, in this order.
            </p>

            <button onClick={handleNew} style={styles.addBtn}>
                + Add New Image
            </button>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Order</th>
                        <th style={styles.th}>Preview</th>
                        <th style={styles.th}>Alt text</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map((img) => (
                        <tr key={img.id}>
                            <td style={styles.td}>{img.sort_order}</td>
                            <td style={styles.td}>
                                {img.image_url && (
                                    <img src={getImageUrl(img.image_url)} alt="Partner" style={styles.thumb} />
                                )}
                            </td>
                            <td style={styles.td}>
                                {img.alt_text
                                    ? img.alt_text
                                    : <span style={{ color: '#e67e22' }}>⚠ missing</span>}
                            </td>
                            <td style={styles.td}>
                                <button onClick={() => handleEdit(img)} style={styles.editBtn}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(img.id)} style={styles.deleteBtn}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {images.length === 0 && (
                        <tr>
                            <td style={styles.td} colSpan={4}>No images yet. Add one to start the carousel.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </AdminLayout>
    );
}

const styles = {
    message: {
        padding: '10px 15px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    hint: {
        color: '#666',
        marginBottom: '15px',
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
        maxWidth: '300px',
        maxHeight: '200px',
        objectFit: 'cover',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    thumb: {
        maxWidth: '120px',
        maxHeight: '80px',
        objectFit: 'cover',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    table: {
        width: '100%',
        backgroundColor: '#fff',
        borderCollapse: 'collapse',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        padding: '12px 15px',
        textAlign: 'left',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #dee2e6',
        fontWeight: '600',
    },
    td: {
        padding: '12px 15px',
        borderBottom: '1px solid #dee2e6',
    },
    addBtn: {
        padding: '10px 20px',
        backgroundColor: '#c19d56',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '15px',
        marginBottom: '20px',
    },
    editBtn: {
        padding: '6px 14px',
        backgroundColor: '#3498db',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '8px',
    },
    deleteBtn: {
        padding: '6px 14px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    backBtn: {
        padding: '8px 16px',
        backgroundColor: '#95a5a6',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '20px',
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
