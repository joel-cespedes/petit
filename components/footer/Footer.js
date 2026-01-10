import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { useLanguage } from '../../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Footer = (props) => {
    const { language } = useLanguage();
    const [globalContent, setGlobalContent] = useState(null);

    useEffect(() => {
        const fetchGlobalContent = async () => {
            try {
                const res = await fetch(`${API_URL}/api/global?lang=${language}`);
                if (res.ok) {
                    setGlobalContent(await res.json());
                }
            } catch (err) {
                console.error('Error fetching global content:', err);
            }
        };
        fetchGlobalContent();
    }, [language]);

    return (
        <footer className="site-footer">
            <div className="upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <img
                                        src={globalContent?.logo_white || '/images/logo-2.png'}
                                        alt="Logo"
                                        style={{maxHeight: '50px', width: 'auto'}}
                                    />
                                </div>
                                <p>{globalContent?.footer_about_text || 'Samsa was a travelling salesman and above it there hung a picture that he had recently cut out of an illustrated magazine and housed'}</p>
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    <h3>{globalContent?.footer_nav_title || 'Navigation'}</h3>
                                </div>
                                <ul>
                                    <li><Link onClick={ClickHandler} href="/about">{globalContent?.nav_about || 'About us'}</Link></li>
                                    <li><Link onClick={ClickHandler} href="/services">{globalContent?.nav_services || 'Services'}</Link></li>
                                    <li><Link onClick={ClickHandler} href="/blog">{globalContent?.nav_blog || 'Blog'}</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="widget contact-widget service-link-widget">
                                <div className="widget-title">
                                    <h3>{globalContent?.footer_contact_title || 'Contact Info'}</h3>
                                </div>
                                <ul>
                                    {globalContent?.phone && <li>Phone: {globalContent.phone}</li>}
                                    {globalContent?.email && <li>Email: {globalContent.email}</li>}
                                    {globalContent?.address && <li>Address: {globalContent.address}</li>}
                                </ul>
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
                            <p className="copyright">{globalContent?.copyright_text || 'Copyright © 2024 Jhair. All rights reserved.'}</p>
                            <div className="social-icons">
                                <ul>
                                    {globalContent?.social_facebook && (
                                        <li><Link href={globalContent.social_facebook} target="_blank"><i className="ti-facebook"></i></Link></li>
                                    )}
                                    {globalContent?.social_twitter && (
                                        <li><Link href={globalContent.social_twitter} target="_blank"><i className="ti-twitter-alt"></i></Link></li>
                                    )}
                                    {globalContent?.social_linkedin && (
                                        <li><Link href={globalContent.social_linkedin} target="_blank"><i className="ti-linkedin"></i></Link></li>
                                    )}
                                    {globalContent?.social_instagram && (
                                        <li><Link href={globalContent.social_instagram} target="_blank"><i className="ti-instagram"></i></Link></li>
                                    )}
                                    {globalContent?.social_pinterest && (
                                        <li><Link href={globalContent.social_pinterest} target="_blank"><i className="ti-pinterest"></i></Link></li>
                                    )}
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
