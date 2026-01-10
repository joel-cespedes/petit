import React, { useState, useEffect } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Link from "next/link";
import { useLanguage } from '../../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const MobileMenu = () => {
    const [menuActive, setMenuState] = useState(false);
    const [globalContent, setGlobalContent] = useState(null);
    const { language, changeLanguage } = useLanguage();

    useEffect(() => {
        const fetchGlobalContent = async () => {
            try {
                const res = await fetch(`${API_URL}/api/global?lang=${language}`);
                if (res.ok) {
                    setGlobalContent(await res.json());
                }
            } catch (err) {
                console.error('Error fetching global content:', err);
            }
        };
        fetchGlobalContent();
    }, [language]);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
        setMenuState(false);
    }

    const handleLanguageChange = (e) => {
        changeLanguage(e.target.value);
    };

    const menus = [
        {
            id: 1,
            title: globalContent?.nav_home || 'Home',
            link: '/',
        },
        {
            id: 2,
            title: globalContent?.nav_services || 'Services',
            link: '/services',
        },
        {
            id: 3,
            title: globalContent?.nav_blog || 'Blog',
            link: '/blog',
        },
        {
            id: 4,
            title: globalContent?.nav_about || 'About Us',
            link: '/about',
        },
    ];

    return (
        <div>
            <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
                <div className="menu-close">
                    <div className="clox" onClick={() => setMenuState(!menuActive)}><i className="ti-close"></i></div>
                </div>

                <ul className="responsivemenu">
                    {menus.map((item, mn) => {
                        return (
                            <ListItem key={mn}>
                                <Link onClick={ClickHandler} className="active" href={item.link}>
                                    {item.title}
                                </Link>
                            </ListItem>
                        )
                    })}
                    <ListItem>
                        <select
                            className="language-select-mobile"
                            value={language}
                            onChange={handleLanguageChange}
                            style={{
                                background: 'transparent',
                                border: '1px solid #ccc',
                                padding: '8px 15px',
                                borderRadius: '4px',
                                color: '#333',
                                fontSize: '14px',
                                marginTop: '10px'
                            }}
                        >
                            <option value="en">🇬🇧 EN</option>
                            <option value="es">🇪🇸 ES</option>
                            <option value="nl">🇳🇱 NL</option>
                        </select>
                    </ListItem>
                </ul>

            </div>

            <div className="showmenu" onClick={() => setMenuState(!menuActive)}>
                <button type="button" className="navbar-toggler open-btn">
                    <span className="icon-bar first-angle"></span>
                    <span className="icon-bar middle-angle"></span>
                    <span className="icon-bar last-angle"></span>
                </button>
            </div>
        </div>
    )
}

export default MobileMenu;
