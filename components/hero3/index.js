import React from "react";
import Link from "next/link";


const Hero3 = () => {
    return (

        <section className="hero-slider hero-style-1 static-hero">
            <div className="hero-container">
                <div className="hero-inner">
                    <div className="container">
                        <div data-swiper-parallax="300" className="slide-title">
                            <h2>Most populer consulting agency</h2>
                        </div>
                        <div data-swiper-parallax="400" className="slide-text">
                            <p>Raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p>
                        </div>
                        <div className="clearfix"></div>
                        <div data-swiper-parallax="500" className="slide-btns">
                            <Link href="/contact" className="theme-btn">Discover More<span></span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero3;