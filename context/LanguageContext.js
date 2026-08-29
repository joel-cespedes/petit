import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const LanguageContext = createContext();

export function LanguageProvider({ children, initialGlobalContent = null }) {
    const router = useRouter();
    // El idioma vive en la URL (routing i18n de Next): /es/..., /nl/..., raiz = en.
    const language = router.locale || 'en';

    // Arranca con el contenido global pre-renderizado en el servidor (sin flash de logo).
    const [globalContent, setGlobalContent] = useState(initialGlobalContent);
    const [globalLoading, setGlobalLoading] = useState(initialGlobalContent == null);

    // Slugs localizados del servicio actual, para poder cambiar de idioma en /service-single.
    const [serviceSlugs, setServiceSlugs] = useState(null);

    // El servidor ya entrego el contenido global en el idioma de la URL: evita el primer re-fetch.
    const skipNextGlobalFetch = useRef(initialGlobalContent != null);

    useEffect(() => {
        if (skipNextGlobalFetch.current) {
            skipNextGlobalFetch.current = false;
            return;
        }
        let active = true;
        const fetchGlobalContent = async () => {
            setGlobalLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/global?lang=${language}`);
                if (res.ok && active) {
                    setGlobalContent(await res.json());
                }
            } catch (err) {
                console.error('Error fetching global content:', err);
            } finally {
                if (active) setGlobalLoading(false);
            }
        };
        fetchGlobalContent();
        return () => { active = false; };
    }, [language]);

    // Cambiar idioma = navegar al mismo contenido en otro locale (nueva URL indexable).
    const changeLanguage = (lang) => {
        if (lang === language) return;
        // En una pagina de servicio, saltar al slug equivalente en el idioma destino.
        if (router.pathname === '/service-single/[slug]' && serviceSlugs && serviceSlugs[lang]) {
            router.push(`/service-single/${serviceSlugs[lang]}`, undefined, { locale: lang });
            return;
        }
        router.push({ pathname: router.pathname, query: router.query }, undefined, { locale: lang });
    };

    return (
        <LanguageContext.Provider
            value={{ language, changeLanguage, globalContent, globalLoading, serviceSlugs, setServiceSlugs }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
