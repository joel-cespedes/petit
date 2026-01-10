import React from 'react';
import Link from "next/link";
import BlogSidebar from '../BlogSidebar/BlogSidebar.js'

const BlogSingle = ({ blog, pageContent, blRight, blLeft }) => {

    // Get current URL for sharing
    const getShareUrl = () => {
        if (typeof window !== 'undefined') {
            return encodeURIComponent(window.location.href);
        }
        return '';
    };

    const getShareTitle = () => {
        return encodeURIComponent(blog?.title || '');
    };

    const getShareDescription = () => {
        return encodeURIComponent(blog?.description || '');
    };

    // Format date
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!blog) {
        return (
            <section className="blog-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-9 col-12">
                            <p>Blog not found</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="blog-single-section section-padding">
            <div className="container">
                <div className="row">
                    <div className={`col col-lg-9 col-12 ${blRight || ''}`}>
                        <div className="blog-content">
                            <div className="post format-standard-image">
                                {blog.image_url && (
                                    <div className="entry-media">
                                        <img src={blog.image_url} alt={blog.title} style={{width: '100%', height: 'auto'}} />
                                    </div>
                                )}
                                <ul className="entry-meta">
                                    <li><span>{formatDate(blog.published_at)}</span></li>
                                </ul>
                                <h2>{blog.title}</h2>

                                {blog.description && (
                                    <p><strong>{blog.description}</strong></p>
                                )}

                                {blog.content && (
                                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                                )}

                                {blog.quote_text && (
                                    <blockquote>
                                        {blog.quote_text}
                                        {blog.quote_author && (
                                            <span className="quoter">- {blog.quote_author}</span>
                                        )}
                                    </blockquote>
                                )}
                            </div>

                            <div className="tag-share">
                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="tag">
                                        {pageContent?.tags_label || 'Tags'}: &nbsp;
                                        <ul>
                                            {blog.tags.map((tag, index) => (
                                                <li key={index}><Link href={`/blog?tag=${tag.slug}`}>{tag.name}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="share">
                                    {pageContent?.share_label || 'Share'}: &nbsp;
                                    <ul>
                                        <li>
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${getShareUrl()}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on Facebook"
                                            >
                                                <i className="ti-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`https://twitter.com/intent/tweet?url=${getShareUrl()}&text=${getShareTitle()}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on Twitter"
                                            >
                                                <i className="ti-twitter-alt"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${getShareUrl()}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on LinkedIn"
                                            >
                                                <i className="ti-linkedin"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`https://api.whatsapp.com/send?text=${getShareTitle()}%20${getShareUrl()}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Share on WhatsApp"
                                            >
                                                <i className="ti-mobile"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

           

                            <div className="more-posts">
                                <div className="previous-post">
                                    <Link href="/blog">
                                        <span className="post-control-link"><i className="ti-arrow-circle-left"> </i>Back to Blog</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                    <BlogSidebar blLeft={blLeft} currentBlogSlug={blog.slug} currentBlogTags={blog.tags || []} />
                </div>
            </div>
        </section>
    )
}

export default BlogSingle;
