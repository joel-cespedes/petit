import React, { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import { useRouter } from 'next/router'
import BlogSingle from '../../components/BlogDetails/BlogSingle.js'
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.png'
import { useLanguage } from '../../context/LanguageContext';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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

    const pageUrl = `${SITE_URL}/blog-single/${slug}`;
    const imageUrl = blog?.image_url?.startsWith('http')
        ? blog.image_url
        : `${SITE_URL}${blog?.image_url || '/images/blog/img-1.jpg'}`;

    return (
        <Fragment>
            <Head>
                <title>{blog?.title || 'Blog'} | Jhair</title>
                <meta name="description" content={blog?.description || ''} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={blog?.title || 'Blog'} />
                <meta property="og:description" content={blog?.description || ''} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:site_name" content="Jhair" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={pageUrl} />
                <meta name="twitter:title" content={blog?.title || 'Blog'} />
                <meta name="twitter:description" content={blog?.description || ''} />
                <meta name="twitter:image" content={imageUrl} />

                {/* LinkedIn specific */}
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Canonical URL */}
                <link rel="canonical" href={pageUrl} />
            </Head>
            <Navbar hclass={'header-style-3'} Logo={Logo}/>
            <PageTitle pageTitle={blog?.title || 'Blog'} pagesub={pageContent?.page_breadcrumb || 'Blog'} backgroundImage={blog?.background_image} />
            <BlogSingle blog={blog} pageContent={pageContent} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export default BlogDetails;
