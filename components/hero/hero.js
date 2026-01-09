import React from "react";
import Link from "next/link";


const Hero = ({ data }) => {
    return (
        <section className="hero-slider hero-style-1">
            <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${data?.hero_image || '/images/slider/slide-1.jpg'})` }}>
                <div className="container">
                    <div className="slide-title">
                        <h2>{data?.hero_title || ''}</h2>
                    </div>
                    <div className="slide-text">
                        <p>{data?.hero_subtitle || ''}</p>
                    </div>
                    <div className="clearfix"></div>
                    <div className="slide-btns">
                        <Link href="/contact" className="theme-btn">{data?.hero_button || ''}<span></span></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;
