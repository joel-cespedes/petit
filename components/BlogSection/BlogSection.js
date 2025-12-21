import React from "react";
import blogs from '../../api/blogs'
import Link from "next/link";
import Image from "next/image";


const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const BlogSection = () => {
    return (
        <section className="blog-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6 col-12">
                        <div className="section-title-s2">
                            <span>News</span>
                            <h2>Latest News & <br/>Events</h2>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-12">
                        <div className="section-title-text">
                            <p>Showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer gregor then turned to look arround the world </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="blog-grids clearfix">
                            {blogs.map((blog, bl) => (
                                <div className="grid" key={bl}>
                                    <div className="entry-media">
                                        <Image src={blog.screens} alt="" />
                                    </div>
                                    <div className="entry-date">
                                        <h4>{blog.create_day}</h4>
                                        <span>{blog.create_month} <br/>{blog.create_year}</span>
                                    </div>
                                    <h3><Link onClick={ClickHandler} href={"/blog-single/[slug]"} as={`/blog-single/${blog.slug}`}>{blog.title}</Link></h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogSection;