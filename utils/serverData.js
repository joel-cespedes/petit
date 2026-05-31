// Helpers para obtener datos en el servidor (getStaticProps / ISR).
// Centraliza el fetch al backend para que las páginas incrusten los datos
// en el HTML inicial y no haya "flash" de imágenes de plantilla.

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Idioma con el que se pre-renderiza en el servidor.
export const SSR_LANG = 'en';

// Fetch resiliente: si el backend falla, devuelve el fallback en vez de romper el build.
export async function safeFetch(path, fallback = null) {
    try {
        const res = await fetch(`${API_URL}${path}`);
        return res.ok ? await res.json() : fallback;
    } catch (err) {
        return fallback;
    }
}

// Contenido global (logo, navbar, footer) — se usa en todas las páginas.
export async function getGlobalContent(lang = SSR_LANG) {
    return safeFetch(`/api/global?lang=${lang}`, null);
}
