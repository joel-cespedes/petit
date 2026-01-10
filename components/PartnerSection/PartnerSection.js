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
                        <div className="partner-image">
                            {data?.partner_image && (
                                <img src={data.partner_image} alt="Partner" style={{width: '100%', height: 'auto', borderRadius: '8px'}} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PartnerSection;
