import React from "react";
import Link from "next/link";

const PartnerSection = ({ data }) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="cta-with-partners">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6 col-12">
                        <div className="section-title-s2">
                            <span>{data?.partner_tag || ''}</span>
                            <h2>{data?.partner_title || ''}</h2>
                        </div>
                        <div className="cta-text">
                            <p>{data?.partner_description || ''}</p>
                            <Link onClick={ClickHandler} href="/contact" className="theme-btn-s2">{data?.partner_button || ''}</Link>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-12">
                        <div className="partner-grids clearfix">
                            <div className="grid">
                                <div className="img-holder">
                                    <img src={data?.partner1_image || '/images/partners/img-1.png'} alt={data?.partner1_image_alt || ''} />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="img-holder">
                                    <img src={data?.partner2_image || '/images/partners/img-2.png'} alt={data?.partner2_image_alt || ''} />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="img-holder">
                                    <img src={data?.partner3_image || '/images/partners/img-3.png'} alt={data?.partner3_image_alt || ''} />
                                </div>
                            </div>
                            <div className="grid">
                                <div className="img-holder">
                                    <img src={data?.partner4_image || '/images/partners/img-4.png'} alt={data?.partner4_image_alt || ''} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PartnerSection;
