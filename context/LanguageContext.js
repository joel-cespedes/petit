import { createContext, useContext, useState, useEffect, useRef } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const LanguageContext = createContext();

export function LanguageProvider({ children, initialGlobalContent = null }) {
    const [language, setLanguage] = useState('en');
    // Arranca con el contenido global pre-renderizado en el servidor (sin flash de logo).
    const [globalContent, setGlobalContent] = useState(initialGlobalContent);
    const [globalLoading, setGlobalLoading] = useState(initialGlobalContent == null);

    // Evita el primer re-fetch redundante: el servidor ya entregó el contenido en inglés.
    const skipNextGlobalFetch = useRef(initialGlobalContent != null);

    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
        // Si el idioma es el pre-renderizado (en) y ya tenemos los datos, no re-fetchear.
        if (skipNextGlobalFetch.current && language === 'en') {
            skipNextGlobalFetch.current = false;
            return;
        }
        skipNextGlobalFetch.current = false;

        const fetchGlobalContent = async () => {
            setGlobalLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/global?lang=${language}`);
                if (res.ok) {
                    setGlobalContent(await res.json());
                }
            } catch (err) {
                console.error('Error fetching global content:', err);
            } finally {
                setGlobalLoading(false);
            }
        };
        fetchGlobalContent();
    }, [language]);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, globalContent, globalLoading }}>
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
