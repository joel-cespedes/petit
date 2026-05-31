import React from "react";
import Link from "next/link";

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

// Decode common HTML entities (&amp;, &nbsp;, accents, numeric codes, etc.)
const decodeHtmlEntities = (str) => {
    if (!str) return '';
    if (typeof document !== 'undefined') {
        // Browser: let the DOM decode every entity correctly
        const textarea = document.createElement('textarea');
        textarea.innerHTML = str;
        return textarea.value;
    }
    // SSR fallback: decode the most common entities manually
    return str
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code));
}

// Strip HTML tags from text, then decode HTML entities
const stripHtml = (html) => {
    if (!html) return '';
    return decodeHtmlEntities(html.replace(/<[^>]*>/g, ''));
}

const ServiceSection = ({ data, services = [] }) => {
    // Support both home_content fields (services_*) and services_page fields (section_*)
    const tag = data?.services_tag || data?.section_tag || '';
    const title = data?.services_title || data?.section_title || '';
    const description = data?.services_description || data?.section_description || '';

    return (
        <section className="services-section-s2">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                        <div className="section-title-s3">
                            <span>{tag}</span>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="services-grids">
                            {services.map((service) => (
                                <div className="grid" key={service.id}>
                                    <div className="icon">
                                        <i className={`fi ${service.icon || 'flaticon-sheriff'}`}></i>
                                    </div>
                                    <h3><Link onClick={ClickHandler} href={"/service-single/[slug]"} as={`/service-single/${service.slug}`}>{service.title}</Link></h3>
                                    <p>{stripHtml(service.description)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServiceSection;