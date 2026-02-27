import { createContext, useContext, useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');
    const [globalContent, setGlobalContent] = useState(null);
    const [globalLoading, setGlobalLoading] = useState(true);

    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    useEffect(() => {
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
