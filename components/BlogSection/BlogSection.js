import React from "react";
import Link from "next/link";

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const BlogSection = ({ data, blogs = [] }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return { day: '', month: '', year: '' };
        const date = new Date(dateStr);
        return {
            day: date.getDate().toString().padStart(2, '0'),
            month: date.toLocaleString('en', { month: 'short' }),
            year: date.getFullYear()
        };
    };

    return (
        <section className="blog-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6 col-12">
                        <div className="section-title-s2">
                            <span>{data?.blog_tag || ''}</span>
                            <h2>{data?.blog_title || ''}</h2>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-12">
                        <div className="section-title-text">
                            <p>{data?.blog_description || ''}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="blog-grids clearfix">
                            {blogs.slice(0, 3).map((blog) => {
                                const date = formatDate(blog.published_at);
                                return (
                                    <div className="grid" key={blog.id}>
                                        <div className="entry-media">
                                            <img src={blog.thumbnail_url || blog.image_url || '/images/blog/img-1.jpg'} alt={blog.title} />
                                        </div>
                                        <div className="entry-date">
                                            <h4>{date.day}</h4>
                                            <span>{date.month} <br/>{date.year}</span>
                                        </div>
                                        <h3><Link onClick={ClickHandler} href={"/blog-single/[slug]"} as={`/blog-single/${blog.slug}`}>{blog.title}</Link></h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogSection;
