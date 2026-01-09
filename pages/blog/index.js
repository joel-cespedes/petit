import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageTitle from '../../components/pagetitle/PageTitle'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar'
import Logo from '/public/images/logo-2.png'
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const BlogPage = () => {
    const router = useRouter();
    const { search, tag } = router.query;
    const { language } = useLanguage();
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTag, setCurrentTag] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Build URL with tag filter if present
                let blogsUrl = `${API_URL}/api/blogs?lang=${language}`;
                if (tag) {
                    blogsUrl += `&tag=${encodeURIComponent(tag)}`;
                }

                const [blogsRes, pageRes] = await Promise.all([
                    fetch(blogsUrl),
                    fetch(`${API_URL}/api/blog-page?lang=${language}`)
                ]);

                if (blogsRes.ok) {
                    const blogsData = await blogsRes.json();
                    setBlogs(blogsData);
                }
                if (pageRes.ok) {
                    setPageData(await pageRes.json());
                }
            } catch (err) {
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language, tag]);

    // Fetch current tag info if filtering by tag
    useEffect(() => {
        if (tag) {
            fetchTagInfo();
        } else {
            setCurrentTag(null);
        }
    }, [tag, language]);

    const fetchTagInfo = async () => {
        try {
            const res = await fetch(`${API_URL}/api/tags?lang=${language}`);
            if (res.ok) {
                const tags = await res.json();
                const foundTag = tags.find(t => t.slug === tag);
                setCurrentTag(foundTag);
            }
        } catch (err) {
            console.error('Error fetching tag:', err);
        }
    };

    // Filter blogs based on search (tag filtering is done by backend)
    useEffect(() => {
        let result = [...blogs];

        // Filter by search query (client-side)
        if (search) {
            const searchLower = search.toLowerCase();
            result = result.filter(blog =>
                blog.title?.toLowerCase().includes(searchLower) ||
                blog.description?.toLowerCase().includes(searchLower)
            );
        }

        setFilteredBlogs(result);
    }, [blogs, search]);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString(language === 'es' ? 'es-ES' : language === 'nl' ? 'nl-NL' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const clearFilters = () => {
        router.push('/blog');
    };

    const getPageTitle = () => {
        if (search) return `Search: "${search}"`;
        if (currentTag) return `Tag: ${currentTag.name}`;
        return pageData?.page_title || 'Blog';
    };

    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle
                pageTitle={getPageTitle()}
                pagesub={pageData?.page_breadcrumb || 'Blog'}
            />
            <section className="blog-pg-section section-padding">
                <div className="container">
                    {/* Show active filters */}
                    {(search || tag) && (
                        <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                            <span>
                                {search && <strong>Searching for: "{search}"</strong>}
                                {tag && currentTag && <strong>Filtering by tag: {currentTag.name}</strong>}
                            </span>
                            <button
                                onClick={clearFilters}
                                style={{
                                    marginLeft: '15px',
                                    padding: '5px 15px',
                                    backgroundColor: '#c19d56',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Clear Filters
                            </button>
                            <span style={{ marginLeft: '15px', color: '#666' }}>
                                {filteredBlogs.length} {filteredBlogs.length === 1 ? 'post' : 'posts'} found
                            </span>
                        </div>
                    )}

                    <div className="row">
                        <div className="col col-lg-12 col-12">
                            <div className="blog-content">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : filteredBlogs.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '50px' }}>
                                        <p>No blog posts found.</p>
                                        {(search || tag) && (
                                            <button
                                                onClick={clearFilters}
                                                style={{
                                                    marginTop: '15px',
                                                    padding: '10px 20px',
                                                    backgroundColor: '#c19d56',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                View All Posts
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    filteredBlogs.map((blog) => (
                                        <div className="post format-standard-image" key={blog.id}>
                                            {blog.image_url && (
                                                <div className="entry-media">
                                                    <img src={blog.image_url} alt={blog.title} />
                                                </div>
                                            )}
                                            <ul className="entry-meta">
                                                <li>
                                                    <Link onClick={ClickHandler} href={`/blog-single/${blog.slug}`}>
                                                        {blog.author_name || 'Admin'}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link onClick={ClickHandler} href={`/blog-single/${blog.slug}`}>
                                                        {formatDate(blog.published_at)}
                                                    </Link>
                                                </li>
                                            </ul>
                                            <h3>
                                                <Link onClick={ClickHandler} href={`/blog-single/${blog.slug}`}>
                                                    {blog.title}
                                                </Link>
                                            </h3>
                                            {blog.description && <p>{blog.description}</p>}
                                            <Link onClick={ClickHandler} href={`/blog-single/${blog.slug}`} className="more">
                                                {pageData?.read_more || 'Read More'}
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default BlogPage;
