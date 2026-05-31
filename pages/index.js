import React, { Fragment, useState, useEffect, useRef } from 'react';
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

// Idioma con el que se pre-renderiza la página en el servidor (ISR).
const SSR_LANG = 'en';

const HomePage = ({ initialHome, initialServices, initialBlogs }) => {
    const { language } = useLanguage();
    const [homeData, setHomeData] = useState(initialHome);
    const [services, setServices] = useState(initialServices || []);
    const [blogs, setBlogs] = useState(initialBlogs || []);

    // Evita re-fetch redundante en el primer render cuando el idioma
    // coincide con el ya pre-renderizado en el servidor.
    const skipNextFetch = useRef(language === SSR_LANG && initialHome != null);

    useEffect(() => {
        if (skipNextFetch.current) {
            skipNextFetch.current = false;
            return;
        }

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
                    setBlogs(data.blogs || []);
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
            {/* <Features data={homeData} /> */}
            {/* <About data={homeData} /> */}
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

// ISR: el servidor pre-renderiza la home con el contenido ya incrustado
// (idioma por defecto) y revalida cada 60s. Elimina el flash de texto vacío.
export async function getStaticProps() {
    const safeFetch = async (url, fallback) => {
        try {
            const res = await fetch(url);
            return res.ok ? await res.json() : fallback;
        } catch (err) {
            return fallback;
        }
    };

    const [home, services, blogsRaw] = await Promise.all([
        safeFetch(`${API_URL}/api/home?lang=${SSR_LANG}`, null),
        safeFetch(`${API_URL}/api/services?lang=${SSR_LANG}`, []),
        safeFetch(`${API_URL}/api/blogs?lang=${SSR_LANG}`, { blogs: [] }),
    ]);

    return {
        props: {
            initialHome: home,
            initialServices: Array.isArray(services) ? services : [],
            initialBlogs: blogsRaw?.blogs || [],
        },
        revalidate: 60, // regenera la página como máximo cada 60 segundos
    };
}

export default HomePage;
