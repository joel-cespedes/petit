import React, { Fragment, useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/hero/hero';
import Features from '../components/Features/Features';
import About from '../components/about/about';
import ServiceSection from '../components/ServiceSection/ServiceSection';
import Testimonial from '../components/Testimonial/Testimonial';
import FunFact from '../components/FunFact/FunFact';
import PartnerSection from '../components/PartnerSection/PartnerSection';
import BlogSection from '../components/BlogSection/BlogSection';
import Footer from '../components/footer/Footer';
import Scrollbar from '../components/scrollbar/scrollbar';
import { useLanguage } from '../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const HomePage = () => {
    const { language } = useLanguage();
    const [homeData, setHomeData] = useState(null);
    const [services, setServices] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [homeRes, servicesRes, blogsRes] = await Promise.all([
                    fetch(`${API_URL}/api/home?lang=${language}`),
                    fetch(`${API_URL}/api/services?lang=${language}`),
                    fetch(`${API_URL}/api/blogs?lang=${language}`)
                ]);

                if (homeRes.ok) {
                    const data = await homeRes.json();
                    setHomeData(data);
                }
                if (servicesRes.ok) {
                    const data = await servicesRes.json();
                    setServices(data);
                }
                if (blogsRes.ok) {
                    const data = await blogsRes.json();
                    setBlogs(data);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchAllData();
    }, [language]);

    return (
        <Fragment>
            <Navbar hclass={'header-style-1'} Logo={homeData?.logo_image || '/images/logo.png'} />
            <Hero data={homeData} />
            <Features data={homeData} />
            <About data={homeData} />
            <ServiceSection data={homeData} services={services} />
            <Testimonial data={homeData} />
            <FunFact data={homeData} />
            <PartnerSection data={homeData} />
            <BlogSection data={homeData} blogs={blogs} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage;
