import { SITE_URL } from '../utils/serverData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const LOCALES = ['en', 'es', 'nl'];

// URL absoluta para un locale (en = raiz sin prefijo).
const loc = (l, path) => `${SITE_URL}${l === 'en' ? '' : `/${l}`}${path}`;

// Un bloque <url> por locale, cada uno con las alternativas hreflang de su grupo.
function renderGroup(entries) {
    const enUrl = (entries.find((e) => e.locale === 'en') || entries[0]).url;
    const alternates = [
        ...entries.map((e) => `    <xhtml:link rel="alternate" hreflang="${e.locale}" href="${e.url}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>`,
    ].join('\n');
    return entries
        .map(
            (e) => `  <url>
    <loc>${e.url}</loc>
${alternates}
  </url>`
        )
        .join('\n');
}

export async function getServerSideProps({ res }) {
    const safe = async (url, fallback) => {
        try {
            const r = await fetch(url);
            return r.ok ? await r.json() : fallback;
        } catch (err) {
            return fallback;
        }
    };

    const [servicesRes, blogsRes] = await Promise.all([
        safe(`${API_URL}/api/services?lang=en`, []),
        safe(`${API_URL}/api/blogs?lang=en&per_page=50`, { blogs: [] }),
    ]);
    const services = Array.isArray(servicesRes) ? servicesRes : [];
    const blogs = blogsRes?.blogs || [];

    const groups = [];

    // Paginas estaticas
    for (const base of ['', '/services', '/about', '/contact', '/blog']) {
        groups.push(LOCALES.map((l) => ({ locale: l, url: loc(l, base) })));
    }

    // Servicios (slug localizado por idioma)
    for (const s of services) {
        if (!s.slugs) continue;
        groups.push(LOCALES.map((l) => ({ locale: l, url: loc(l, `/service-single/${s.slugs[l]}`) })));
    }

    // Blogs (slug localizado por idioma)
    for (const b of blogs) {
        if (!b.slugs) continue;
        groups.push(LOCALES.map((l) => ({ locale: l, url: loc(l, `/blog-single/${b.slugs[l]}`) })));
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${groups.map(renderGroup).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.write(xml);
    res.end();
    return { props: {} };
}

export default function Sitemap() {
    return null;
}
