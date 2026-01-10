import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/pa-petit');
            return;
        }

        fetch(`${API_URL}/api/auth/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error('Invalid token');
                return res.json();
            })
            .then((data) => {
                setUsername(data.username);
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem('admin_token');
                router.push('/pa-petit');
            });
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/pa-petit');
    };

    if (loading) {
        return (
            <div style={styles.loading}>Loading...</div>
        );
    }

    const menuItems = [
        { title: 'Home Page', href: '/pa-petit/edit/home', icon: '🏠' },
        { title: 'About Page', href: '/pa-petit/edit/about', icon: '👤' },
        { title: 'Services Page', href: '/pa-petit/edit/services-page', icon: '📋' },
        { title: 'Services (Items)', href: '/pa-petit/edit/services', icon: '⚙️' },
        { title: 'Service Detail Page', href: '/pa-petit/edit/service-single-page', icon: '📄' },
        { title: 'Blog Page', href: '/pa-petit/edit/blog-page', icon: '📰' },
        { title: 'Blogs (Items)', href: '/pa-petit/edit/blogs', icon: '✏️' },
        { title: 'Tags', href: '/pa-petit/edit/tags', icon: '🏷️' },
        { title: 'Global Content', href: '/pa-petit/edit/global', icon: '🌐' },
        { title: 'Partners', href: '/pa-petit/edit/partners', icon: '🤝' },
    ];

    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <div style={styles.container}>
                <nav style={styles.sidebar}>
                    <div style={styles.logo}>
                        <h2>Admin Panel</h2>
                    </div>
                    <ul style={styles.menu}>
                        {menuItems.map((item) => (
                            <li key={item.href} style={styles.menuItem}>
                                <Link href={item.href} style={styles.menuLink}>
                                    <span style={styles.menuIcon}>{item.icon}</span>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div style={styles.sidebarFooter}>
                        <button onClick={handleLogout} style={styles.logoutBtn}>
                            Logout
                        </button>
                    </div>
                </nav>
                <main style={styles.main}>
                    <header style={styles.header}>
                        <h1>Dashboard</h1>
                        <span>Welcome, {username}</span>
                    </header>
                    <div style={styles.content}>
                        <h2 style={styles.welcomeTitle}>Welcome to the Admin Panel</h2>
                        <p style={styles.welcomeText}>
                            Select a section from the sidebar to edit content.
                        </p>
                        <div style={styles.grid}>
                            {menuItems.map((item) => (
                                <Link key={item.href} href={item.href} style={styles.card}>
                                    <span style={styles.cardIcon}>{item.icon}</span>
                                    <span style={styles.cardTitle}>{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#2c3e50',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
    },
    logo: {
        padding: '20px',
        borderBottom: '1px solid #34495e',
    },
    menu: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
        flex: 1,
    },
    menuItem: {
        borderBottom: '1px solid #34495e',
    },
    menuLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 20px',
        color: '#ecf0f1',
        textDecoration: 'none',
        transition: 'background-color 0.2s',
    },
    menuIcon: {
        marginRight: '10px',
        fontSize: '18px',
    },
    sidebarFooter: {
        padding: '20px',
        borderTop: '1px solid #34495e',
    },
    logoutBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    main: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        padding: '20px 30px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    content: {
        padding: '30px',
    },
    welcomeTitle: {
        marginBottom: '10px',
        color: '#333',
    },
    welcomeText: {
        color: '#666',
        marginBottom: '30px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#fff',
        padding: '30px 20px',
        borderRadius: '8px',
        textAlign: 'center',
        textDecoration: 'none',
        color: '#333',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cardIcon: {
        fontSize: '40px',
        display: 'block',
        marginBottom: '10px',
    },
    cardTitle: {
        fontSize: '16px',
        fontWeight: '500',
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontSize: '18px',
    },
};
