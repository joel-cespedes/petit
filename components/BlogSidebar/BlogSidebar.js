import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useLanguage } from '../../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const BlogSidebar = ({ blLeft, currentBlogSlug, currentBlogTags = [] }) => {
    const router = useRouter();
    const { language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [tags, setTags] = useState([]);
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        fetchTags();
        if (currentBlogTags && currentBlogTags.length > 0) {
            fetchRelatedPosts();
        }
    }, [language, currentBlogTags]);

    const fetchTags = async () => {
        try {
            const res = await fetch(`${API_URL}/api/tags?lang=${language}`);
            if (res.ok) {
                const data = await res.json();
                setTags(data);
            }
        } catch (err) {
            console.error('Error fetching tags:', err);
        }
    };

    const fetchRelatedPosts = async () => {
        try {
            const res = await fetch(`${API_URL}/api/blogs?lang=${language}`);
            if (res.ok) {
                const allBlogs = await res.json();
                // Filter blogs that share at least one tag with current blog
                const currentTagIds = currentBlogTags.map(t => t.id);

                // For now, just show other blogs (we'd need backend support for proper tag filtering)
                // Filter out current blog and take first 3
                const related = allBlogs
                    .filter(blog => blog.slug !== currentBlogSlug)
                    .slice(0, 3);
                setRelatedPosts(related);
            }
        } catch (err) {
            console.error('Error fetching related posts:', err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleClick = () => {
        window.scrollTo(10, 0);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className={`col col-lg-3 col-12 ${blLeft || ''}`}>
            <div className="blog-sidebar">
                {/* Search Widget */}
                <div className="widget search-widget">
                    <h3>Search</h3>
                    <form onSubmit={handleSearch}>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit"><i className="ti-search"></i></button>
                        </div>
                    </form>
                </div>

                {/* Related Posts Widget */}
                {relatedPosts.length > 0 && (
                    <div className="widget recent-post-widget">
                        <h3>Related Posts</h3>
                        <div className="posts">
                            {relatedPosts.map((blog) => (
                                <div className="post" key={blog.id}>
                                    {blog.thumbnail_url && (
                                        <div className="img-holder">
                                            <img
                                                src={blog.thumbnail_url}
                                                alt={blog.title}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    )}
                                    <div className="details">
                                        <h4>
                                            <Link
                                                onClick={handleClick}
                                                href={`/blog-single/${blog.slug}`}
                                            >
                                                {blog.title}
                                            </Link>
                                        </h4>
                                        <span className="date">{formatDate(blog.published_at)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tags Widget */}
                {tags.length > 0 && (
                    <div className="widget tag-widget">
                        <h3>Tags</h3>
                        <ul>
                            {tags.map((tag) => (
                                <li key={tag.id}>
                                    <Link
                                        onClick={handleClick}
                                        href={`/blog?tag=${tag.slug}`}
                                    >
                                        {tag.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogSidebar;
