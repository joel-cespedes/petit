import Head from 'next/head';
import { useRouter } from 'next/router';
import { SITE_URL } from '../../utils/serverData';

const LOCALES = ['en', 'es', 'nl'];

// URL absoluta de una pagina estatica para un locale (en = raiz sin prefijo).
const abs = (locale, basePath) =>
    `${SITE_URL}${locale === 'en' ? '' : `/${locale}`}${basePath}`;

/**
 * <title>, meta description, canonical, hreflang (en/es/nl/x-default) y
 * Open Graph/Twitter para paginas estaticas (home, services, about, contact, blog).
 * basePath: '' (home), '/services', '/about', '/contact', '/blog'.
 */
export default function SeoHead({ title, description, basePath = '', image, jsonLd }) {
    const router = useRouter();
    const locale = router.locale || 'en';
    const canonical = abs(locale, basePath);
    const img = image || `${SITE_URL}/images/logo.png`;
    const desc = description || '';
    const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

    return (
        <Head>
            <title>{title}</title>
            {desc && <meta name="description" content={desc} />}
            {schemas.map((obj, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
                />
            ))}

            <link rel="canonical" href={canonical} />
            {LOCALES.map((l) => (
                <link key={l} rel="alternate" hrefLang={l} href={abs(l, basePath)} />
            ))}
            <link rel="alternate" hrefLang="x-default" href={abs('en', basePath)} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={title} />
            {desc && <meta property="og:description" content={desc} />}
            <meta property="og:image" content={img} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {desc && <meta name="twitter:description" content={desc} />}
            <meta name="twitter:image" content={img} />
        </Head>
    );
}
