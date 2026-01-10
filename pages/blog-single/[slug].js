import React, { Fragment, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import { useRouter } from 'next/router'
import BlogSingle from '../../components/BlogDetails/BlogSingle.js'
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.png'
import { useLanguage } from '../../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const BlogDetails = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { language } = useLanguage();
    const [blog, setBlog] = useState(null);
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchData();
        }
    }, [slug, language]);

    const fetchData = async () => {
        try {
            const [blogRes, pageRes] = await Promise.all([
                fetch(`${API_URL}/api/blogs/${slug}?lang=${language}`),
                fetch(`${API_URL}/api/blog-single-page?lang=${language}`)
            ]);
            if (blogRes.ok) {
                setBlog(await blogRes.json());
            }
            if (pageRes.ok) {
                setPageContent(await pageRes.json());
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Fragment>
                <Navbar hclass={'header-style-3'} Logo={Logo}/>
                <PageTitle pageTitle="Loading..." pagesub={'Blog'} />
                <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>
                <Footer />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo}/>
            <PageTitle pageTitle={blog?.title || 'Blog'} pagesub={pageContent?.page_breadcrumb || 'Blog'} backgroundImage={pageContent?.background_image} />
            <BlogSingle blog={blog} pageContent={pageContent} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default BlogDetails;
