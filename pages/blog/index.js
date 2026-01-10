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
    const { search, tag, page: pageQuery } = router.query;
    const { language } = useLanguage();
    const [blogs, setBlogs] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentTag, setCurrentTag] = useState(null);

    const currentPage = parseInt(pageQuery) || 1;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let blogsUrl = `${API_URL}/api/blogs?lang=${language}&page=${currentPage}&per_page=6`;
                if (tag) {
                    blogsUrl += `&tag=${encodeURIComponent(tag)}`;
                }

                const [blogsRes, pageRes] = await Promise.all([
                    fetch(blogsUrl),
                    fetch(`${API_URL}/api/blog-page?lang=${language}`)
                ]);

                if (blogsRes.ok) {
                    const data = await blogsRes.json();
                    setBlogs(data.blogs);
                    setPagination(data.pagination);
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
    }, [language, tag, currentPage]);

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

    // Filter by search (client-side)
    const filteredBlogs = search
        ? blogs.filter(blog =>
            blog.title?.toLowerCase().includes(search.toLowerCase()) ||
            blog.description?.toLowerCase().includes(search.toLowerCase())
        )
        : blogs;

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

    const goToPage = (page) => {
        const query = { page };
        if (tag) query.tag = tag;
        if (search) query.search = search;
        router.push({ pathname: '/blog', query });
        window.scrollTo(0, 0);
    };

    const renderPagination = () => {
        if (!pagination || pagination.total_pages <= 1) return null;

        const pages = [];
        const { page, total_pages } = pagination;

        // Previous button
        pages.push(
            <li key="prev" className={page === 1 ? 'disabled' : ''}>
                <button
                    onClick={() => page > 1 && goToPage(page - 1)}
                    disabled={page === 1}
                >
                    <i className="ti-angle-left"></i>
                </button>
            </li>
        );

        // Page numbers
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(total_pages, page + 2);

        if (startPage > 1) {
            pages.push(
                <li key={1}>
                    <button onClick={() => goToPage(1)}>1</button>
                </li>
            );
            if (startPage > 2) {
                pages.push(<li key="dots1" className="dots"><span>...</span></li>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={i === page ? 'active' : ''}>
                    <button onClick={() => goToPage(i)}>{i}</button>
                </li>
            );
        }

        if (endPage < total_pages) {
            if (endPage < total_pages - 1) {
                pages.push(<li key="dots2" className="dots"><span>...</span></li>);
            }
            pages.push(
                <li key={total_pages}>
                    <button onClick={() => goToPage(total_pages)}>{total_pages}</button>
                </li>
            );
        }

        // Next button
        pages.push(
            <li key="next" className={page === total_pages ? 'disabled' : ''}>
                <button
                    onClick={() => page < total_pages && goToPage(page + 1)}
                    disabled={page === total_pages}
                >
                    <i className="ti-angle-right"></i>
                </button>
            </li>
        );

        return (
            <div className="pagination-wrapper">
                <ul className="pg-pagination">
                    {pages}
                </ul>
            </div>
        );
    };

    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle
                pageTitle={getPageTitle()}
                pagesub={pageData?.page_breadcrumb || 'Blog'}
                backgroundImage={pageData?.background_image}
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
                                {pagination?.total || 0} {(pagination?.total || 0) === 1 ? 'post' : 'posts'} found
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
                            {renderPagination()}
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
