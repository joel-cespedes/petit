import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Link from "next/link";

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home',
        submenu: [
            {
                id: 11,
                title: 'Home Default',
                link: '/home'
            },
            {
                id: 12,
                title: 'Home style 2',
                link: '/home-2'
            },
            {
                id: 13,
                title: 'Home style 3',
                link: '/home-3'
            },
            {
                id: 14,
                title: 'Home static hero',
                link: '/home-4'
            },
            {
                id: 15,
                title: 'Home static hero box',
                link: '/home-5'
            },
        ]
    },

    {
        id: 3,
        title: 'Pages',
        link: '/',
        submenu: [
            {
                id: 31,
                title: 'About',
                link: '/about'
            },
            {
                id: 3222,
                title: 'Contact',
                link: '/contact'
            },
            {
                id: 322,
                title: 'Testimonials',
                link: '/testimonials'
            },
            {
                id: 34,
                title: 'Team',
                link: '/team'
            },
            {
                id: 3454,
                title: 'Team Single',
                link: '/team-single/Morkal-Akunda'
            },
            {
                id: 36,
                title: '404',
                link: '/404'
            }
        ]
    },
    {
        id: 4,
        title: 'Shop',
        link: '/shop',
        submenu: [
            {
                id: 41,
                title: 'Shop',
                link: '/shop',
            },
            {
                id: 42,
                title: 'Shop Single',
                link: '/product-single/Blue-Striped-Shoes'
            },
            {
                id: 43,
                title: 'Cart',
                link: '/cart'
            },
            {
                id: 44,
                title: 'Checkout',
                link: '/checkout'
            },
        ]
    },

    {
        id: 6,
        title: 'Services',
        link: '/services',
        submenu: [
            {
                id: 61,
                title: 'Services',
                link: '/services',
            },
            {
                id: 62,
                title: 'Service Style 2',
                link: '/services-s2'
            },
            {
                id: 625,
                title: 'Service Style 3',
                link: '/service-s3'
            },
            {
                id: 63,
                title: 'Market Research',
                link: '/service-single/Market-Research'
            },
            {
                id: 64,
                title: 'Corporate Finance',
                link: '/service-single/Corporate-Finance'
            },
            {
                id: 64,
                title: 'Advanced Analytics',
                link: '/service-single/Advanced-Analytics'
            },
            {
                id: 64,
                title: 'Change Management',
                link: '/service-single/Change-Management'
            },
            {
                id: 64,
                title: 'Strategy Marketing',
                link: '/service-single/Strategy-Marketing'
            },
        ]
    },
    {
        id: 7,
        title: 'Projects',
        link: '/projects',
        submenu: [
            {
                id: 71,
                title: 'Projects',
                link: '/projects'
            },
            {
                id: 72,
                title: 'Projects style 2',
                link: '/projects-s2'
            },
            {
                id: 74,
                title: 'Project single',
                link: '/project-single/Market-Research'
            },
        ]
    },

    {
        id: 5,
        title: 'Blog',
        link: '/blog',
        submenu: [
            {
                id: 51,
                title: 'Blog',
                link: '/blog'
            },
            {
                id: 52,
                title: 'Blog Left sidebar',
                link: '/blog-left-sidebar'
            },
            {
                id: 53,
                title: 'Blog full width',
                link: '/blog-fullwidth'
            },
            {
                id: 54,
                title: 'Blog single',
                link: '/blog-single/Consulting-Success-is-the-most-comprehensive-learning'
            },
            {
                id: 55,
                title: 'Blog single Left sidebar',
                link: '/blog-single-left-sidebar/Consulting-Success-is-the-most-comprehensive-learning'
            },
            {
                id: 56,
                title: 'Blog single full width',
                link: '/blog-single-fullwidth/Consulting-Success-is-the-most-comprehensive-learning'
            },
        ]
    },
    {
        id: 88,
        title: 'Contact',
        link: '/contact',
    }


]

const MobileMenu = () => {

    const [openId, setOpenId] = useState(0);
    const [menuActive, setMenuState] = useState(false);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div>
            <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
                <div className="menu-close">
                    <div className="clox" onClick={() => setMenuState(!menuActive)}><i className="ti-close"></i></div>
                </div>

                <ul className="responsivemenu">
                    {menus.map((item, mn) => {
                        return (
                            <ListItem className={item.id === openId ? 'active' : null} key={mn}>
                                {item.submenu ?
                                    <Fragment>
                                        <p onClick={() => setOpenId(item.id === openId ? 0 : item.id)}>{item.title}
                                            <i className={item.id === openId ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                                        </p>
                                        <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                                            <List className="subMenu">
                                                <Fragment>
                                                    {item.submenu.map((submenu, i) => {
                                                        return (
                                                            <ListItem key={i}>
                                                                <Link onClick={ClickHandler} className="active"
                                                                    href={submenu.link}>{submenu.title}</Link>
                                                            </ListItem>
                                                        )
                                                    })}
                                                </Fragment>
                                            </List>
                                        </Collapse>
                                    </Fragment>
                                    : <Link className="active"
                                        href={item.link}>{item.title}</Link>
                                }
                            </ListItem>
                        )
                    })}
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