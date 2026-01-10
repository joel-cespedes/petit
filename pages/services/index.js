import React, { Fragment, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.png'
import { useLanguage } from '../../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const ServicePage = () => {
    const { language } = useLanguage();
    const [services, setServices] = useState([]);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesRes, servicesPageRes] = await Promise.all([
                    fetch(`${API_URL}/api/services?lang=${language}`),
                    fetch(`${API_URL}/api/services-page?lang=${language}`)
                ]);
                if (servicesRes.ok) {
                    setServices(await servicesRes.json());
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
            <Navbar hclass={'header-style-3'} Logo={Logo} />
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
export default ServicePage;

