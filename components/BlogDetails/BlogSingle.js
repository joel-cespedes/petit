import React from 'react';
import Link from "next/link";
import blog3 from '/public/images/blog-details/comments-author/img-1.jpg'
import blog4 from '/public/images/blog-details/comments-author/img-2.jpg'
import blog5 from '/public/images/blog-details/comments-author/img-3.jpg'
import blog6 from '/public/images/blog-details/author.jpg'
import blogs from '../../api/blogs';
import { useRouter } from 'next/router'
import BlogSidebar from '../BlogSidebar/BlogSidebar.js'
import Image from 'next/image.js';

const BlogSingle = (props) => {

    const router = useRouter()

    const BlogDetails = blogs.find(item => item.slug === router.query.slug)

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <section className="blog-single-section section-padding">
            <div className="container">
                <div className="row">
                    <div className={`col col-lg-9 col-12 ${props.blRight}`}>
                        <div className="blog-content">
                            <div className="post format-standard-image">
                                <div className="entry-media">
                                    <Image src={BlogDetails?.blogSingleImg} alt="" />
                                </div>
                                <ul className="entry-meta">
                                    <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">{BlogDetails?.author}</Link></li>
                                    <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">{BlogDetails?.create_at}</Link></li>
                                    <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">{BlogDetails?.comment} Comments</Link></li>
                                </ul>
                                <h2>{BlogDetails?.title}</h2>
                                <p>Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her</p>
                                <p>Pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out th</p>
                                <blockquote>
                                    A collection of textile samples lay spread out on the table Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur
                                    <span className="quoter">- Jhone dow</span>
                                </blockquote>
                                <h3>Whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather</h3>
                                <p>Transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.</p>
                            </div>

                            <div className="tag-share">
                                <div className="tag">
                                    Tags: &nbsp;
                                    <ul>
                                        <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">Business</Link></li>
                                        <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">Consutling</Link></li>
                                        <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">Maket research</Link></li>
                                        <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">Marketing</Link></li>
                                    </ul>
                                </div>
                                <div className="share">
                                    Share: &nbsp;
                                    <ul>
                                        <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><i className="ti-facebook"></i></Link></li>
                                        <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><i className="ti-twitter-alt"></i></Link></li>
                                        <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><i className="ti-linkedin"></i></Link></li>
                                        <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><i className="ti-instagram"></i></Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="author-box">
                                <div className="author-avatar">
                                    <Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning" target="_blank"><Image src={blog6} alt="" /></Link>
                                </div>
                                <div className="author-content">
                                    <Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning" className="author-name">Author: Jenny Watson</Link>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
                                    <div className="socials">
                                        <ul className="social-link">
                                            <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><i className="ti-facebook"></i></Link></li>
                                            <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><i className="ti-twitter-alt"></i></Link></li>
                                            <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><i className="ti-linkedin"></i></Link></li>
                                            <li><Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><i className="ti-instagram"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="more-posts">
                                <div className="previous-post">
                                    <Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">
                                        <span className="post-control-link"><i className="ti-arrow-circle-left"> </i>Previous post</span>
                                    </Link>
                                </div>
                                <div className="next-post">
                                    <Link href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">
                                        <span className="post-control-link">Next post <i className="ti-arrow-circle-right"></i></span>
                                    </Link>
                                </div>
                            </div>

                            <div className="comments-area">
                                <div className="comments-section">
                                    <h3 className="comments-title">Comments</h3>
                                    <ol className="comments">
                                        <li className="comment even thread-even depth-1" id="comment-1">
                                            <div id="div-comment-1">
                                                <div className="comment-theme">
                                                    <div className="comment-image"><Image src={blog3} alt="" /></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <h4>John Abraham <span className="comments-date">January 12,2022
                                                                At 9.00am</span></h4>
                                                        </div>
                                                        <div className="comment-area">
                                                            <p>I will give you a complete account of the system, and
                                                                expound the actual teachings of the great explorer of
                                                                the truth, </p>
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><span>Reply</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="children">
                                                <li className="comment">
                                                    <div>
                                                        <div className="comment-theme">
                                                            <div className="comment-image"><Image src={blog4} alt="" /></div>
                                                        </div>
                                                        <div className="comment-main-area">
                                                            <div className="comment-wrapper">
                                                                <div className="comments-meta">
                                                                    <h4>Lily Watson <span className="comments-date">January
                                                                        12,2022 At 9.00am</span></h4>
                                                                </div>
                                                                <div className="comment-area">
                                                                    <p>I will give you a complete account of the system,
                                                                        and expound the actual teachings of the great
                                                                        explorer of the truth, </p>
                                                                    <div className="comments-reply">
                                                                        <Link className="comment-reply-link" href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><span>Reply</span></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul>
                                                        <li className="comment">
                                                            <div>
                                                                <div className="comment-theme">
                                                                    <div className="comment-image"><Image src={blog5} alt="" /></div>
                                                                </div>
                                                                <div className="comment-main-area">
                                                                    <div className="comment-wrapper">
                                                                        <div className="comments-meta">
                                                                            <h4>John Abraham <span className="comments-date">January
                                                                                12,2022 At 9.00am</span></h4>
                                                                        </div>
                                                                        <div className="comment-area">
                                                                            <p>I will give you a complete account of the
                                                                                system, and expound the actual teachings
                                                                                of the great explorer of the truth, </p>
                                                                            <div className="comments-reply">
                                                                                <Link className="comment-reply-link" href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><span>Reply</span></Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="comment">
                                            <div>
                                                <div className="comment-theme">
                                                    <div className="comment-image"><Image src={blog3} alt="" /></div>
                                                </div>
                                                <div className="comment-main-area">
                                                    <div className="comment-wrapper">
                                                        <div className="comments-meta">
                                                            <h4>John Abraham <span className="comments-date">January 12,2022
                                                                At 9.00am</span></h4>
                                                        </div>
                                                        <div className="comment-area">
                                                            <p>I will give you a complete account of the system, and
                                                                expound the actual teachings of the great explorer of
                                                                the truth, </p>
                                                            <div className="comments-reply">
                                                                <Link className="comment-reply-link" href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning"><span>Reply</span></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                                <div className="comment-respond">
                                    <h3 className="comment-reply-title">Post Comments</h3>
                                    <form onSubmit={submitHandler} id="commentform" className="comment-form">
                                        <div className="form-textarea">
                                            <textarea id="comment" placeholder="Write Your Comments..."></textarea>
                                        </div>
                                        <div className="form-inputs">
                                            <input placeholder="Website" type="url" />
                                            <input placeholder="Name" type="text" />
                                            <input placeholder="Email" type="email" />
                                        </div>
                                        <div className="form-submit">
                                            <input id="submit" value="Post Comment" type="submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BlogSidebar blLeft={props.blLeft} />
                </div>
            </div>
        </section>
    )

}

export default BlogSingle;
