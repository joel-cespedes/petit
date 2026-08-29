import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const LANGS = ['en', 'es', 'nl'];
const LANG_NAMES = { en: 'English', es: 'Spanish', nl: 'Dutch' };

const PAGES = [
    { key: 'home', label: 'Home', endpoint: '/api/admin/home', urlHint: '/' },
    { key: 'services', label: 'Services', endpoint: '/api/admin/services-page', urlHint: '/services' },
    { key: 'about', label: 'About', endpoint: '/api/admin/about', urlHint: '/about' },
    { key: 'contact', label: 'Contact', endpoint: '/api/admin/contact-page', urlHint: '/contact' },
    { key: 'blog', label: 'Blog', endpoint: '/api/admin/blog-page', urlHint: '/blog' },
];

const SEO_KEYS = [
    'seo_title_en', 'seo_title_es', 'seo_title_nl',
    'seo_description_en', 'seo_description_es', 'seo_description_nl',
];

export default function EditSeo() {
    const [data, setData] = useState({});
    const [siteName, setSiteName] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [activeTab, setActiveTab] = useState('en');

    useEffect(() => {
        fetchAll();
    }, []);

    const token = () => localStorage.getItem('admin_token');

    const fetchAll = async () => {
        try {
            const headers = { Authorization: `Bearer ${token()}` };
            const results = await Promise.all(
                PAGES.map((p) =>
                    fetch(`${API_URL}${p.endpoint}`, { headers })
                        .then((r) => (r.ok ? r.json() : {}))
                        .catch(() => ({}))
                )
            );
            const next = {};
            PAGES.forEach((p, i) => {
                const src = results[i] || {};
                const picked = {};
                SEO_KEYS.forEach((k) => { picked[k] = src[k] || ''; });
                next[p.key] = picked;
            });
            setData(next);

            const globalRes = await fetch(`${API_URL}/api/admin/global`, { headers })
                .then((r) => (r.ok ? r.json() : {}))
                .catch(() => ({}));
            setSiteName(globalRes.site_name || '');
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (pageKey, field, value) => {
        setData((prev) => ({ ...prev, [pageKey]: { ...prev[pageKey], [field]: value } }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const headers = {
                Authorization: `Bearer ${token()}`,
                'Content-Type': 'application/json',
            };
            // Guarda solo los campos SEO en cada tabla de pagina.
            await Promise.all(
                PAGES.map((p) =>
                    fetch(`${API_URL}${p.endpoint}`, {
                        method: 'PUT',
                        headers,
                        body: JSON.stringify(data[p.key] || {}),
                    })
                )
            );
            // Nombre de marca en global_content.
            await fetch(`${API_URL}/api/admin/global`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ site_name: siteName }),
            });
            setMessage('Saved successfully!');
        } catch (err) {
            setMessage('Error saving');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout title="SEO / Metadata">
                <p>Loading...</p>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="SEO / Metadata">
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
                Title and description that Google and browsers show for each page. If you leave a
                field empty, the site falls back to a sensible default (page title + brand).
            </p>

            {/* Marca */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Brand name</h3>
                <p style={styles.sub}>Shown in the browser tab and after the &quot;|&quot; in titles (e.g. &quot;Services | Bucare Consulting&quot;).</p>
                <input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    style={styles.input}
                    placeholder="Bucare Consulting"
                />
            </div>

            {/* Idioma */}
            <div style={styles.tabs}>
                {LANGS.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setActiveTab(lang)}
                        style={{
                            ...styles.tab,
                            backgroundColor: activeTab === lang ? '#c19d56' : '#fff',
                            color: activeTab === lang ? '#fff' : '#333',
                        }}
                    >
                        {LANG_NAMES[lang]}
                    </button>
                ))}
            </div>

            {PAGES.map((p) => {
                const titleKey = `seo_title_${activeTab}`;
                const descKey = `seo_description_${activeTab}`;
                const pd = data[p.key] || {};
                return (
                    <div style={styles.section} key={p.key}>
                        <h3 style={styles.sectionTitle}>
                            {p.label} <span style={styles.url}>{p.urlHint}</span>
                        </h3>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>SEO Title ({LANG_NAMES[activeTab]})</label>
                            <input
                                type="text"
                                value={pd[titleKey] || ''}
                                onChange={(e) => handleChange(p.key, titleKey, e.target.value)}
                                style={styles.input}
                                maxLength={70}
                                placeholder="Recommended: up to ~60 characters"
                            />
                            <span style={styles.counter}>{(pd[titleKey] || '').length}/70</span>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>SEO Description ({LANG_NAMES[activeTab]})</label>
                            <textarea
                                value={pd[descKey] || ''}
                                onChange={(e) => handleChange(p.key, descKey, e.target.value)}
                                style={styles.textarea}
                                rows={3}
                                maxLength={170}
                                placeholder="Recommended: up to ~155 characters"
                            />
                            <span style={styles.counter}>{(pd[descKey] || '').length}/170</span>
                        </div>
                    </div>
                );
            })}

            <button onClick={handleSave} style={styles.submitBtn} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </AdminLayout>
    );
}

const styles = {
    message: { padding: '10px 15px', borderRadius: '4px', marginBottom: '20px' },
    hint: { color: '#666', marginBottom: '15px' },
    sub: { color: '#888', fontSize: '13px', marginBottom: '10px' },
    section: { backgroundColor: '#fff', padding: '25px', borderRadius: '8px', marginBottom: '20px' },
    sectionTitle: { marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #eee', color: '#333' },
    url: { color: '#c19d56', fontSize: '13px', fontWeight: 'normal', marginLeft: '8px' },
    tabs: { display: 'flex', gap: '10px', marginBottom: '20px' },
    tab: { padding: '10px 20px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' },
    formGroup: { marginBottom: '18px' },
    label: { display: 'block', marginBottom: '5px', fontWeight: '500', color: '#333' },
    input: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' },
    counter: { display: 'block', textAlign: 'right', fontSize: '12px', color: '#999', marginTop: '3px' },
    submitBtn: { padding: '12px 30px', backgroundColor: '#c19d56', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
};
