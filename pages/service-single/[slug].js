import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '/public/images/logo-2.png';
import { useLanguage } from '../../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

const ServiceSinglePage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { language } = useLanguage();

    const [service, setService] = useState(null);
    const [allServices, setAllServices] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const [serviceRes, allServicesRes, pageRes] = await Promise.all([
                    fetch(`${API_URL}/api/services/${slug}?lang=${language}`),
                    fetch(`${API_URL}/api/services?lang=${language}`),
                    fetch(`${API_URL}/api/service-single-page?lang=${language}`)
                ]);

                if (serviceRes.ok) {
                    setService(await serviceRes.json());
                }
                if (allServicesRes.ok) {
                    setAllServices(await allServicesRes.json());
                }
                if (pageRes.ok) {
                    setPageData(await pageRes.json());
                }
            } catch (err) {
                console.error('Error fetching service:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, language]);

    if (loading) {
        return (
            <Fragment>
                <Navbar hclass={'header-style-3'} Logo={Logo} />
                <PageTitle pageTitle="Loading..." pagesub="Service" />
                <section className="service-single-section section-padding">
                    <div className="container">
                        <p>Loading...</p>
                    </div>
                </section>
                <Footer />
            </Fragment>
        );
    }

    if (!service) {
        return (
            <Fragment>
                <Navbar hclass={'header-style-3'} Logo={Logo} />
                <PageTitle pageTitle="Service Not Found" pagesub="Service" />
                <section className="service-single-section section-padding">
                    <div className="container">
                        <p>Service not found.</p>
                        <Link href="/services">Back to Services</Link>
                    </div>
                </section>
                <Footer />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={service.title} pagesub={pageData?.page_breadcrumb || 'Service'} />

            <section className="service-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-9 order-lg-2 order-1 col-12">
                            <div className="service-single-content">
                                {/* Section 1 */}
                                {(service.section_1_title || service.section_1_content) && (
                                    <>
                                        {service.section_1_title && <h2>{service.section_1_title}</h2>}
                                        {service.section_1_content && (
                                            <div dangerouslySetInnerHTML={{ __html: service.section_1_content }} />
                                        )}
                                    </>
                                )}

                                {/* Section 2 */}
                                {(service.section_2_title || service.section_2_content) && (
                                    <>
                                        {service.section_2_title && <h3>{service.section_2_title}</h3>}
                                        {service.section_2_content && (
                                            <div dangerouslySetInnerHTML={{ __html: service.section_2_content }} />
                                        )}
                                    </>
                                )}

                                {/* Section 3 */}
                                {(service.section_3_title || service.section_3_content) && (
                                    <>
                                        {service.section_3_title && <h3>{service.section_3_title}</h3>}
                                        {service.section_3_content && (
                                            <div dangerouslySetInnerHTML={{ __html: service.section_3_content }} />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col col-lg-3 order-lg-1 order-2 col-12">
                            <div className="service-sidebar">
                                <div className="widget service-list-widget">
                                    <ul>
                                        <li><Link href="/services">{pageData?.sidebar_all_services || 'All Services'}</Link></li>
                                        {allServices.map((svc) => (
                                            <li key={svc.id} className={svc.slug === slug ? 'current' : ''}>
                                                <Link onClick={ClickHandler} href={`/service-single/${svc.slug}`}>
                                                    {svc.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {pageData?.sidebar_features_title && (
                                    <div className="widget service-features-widget">
                                        <h3>{pageData.sidebar_features_title}</h3>
                                        <ol>
                                            {pageData.sidebar_feature_1 && <li>{pageData.sidebar_feature_1}</li>}
                                            {pageData.sidebar_feature_2 && <li>{pageData.sidebar_feature_2}</li>}
                                            {pageData.sidebar_feature_3 && <li>{pageData.sidebar_feature_3}</li>}
                                            {pageData.sidebar_feature_4 && <li>{pageData.sidebar_feature_4}</li>}
                                        </ol>
                                    </div>
                                )}
                                {pageData?.sidebar_help_title && (
                                    <div className="widget contact-widget">
                                        <div>
                                            <h4>{pageData.sidebar_help_title}</h4>
                                            {pageData.sidebar_help_text && <p>{pageData.sidebar_help_text}</p>}
                                            {pageData.sidebar_help_phone && <p>Phone: {pageData.sidebar_help_phone}</p>}
                                            <Link onClick={ClickHandler} href='/contact'>
                                                {pageData.sidebar_contact_link || 'Contact Us'}
                                            </Link>
                                        </div>
                                    </div>
                                )}
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

export default ServiceSinglePage;
