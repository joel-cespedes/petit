import React, { Fragment, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.png'
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const AboutPage = () => {
    const { language } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [language]);

    const fetchData = async () => {
        try {
            const res = await fetch(`${API_URL}/api/about?lang=${language}`);
            if (res.ok) {
                setData(await res.json());
            }
        } catch (err) {
            console.error('Error fetching about data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Fragment>
                <Navbar hclass={'header-style-3'} Logo={Logo} />
                <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>
                <Footer />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={data?.page_title || 'About Us'} pagesub={data?.page_breadcrumb || 'About'} backgroundImage={data?.background_image} />
            <section className="team-sigle-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-12 col-12">
                            <div className="team-single-content">
                                <div className="team">
                                    {data?.profile_image && (
                                        <div className="img-holder">
                                            <img src={data.profile_image} alt={data?.name} style={{ maxWidth: '300px', borderRadius: '8px' }} />
                                        </div>
                                    )}
                                    <div className="team-single-info">
                                        <div className="info">
                                            <h3>{data?.name}</h3>
                                            <span>{data?.title}</span>
                                            <ul>
                                                {data?.phone && (
                                                    <li><i className="ti-mobile"></i><span>Phone: </span>{data.phone}</li>
                                                )}
                                                {data?.email && (
                                                    <li><i className="ti-email"></i><span>Email: </span>{data.email}</li>
                                                )}
                                                {data?.experience && (
                                                    <li><i className="ti-timer"></i><span>Experience: </span>{data.experience}</li>
                                                )}
                                                {data?.address && (
                                                    <li><i className="ti-location-pin"></i><span>Address: </span>{data.address}</li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="social">
                                            <ul>
                                                {data?.social_facebook && (
                                                    <li><Link href={data.social_facebook} target="_blank"><i className="ti-facebook"></i></Link></li>
                                                )}
                                                {data?.social_twitter && (
                                                    <li><Link href={data.social_twitter} target="_blank"><i className="ti-twitter-alt"></i></Link></li>
                                                )}
                                                {data?.social_linkedin && (
                                                    <li><Link href={data.social_linkedin} target="_blank"><i className="ti-linkedin"></i></Link></li>
                                                )}
                                                {data?.social_pinterest && (
                                                    <li><Link href={data.social_pinterest} target="_blank"><i className="ti-pinterest"></i></Link></li>
                                                )}
                                                {data?.social_instagram && (
                                                    <li><Link href={data.social_instagram} target="_blank"><i className="ti-instagram"></i></Link></li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-details">
                                    {data?.about_title && (
                                        <>
                                            <h2>{data.about_title}</h2>
                                            {data.about_content && <div dangerouslySetInnerHTML={{ __html: data.about_content }} />}
                                        </>
                                    )}

                                    {data?.experience_title && (
                                        <>
                                            <h2>{data.experience_title}</h2>
                                            {data.experience_content && <div dangerouslySetInnerHTML={{ __html: data.experience_content }} />}
                                        </>
                                    )}

                                    {data?.education_title && (
                                        <>
                                            <h2>{data.education_title}</h2>
                                            {data.education_content && <div dangerouslySetInnerHTML={{ __html: data.education_content }} />}
                                        </>
                                    )}

                                    {data?.achievements_title && (
                                        <>
                                            <h2>{data.achievements_title}</h2>
                                            {data.achievements_content && <div dangerouslySetInnerHTML={{ __html: data.achievements_content }} />}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export default AboutPage;
