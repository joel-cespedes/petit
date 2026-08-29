import React, { Fragment, useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import { useLanguage } from '../../context/LanguageContext';
import SeoHead from '../../components/seo/SeoHead';
import { safeFetch, getGlobalContent, SSR_LANG } from '../../utils/serverData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const ServicePage = ({ initialServices, initialPageData }) => {
    const { language, globalContent } = useLanguage();
    const [services, setServices] = useState(initialServices || []);
    const [pageData, setPageData] = useState(initialPageData || null);

    // No re-fetchear en el primer render si el idioma coincide con el del servidor.
    const skipNextFetch = useRef(language === SSR_LANG && initialPageData != null);

    useEffect(() => {
        if (skipNextFetch.current) {
            skipNextFetch.current = false;
            return;
        }
        const fetchData = async () => {
            try {
                const [servicesRes, servicesPageRes] = await Promise.all([
                    fetch(`${API_URL}/api/services?lang=${language}`),
                    fetch(`${API_URL}/api/services-page?lang=${language}`)
                ]);
                if (servicesRes.ok) {
                    const data = await servicesRes.json();
                    setServices(data);
                }
                if (servicesPageRes.ok) {
                    setPageData(await servicesPageRes.json());
                }
            } catch (err) {
                console.error('Error fetching services:', err);
            }
        };
        fetchData();
    }, [language]);

    return (
        <Fragment>
            <SeoHead
                basePath="/services"
                title={pageData?.seo_title || `${pageData?.page_title || 'Services'} | ${globalContent?.site_name || 'Bucare Consulting'}`}
                description={pageData?.seo_description || pageData?.section_description || ''}
            />
            <Navbar hclass={'header-style-3'} />
            <PageTitle
                pageTitle={pageData?.page_title || ''}
                pagesub={pageData?.page_breadcrumb || ''}
                backgroundImage={pageData?.background_image}
            />
            <ServiceSection data={pageData} services={services} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export async function getStaticProps({ locale = 'en' }) {
    const [services, pageData, globalContent] = await Promise.all([
        safeFetch(`/api/services?lang=${locale}`, []),
        safeFetch(`/api/services-page?lang=${locale}`, null),
        getGlobalContent(locale),
    ]);

    return {
        props: {
            initialServices: Array.isArray(services) ? services : [],
            initialPageData: pageData,
            globalContent,
        },
        revalidate: 60,
    };
}

export default ServicePage;
