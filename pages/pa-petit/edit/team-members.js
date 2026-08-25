import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import AdminLayout from '../../../components/admin/AdminLayout';

const RichTextEditor = dynamic(
    () => import('../../../components/admin/RichTextEditor'),
    { ssr: false, loading: () => <p>Loading editor...</p> }
);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const SECTIONS = [
    { key: 'about', label: 'About Me Section' },
    { key: 'experience', label: 'Experience Section' },
    { key: 'education', label: 'Education Section' },
    { key: 'achievements', label: 'Achievements Section' },
];

const SOCIAL_FIELDS = [
    { field: 'social_facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
    { field: 'social_twitter', label: 'Twitter URL', placeholder: 'https://twitter.com/...' },
    { field: 'social_linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/...' },
    { field: 'social_instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
    { field: 'social_pinterest', label: 'Pinterest URL', placeholder: 'https://pinterest.com/...' },
];

const EMPTY_MEMBER = {
    profile_image: '',
    name: '',
    title_en: '', title_es: '', title_nl: '',
    phone: '', email: '',
    experience_en: '', experience_es: '', experience_nl: '',
    address_en: '', address_es: '', address_nl: '',
    social_facebook: '', social_twitter: '', social_linkedin: '',
    social_pinterest: '', social_instagram: '',
    about_title_en: '', about_title_es: '', about_title_nl: '',
    about_content_en: '', about_content_es: '', about_content_nl: '',
    experience_title_en: '', experience_title_es: '', experience_title_nl: '',
    experience_content_en: '', experience_content_es: '', experience_content_nl: '',
    education_title_en: '', education_title_es: '', education_title_nl: '',
    education_content_en: '', education_content_es: '', education_content_nl: '',
    achievements_title_en: '', achievements_title_es: '', achievements_title_nl: '',
    achievements_content_en: '', achievements_content_es: '', achievements_content_nl: '',
};

export default function EditTeamMembers() {
    const [members, setMembers] = useState([]);
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
        return `http://localhost:3000${path}`;
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/team-members`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (res.ok) {
                setMembers(await res.json());
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => setEditing({ ...EMPTY_MEMBER });

    const handleEdit = (member) => setEditing({ ...member });

    const handleChange = (field, value) => {
        setEditing(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        if (editing && editing[field]) {
            formData.append('old_url', editing[field]);
        }

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
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

        if (!editing.name || !editing.name.trim()) {
            setMessage('Error: Name is required');
            return;
        }

        try {
            const token = localStorage.getItem('admin_token');
            const isNew = !editing.id;
            const url = isNew
                ? `${API_URL}/api/admin/team-members`
                : `${API_URL}/api/admin/team-members/${editing.id}`;

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
                fetchMembers();
            } else {
                setMessage('Error saving');
            }
        } catch (err) {
            setMessage('Error saving');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this profile?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${API_URL}/api/admin/team-members/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (res.ok) {
                setMessage('Deleted successfully!');
                fetchMembers();
            } else {
                setMessage('Error deleting');
            }
        } catch (err) {
            setMessage('Error deleting');
        }
    };

    if (loading) {
        return (
            <AdminLayout title="Team Profiles">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    if (editing) {
        return (
            <AdminLayout title={editing.id ? 'Edit Profile' : 'New Profile'}>
                <button onClick={() => setEditing(null)} style={styles.backBtn}>
                    ← Back to list
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
                        {editing.profile_image && (
                            <div style={styles.imagePreview}>
                                <img src={getImageUrl(editing.profile_image)} alt="Profile" style={styles.previewImg} />
                            </div>
                        )}
                    </div>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Name</label>
                            <input
                                type="text"
                                value={editing.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Title/Position ({languageNames[activeTab]})</label>
                            <input
                                type="text"
                                value={editing[`title_${activeTab}`] || ''}
                                onChange={(e) => handleChange(`title_${activeTab}`, e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Contact Information</h3>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Phone</label>
                            <input
                                type="text"
                                value={editing.phone || ''}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                                type="email"
                                value={editing.email || ''}
                                onChange={(e) => handleChange('email', e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                    <div style={styles.row}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Experience ({languageNames[activeTab]})</label>
                            <input
                                type="text"
                                value={editing[`experience_${activeTab}`] || ''}
                                onChange={(e) => handleChange(`experience_${activeTab}`, e.target.value)}
                                style={styles.input}
                                placeholder="e.g., 15 Years"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Address ({languageNames[activeTab]})</label>
                            <input
                                type="text"
                                value={editing[`address_${activeTab}`] || ''}
                                onChange={(e) => handleChange(`address_${activeTab}`, e.target.value)}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Social Links</h3>
                    <div style={styles.row}>
                        {SOCIAL_FIELDS.map(({ field, label, placeholder }) => (
                            <div style={styles.formGroup} key={field}>
                                <label style={styles.label}>{label}</label>
                                <input
                                    type="url"
                                    value={editing[field] || ''}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    style={styles.input}
                                    placeholder={placeholder}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Sections */}
                {SECTIONS.map(({ key, label }) => (
                    <div style={styles.section} key={key}>
                        <h3 style={styles.sectionTitle}>{label}</h3>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Section Title ({languageNames[activeTab]})</label>
                            <input
                                type="text"
                                value={editing[`${key}_title_${activeTab}`] || ''}
                                onChange={(e) => handleChange(`${key}_title_${activeTab}`, e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Content ({languageNames[activeTab]})</label>
                            <RichTextEditor
                                value={editing[`${key}_content_${activeTab}`] || ''}
                                onChange={(value) => handleChange(`${key}_content_${activeTab}`, value)}
                            />
                        </div>
                    </div>
                ))}

                {uploading && <p>Uploading image...</p>}

                <button onClick={handleSave} style={styles.submitBtn} disabled={uploading}>
                    Save Changes
                </button>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Team Profiles">
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
                Profiles shown on the About page, in this order.
            </p>

            <button onClick={handleNew} style={styles.addBtn}>
                + Add New Profile
            </button>

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>#</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Title (EN)</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={member.id}>
                            <td style={styles.td}>{index + 1}</td>
                            <td style={styles.td}>{member.name}</td>
                            <td style={styles.td}>{member.title_en}</td>
                            <td style={styles.td}>{member.email}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleEdit(member)} style={styles.editBtn}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(member.id)} style={styles.deleteBtn}>
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
