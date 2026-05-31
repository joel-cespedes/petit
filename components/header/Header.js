import React, { useState } from 'react'
import Link from "next/link";
import MobileMenu from '../MobileMenu/MobileMenu'
import { totalPrice } from "../../utils";
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import { useLanguage } from '../../context/LanguageContext';

const Header = (props) => {
    const [menuActive, setMenuState] = useState(false);
    const [cartActive, setcartState] = useState(false);
    const { language, changeLanguage, globalContent } = useLanguage();

    const handleLanguageChange = (e) => {
        changeLanguage(e.target.value);
    };

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const { carts } = props;

    return (
        <header id="header" className={`site-header ${props.hclass}`}>
            <nav className="navigation navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <div className="navbar-header">
                        <MobileMenu />
                        <Link onClick={ClickHandler} className="navbar-brand" href="/">
                            {(() => {
                                const logoSrc = props.hclass === 'header-style-1'
                                    ? globalContent?.logo_white
                                    : globalContent?.logo_url;
                                // Sin fallback de plantilla: nada hasta que cargue el logo real.
                                return logoSrc ? (
                                    <img src={logoSrc} alt="Logo" style={{height: '50px', width: 'auto'}} />
                                ) : (
                                    <span style={{display: 'inline-block', height: '50px'}} />
                                );
                            })()}
                        </Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse navigation-holder">
                        <button className="close-navbar"><i className="ti-close"></i></button>

                        <ul className="nav navbar-nav mb-2 mb-lg-0">
                            <li >
                                <Link onClick={ClickHandler} href="/">{globalContent?.nav_home || 'Home'}</Link>
                            </li>
                            <li >
                                <Link onClick={ClickHandler} href="/services">{globalContent?.nav_services || 'Services'}</Link>
                            </li>
                            <li >
                                <Link onClick={ClickHandler} href="/blog">{globalContent?.nav_blog || 'Blog'}</Link>
                            </li>
                            <li >
                                <Link onClick={ClickHandler} href="/about">{globalContent?.nav_about || 'About Us'}</Link>
                            </li>
                            <li className="menu-language">
                                <select
                                    className="language-select"
                                    value={language}
                                    onChange={handleLanguageChange}
                                    id="language-select"
                                >
                                    <option value="en">🇬🇧 EN</option>
                                    <option value="es">🇪🇸 ES</option>
                                    <option value="nl">🇳🇱 NL</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

    )
}

const mapStateToProps = (state) => {
    return {
        carts: state.cartList.cart,
    };
};


export default connect(mapStateToProps, { removeFromCart })(Header);
