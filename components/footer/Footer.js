import React from 'react'
import Link from "next/link";
import Logo from '/public/images/logo.png'
import Image from 'next/image';


const ClickHandler = () => {
    window.scrollTo(10, 0);
}
const SubmitHandler = (e) => {
    e.preventDefault()
}

const Footer = (props) => {
    return (
        <footer className="site-footer">
            <div className="upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-3 col-md-6 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <Image src={Logo} alt="" />
                                </div>
                                <p>Samsa was a travelling salesman  and above it there hung a picture that he had recently cut out of an illustrated magazine and housed</p>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    <h3>Navigation</h3>
                                </div>
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/about">About us</Link></li>
                                    <li><Link onClick={ClickHandler} href="/contact">Contact us</Link></li>
                                    <li><Link onClick={ClickHandler} href="/services">Case Studies</Link></li>
                                    <li><Link onClick={ClickHandler} href="/services">Our Services</Link></li>
                                </ul>
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/contact">Provacu Policy</Link></li>
                                    <li><Link onClick={ClickHandler} href="/contact">Contact</Link></li>
                                    <li><Link onClick={ClickHandler} href="/testimonials">Testimonials</Link></li>
                                    <li><Link onClick={ClickHandler} href="/blog">News</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-12">
                            <div className="widget contact-widget service-link-widget">
                                <div className="widget-title">
                                    <h3>Contact Info</h3>
                                </div>
                                <ul>
                                    <li>Phone: ++87655285654 </li>
                                    <li>Email: jhair@demo.com</li>
                                    <li>Office Time: 10AM- 5PM</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-12">
                            <div className="widget newsletter-widget">
                                <div className="widget-title">
                                    <h3>Newsletter</h3>
                                </div>
                                <p>You will be notified when somthing new will be appear.</p>
                                <form onSubmit={SubmitHandler}>
                                    <div className="input-1">
                                        <input type="email" className="form-control" placeholder="Email Address *" required/>
                                    </div>
                                    <div className="submit clearfix">
                                        <button type="submit"><i className="ti-email"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="separator"></div>
                        <div className="col col-xs-12">
                            <p className="copyright">Copyright &copy; 2023 Jhair. All rights reserved.</p>
                            <div className="social-icons">
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-facebook"></i></Link></li>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-twitter-alt"></i></Link></li>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-linkedin"></i></Link></li>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-pinterest"></i></Link></li>
                                    <li><Link onClick={ClickHandler} href="/"><i className="ti-vimeo-alt"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;