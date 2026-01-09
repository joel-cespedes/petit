import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminLayout from '../../../components/admin/AdminLayout';

const RichTextEditor = dynamic(
    () => import('../../../components/admin/RichTextEditor'),
    { ssr: false, loading: () => <p>Loading editor...</p> }
);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function EditBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('en');
    const [uploading, setUploading] = useState(false);

    const languages = ['en', 'es', 'nl'];
    const languageNames = { en: 'English', es: 'Spanish', nl: 'Dutch' };

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        if (path.startsWith('/images')) return `http://localhost:3000${path}`;
        if (path.startsWith('/uploads')) return `http://localhost:3000${path}`;
        return path;
    };

    useEffect(() => {
        fetchBlogs();
        fetchTags();
    }, []);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/blogs`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                setBlogs(await res.json());
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

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
            console.error('Error fetching tags:', err);
        }
    };

    const handleNew = () => {
        setEditing({
            slug: '',
            image_url: '',
            thumbnail_url: '',
            published_at: new Date().toISOString().split('T')[0],
            is_published: true,
            tag_ids: [],
            title_en: '', title_es: '', title_nl: '',
            description_en: '', description_es: '', description_nl: '',
            content_en: '', content_es: '', content_nl: '',
        });
    };

    const handleEdit = (blog) => {
        setEditing({
            ...blog,
            tag_ids: blog.tag_ids || [],
            published_at: blog.published_at ? blog.published_at.split('T')[0] : ''
        });
    };

    const handleChange = (field, value) => {
        setEditing(prev => ({ ...prev, [field]: value }));
    };

    const handleTagToggle = (tagId) => {
        setEditing(prev => {
            const currentTags = prev.tag_ids || [];
            if (currentTags.includes(tagId)) {
                return { ...prev, tag_ids: currentTags.filter(id => id !== tagId) };
            } else {
                return { ...prev, tag_ids: [...currentTags, tagId] };
            }
        });
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
                const data = await res.json();
                handleChange(field, data.url);
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
        try {
            const token = localStorage.getItem('admin_token');
            const isNew = !editing.id;
            const url = isNew
                ? `${API_URL}/api/admin/blogs`
                : `${API_URL}/api/admin/blogs/${editing.id}`;

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
                fetchBlogs();
            } else {
                setMessage('Error saving');
            }
        } catch (err) {
            setMessage('Error saving');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/blogs/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {
                setMessage('Deleted successfully!');
                fetchBlogs();
            } else {
                setMessage('Error deleting');
            }
        } catch (err) {
            setMessage('Error deleting');
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Edit Blogs">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    if (editing) {
        return (
            <AdminLayout title={editing.id ? 'Edit Blog Post' : 'New Blog Post'}>
                <button onClick={() => setEditing(null)} style={styles.backBtn}>
                    ← Back to list
                </button>

                {/* Image Upload Section - Above tabs */}
                <div style={styles.imageSection}>
                    <h3 style={styles.sectionTitle}>Images</h3>
                    <div style={styles.imageRow}>
                        <div style={styles.imageGroup}>
                            <label style={styles.label}>Main Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'image_url')}
                                style={styles.fileInput}
                                disabled={uploading}
                            />
                            {editing.image_url && (
                                <div style={styles.imagePreview}>
                                    <img src={getImageUrl(editing.image_url)} alt="Preview" style={styles.previewImg} />
                                </div>
                            )}
                        </div>
                        <div style={styles.imageGroup}>
                            <label style={styles.label}>Thumbnail</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'thumbnail_url')}
                                style={styles.fileInput}
                                disabled={uploading}
                            />
                            {editing.thumbnail_url && (
                                <div style={styles.imagePreview}>
                                    <img src={getImageUrl(editing.thumbnail_url)} alt="Preview" style={styles.previewImg} />
                                </div>
                            )}
                        </div>
                    </div>
                    {uploading && <p>Uploading...</p>}
                </div>

                {/* Tabs */}
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
                                placeholder="my-blog-post"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Published Date</label>
                            <input
                                type="date"
                                value={editing.published_at || ''}
                                onChange={(e) => handleChange('published_at', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Status</label>
                            <select
                                value={editing.is_published ? 'true' : 'false'}
                                onChange={(e) => handleChange('is_published', e.target.value === 'true')}
                                style={styles.input}
                            >
                                <option value="true">Published</option>
                                <option value="false">Draft</option>
                            </select>
                        </div>
                    </div>

                    {/* Tags */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tags</label>
                        <div style={styles.tagsContainer}>
                            {tags.map(tag => (
                                <label key={tag.id} style={styles.tagLabel}>
                                    <input
                                        type="checkbox"
                                        checked={(editing.tag_ids || []).includes(tag.id)}
                                        onChange={() => handleTagToggle(tag.id)}
                                    />
                                    {tag.name_en}
                                </label>
                            ))}
                            {tags.length === 0 && <span style={{color: '#999'}}>No tags available</span>}
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
                        <label style={styles.label}>Description/Excerpt ({languageNames[activeTab]})</label>
                        <textarea
                            value={editing[`description_${activeTab}`] || ''}
                            onChange={(e) => handleChange(`description_${activeTab}`, e.target.value)}
                            style={styles.textarea}
                            rows={3}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Content ({languageNames[activeTab]})</label>
                        <RichTextEditor
                            value={editing[`content_${activeTab}`] || ''}
                            onChange={(value) => handleChange(`content_${activeTab}`, value)}
                        />
                    </div>

                    <button onClick={handleSave} style={styles.saveBtn}>
                        Save Blog Post
                    </button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit Blogs">
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
                + Add New Blog Post
            </button>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Slug</th>
                        <th style={styles.th}>Title (EN)</th>
                        <th style={styles.th}>Status</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog.id}>
                            <td style={styles.td}>{blog.id}</td>
                            <td style={styles.td}>{blog.slug}</td>
                            <td style={styles.td}>{blog.title_en}</td>
                            <td style={styles.td}>
                                <span style={{
                                    padding: '3px 8px',
                                    borderRadius: '3px',
                                    backgroundColor: blog.is_published ? '#d4edda' : '#fff3cd',
                                    color: blog.is_published ? '#155724' : '#856404',
                                }}>
                                    {blog.is_published ? 'Published' : 'Draft'}
                                </span>
                            </td>
                            <td style={styles.td}>
                                <button onClick={() => handleEdit(blog)} style={styles.editBtn}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(blog.id)} style={styles.deleteBtn}>
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
    imageSection: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    imageRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
    },
    imageGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    fileInput: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    imagePreview: {
        marginTop: '10px',
    },
    previewImg: {
        maxWidth: '200px',
        maxHeight: '150px',
        objectFit: 'cover',
        borderRadius: '4px',
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
    },
    tagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    },
    tagLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 10px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    sectionTitle: {
        marginBottom: '15px',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee',
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
