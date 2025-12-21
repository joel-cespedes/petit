import React, { useState } from 'react'
import Link from "next/link";
import HeaderTopbar from '../HeaderTopbar/HeaderTopbar';
import MobileMenu from '../MobileMenu/MobileMenu'
import { totalPrice } from "../../utils";
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import Logo from '/public/images/logo.png'
import Image from 'next/image';

const Header2 = (props) => {
    const [menuActive, setMenuState] = useState(false);
    const [cartActive, setcartState] = useState(false);

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const { carts } = props;

    return (
        <header id="header" className={`site-header header-style-2 ${props.hclass}`}>
            <HeaderTopbar />
            <nav className="navigation navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <MobileMenu />
                        <Link onClick={ClickHandler} className="navbar-brand" href="/home"><Image src={Logo} alt="" /></Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse navigation-holder">
                        <button className="close-navbar"><i className="ti-close"></i></button>

                        <ul className="nav navbar-nav mb-2 mb-lg-0">
                            <li className="menu-item-has-children">
                                <Link onClick={ClickHandler} href="/">Home</Link>
                                <ul className="sub-menu">
                                    <li><Link onClick={ClickHandler} href="/home">Home Default</Link></li>
                                    <li><Link onClick={ClickHandler} href="/home-2">Home style 2</Link></li>
                                    <li><Link onClick={ClickHandler} href="/home-3">Home style 3</Link></li>
                                    <li><Link onClick={ClickHandler} href="/home-4">Home static hero</Link></li>
                                    <li><Link onClick={ClickHandler} href="/home-5">Home static hero box</Link></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <Link onClick={ClickHandler} href="/">Pages</Link>
                                <ul className="sub-menu">
                                    <li><Link onClick={ClickHandler} href="/about">About</Link></li>
                                    <li><Link onClick={ClickHandler} href="/contact">Contact</Link></li>
                                    <li><Link onClick={ClickHandler} href="/testimonials">Testimonials</Link></li>
                                    <li><Link onClick={ClickHandler} href="/team">Team</Link></li>
                                    <li><Link onClick={ClickHandler} href="/team-single/Morkal-Akunda">Team Single</Link></li>
                                    <li><Link onClick={ClickHandler} href="/404">404</Link></li>
                                    <li className="menu-item-has-children">
                                        <Link onClick={ClickHandler} href="/">Shop</Link>
                                        <ul className="sub-menu">
                                            <li><Link onClick={ClickHandler} href="/shop">Shop Page</Link></li>
                                            <li><Link onClick={ClickHandler} href="/product-single/Blue-Striped-Shoes">Shop single</Link></li>
                                            <li><Link onClick={ClickHandler} href="/cart">Cart</Link></li>
                                            <li><Link onClick={ClickHandler} href="/checkout">Checkout</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <Link onClick={ClickHandler} href="/">Services</Link>
                                <ul className="sub-menu">
                                    <li><Link onClick={ClickHandler} href="/services">Service style 1</Link></li>
                                    <li><Link onClick={ClickHandler} href="/services-s2">Service style 2</Link></li>
                                    <li><Link onClick={ClickHandler} href="/service-s3">Service style 3</Link></li>
                                    <li><Link onClick={ClickHandler} href="/service-single/Market-Research">Market Research</Link></li>
                                    <li><Link onClick={ClickHandler} href="/service-single/Corporate-Finance">Corporate Finance</Link></li>
                                    <li><Link onClick={ClickHandler} href="/service-single/Advanced-Analytics">Advance Analytics</Link></li>
                                    <li><Link onClick={ClickHandler} href="/service-single/Change-Management">Change Management</Link></li>
                                    <li><Link onClick={ClickHandler} href="/service-single/Strategy-Marketing">Stragegy & Marketing</Link></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <Link onClick={ClickHandler} href="/">Projects</Link>
                                <ul className="sub-menu">
                                    <li><Link onClick={ClickHandler} href="/projects">Projects</Link></li>
                                    <li><Link onClick={ClickHandler} href="/projects-s2">Projects style 2</Link></li>
                                    <li><Link onClick={ClickHandler} href="/project-single/Market-Research">Project single</Link></li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <Link onClick={ClickHandler} href="/">Blog</Link>
                                <ul className="sub-menu">
                                    <li><Link onClick={ClickHandler} href="/blog">Blog Default</Link></li>
                                    <li><Link onClick={ClickHandler} href="/blog-left-sidebar">Blog left sidebar</Link></li>
                                    <li><Link onClick={ClickHandler} href="/blog-fullwidth">Blog full width</Link></li>
                                    <li><Link onClick={ClickHandler} href="/blog-single/Consulting-Success-is-the-most-comprehensive-learning">Blog details default</Link></li>
                                    <li><Link onClick={ClickHandler} href="/blog-single-left-sidebar/Consulting-Success-is-the-most-comprehensive-learning">Blog details left sidebar</Link></li>
                                    <li><Link onClick={ClickHandler} href="/blog-single-fullwidth/Consulting-Success-is-the-most-comprehensive-learning">Blog details full width</Link></li>
                                </ul>
                            </li>
                            <li><Link onClick={ClickHandler} href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="cart-search-contact">

                        <div className="header-search-form-wrapper">
                            <button onClick={() => setMenuState(!menuActive)} className="search-toggle-btn"><i
                                className={`fi ti-search ${menuActive ? "ti-close" : "fi "}`}></i></button>
                            <div className={`header-search-form ${menuActive ? "header-search-content-toggle" : ""}`}>
                                <form onSubmit={SubmitHandler}>
                                    <div>
                                        <input type="text" className="form-control"
                                            placeholder="Search here..." />
                                        <button type="submit"><i
                                            className="ti-search"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="mini-cart">
                            <button className="cart-toggle-btn" onClick={() => setcartState(!cartActive)}>
                                {" "}
                                <i className="fi flaticon-shopping-bag-3"></i>{" "}
                                <span className="cart-count">{carts.length}</span>
                            </button>
                            <div className={`mini-cart-content ${cartActive ? "mini-cart-content-toggle" : ""}`}>
                                <button className="mini-cart-close" onClick={() => setcartState(!cartActive)}><i className="ti-close"></i></button>
                                <div className="mini-cart-items">
                                    {carts &&
                                        carts.length > 0 &&
                                        carts.map((catItem, crt) => (
                                            <div className="mini-cart-item clearfix" key={crt}>
                                                <div className="mini-cart-item-image">
                                                    <span>
                                                        <img src={catItem.proImg} alt="icon" />
                                                    </span>
                                                </div>
                                                <div className="mini-cart-item-des">
                                                    <p>{catItem.title} </p>
                                                    <span className="mini-cart-item-price">
                                                        ${catItem.price} x {" "} {catItem.qty}
                                                    </span>
                                                    <span className="mini-cart-item-quantity">
                                                        <button
                                                            onClick={() =>
                                                                props.removeFromCart(catItem.id)
                                                            }
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            <i className="ti-close"></i>
                                                        </button>{" "}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className="mini-cart-action clearfix">
                                    <span className="mini-checkout-price">Subtotal: <span> ${totalPrice(carts)}</span></span>
                                    <div className="mini-btn">
                                        <Link href="/cart" className="view-cart-btn">View Cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
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


export default connect(mapStateToProps, { removeFromCart })(Header2);