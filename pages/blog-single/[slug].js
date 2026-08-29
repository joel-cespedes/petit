import React, { Fragment, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import BlogSingle from '../../components/BlogDetails/BlogSingle.js'
import Footer from '../../components/footer/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { safeFetch, getGlobalContent, SITE_URL } from '../../utils/serverData';

const LOCALES = ['en', 'es', 'nl'];

// URL absoluta de un post para un locale/slug dados.
const blogUrl = (locale, slug) => {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    return `${SITE_URL}${prefix}/blog-single/${slug}`;
};

const BlogDetails = ({ blog, pageContent, locale }) => {
    const { setLocalizedSlugs, globalContent } = useLanguage();

    // Expone los slugs por idioma al conmutador de idioma.
    useEffect(() => {
        setLocalizedSlugs(blog?.slugs || null);
        return () => setLocalizedSlugs(null);
    }, [blog, setLocalizedSlugs]);

    const slugs = blog?.slugs || {};
    const canonicalUrl = blogUrl(locale, blog.slug);
    const imageUrl = blog?.image_url?.startsWith('http')
        ? blog.image_url
        : `${SITE_URL}${blog?.image_url || '/images/blog/img-1.jpg'}`;

    return (
        <Fragment>
            <Head>
                <title>{blog?.title || 'Blog'} | {globalContent?.site_name || 'Bucare Consulting'}</title>
                <meta name="description" content={blog?.description || ''} />

                {/* Canonical + hreflang */}
                <link rel="canonical" href={canonicalUrl} />
                {LOCALES.map((lng) =>
                    slugs[lng] ? (
                        <link key={lng} rel="alternate" hrefLang={lng} href={blogUrl(lng, slugs[lng])} />
                    ) : null
                )}
                {slugs.en && (
                    <link rel="alternate" hrefLang="x-default" href={blogUrl('en', slugs.en)} />
                )}

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:title" content={blog?.title || 'Blog'} />
                <meta property="og:description" content={blog?.description || ''} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:site_name" content={globalContent?.site_name || 'Bucare Consulting'} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={canonicalUrl} />
                <meta name="twitter:title" content={blog?.title || 'Blog'} />
                <meta name="twitter:description" content={blog?.description || ''} />
                <meta name="twitter:image" content={imageUrl} />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Article',
                            headline: blog?.title || '',
                            description: blog?.description || '',
                            image: imageUrl,
                            mainEntityOfPage: canonicalUrl,
                            datePublished: blog?.published_at || undefined,
                            author: { '@type': 'Organization', name: globalContent?.site_name || 'Bucare Consulting' },
                            publisher: {
                                '@type': 'Organization',
                                name: globalContent?.site_name || 'Bucare Consulting',
                                logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
                            },
                        }),
                    }}
                />
            </Head>
            <Navbar hclass={'header-style-3'}/>
            <PageTitle pageTitle={blog?.title || 'Blog'} pagesub={pageContent?.page_breadcrumb || 'Blog'} backgroundImage={blog?.background_image} />
            <BlogSingle blog={blog} pageContent={pageContent} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};

export async function getServerSideProps({ params, locale = 'en' }) {
    const slug = params.slug;
    const [blog, pageContent, globalContent] = await Promise.all([
        safeFetch(`/api/blogs/${encodeURIComponent(slug)}?lang=${locale}`, null),
        safeFetch(`/api/blog-single-page?lang=${locale}`, null),
        getGlobalContent(locale),
    ]);

    if (!blog) {
        return { notFound: true };
    }

    // 301 al slug canonico del idioma si la URL trae un slug viejo o de otro idioma.
    if (blog.slug && blog.slug !== slug) {
        const prefix = locale === 'en' ? '' : `/${locale}`;
        return {
            redirect: {
                destination: `${prefix}/blog-single/${blog.slug}`,
                permanent: true,
            },
        };
    }

    return {
        props: { blog, pageContent, globalContent, locale },
    };
}

export default BlogDetails;
