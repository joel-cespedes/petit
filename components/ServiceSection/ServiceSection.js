import React from "react";
import Link from "next/link";

const ClickHandler = () => {
    window.scrollTo(10, 0);
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
                        <div className="services-grids clearfix">
                            {services.map((service) => (
                                <div className="grid" key={service.id}>
                                    <div className="icon">
                                        <i className={`fi ${service.icon || 'flaticon-sheriff'}`}></i>
                                    </div>
                                    <h3><Link onClick={ClickHandler} href={"/service-single/[slug]"} as={`/service-single/${service.slug}`}>{service.title}</Link></h3>
                                    <p>{service.description}</p>
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