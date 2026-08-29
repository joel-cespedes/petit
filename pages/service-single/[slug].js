import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import { useLanguage } from '../../context/LanguageContext';
import { safeFetch, getGlobalContent, SITE_URL } from '../../utils/serverData';

const LOCALES = ['en', 'es', 'nl'];

const ClickHandler = () => {
    window.scrollTo(10, 0);
};

// Construye la URL absoluta de una pagina de servicio para un locale/slug dados.
const serviceUrl = (locale, slug) => {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    return `${SITE_URL}${prefix}/service-single/${slug}`;
};

const ServiceSinglePage = ({ service, allServices, pageData, locale }) => {
    const { setServiceSlugs } = useLanguage();

    // Expone los slugs por idioma al conmutador de idioma (para saltar al slug correcto).
    useEffect(() => {
        setServiceSlugs(service?.slugs || null);
        return () => setServiceSlugs(null);
    }, [service, setServiceSlugs]);

    const slugs = service?.slugs || {};
    const canonicalUrl = serviceUrl(locale, service.slug);

    return (
        <Fragment>
            <Head>
                <title>{service.title}</title>
                <link rel="canonical" href={canonicalUrl} />
                {LOCALES.map((lng) =>
                    slugs[lng] ? (
                        <link
                            key={lng}
                            rel="alternate"
                            hrefLang={lng}
                            href={serviceUrl(lng, slugs[lng])}
                        />
                    ) : null
                )}
                {slugs.en && (
                    <link rel="alternate" hrefLang="x-default" href={serviceUrl('en', slugs.en)} />
                )}
            </Head>

            <Navbar hclass={'header-style-3'} />
            <PageTitle pageTitle={service.title} pagesub={pageData?.page_breadcrumb || 'Service'} backgroundImage={service.background_image || pageData?.background_image} />

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
                                            <li key={svc.id} className={svc.slug === service.slug ? 'current' : ''}>
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
                                            <a href={pageData.sidebar_contact_url || '#'} target="_blank" rel="noopener noreferrer">
                                                {pageData.sidebar_contact_link || 'Contact Us'}
                                            </a>
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

export async function getServerSideProps({ params, locale = 'en' }) {
    const slug = params.slug;
    const [service, allServices, pageData, globalContent] = await Promise.all([
        safeFetch(`/api/services/${encodeURIComponent(slug)}?lang=${locale}`, null),
        safeFetch(`/api/services?lang=${locale}`, []),
        safeFetch(`/api/service-single-page?lang=${locale}`, null),
        getGlobalContent(locale),
    ]);

    if (!service) {
        return { notFound: true };
    }

    // 301 al slug canonico del idioma si la URL trae un slug viejo o de otro idioma.
    if (service.slug && service.slug !== slug) {
        const prefix = locale === 'en' ? '' : `/${locale}`;
        return {
            redirect: {
                destination: `${prefix}/service-single/${service.slug}`,
                permanent: true,
            },
        };
    }

    return {
        props: {
            service,
            allServices: Array.isArray(allServices) ? allServices : [],
            pageData,
            globalContent,
            locale,
        },
    };
}

export default ServiceSinglePage;
