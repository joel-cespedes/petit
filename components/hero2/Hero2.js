import React from "react";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Link from "next/link";


const Hero2 = () => {
    return (

        <section className="hero-slider hero-style-2">
            <Swiper
                // install Swiper modules
                modules={[Navigation, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={1800}
                parallax={true}
                navigation
            >
                <SwiperSlide>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/slider/slide-3.jpg'})` }}>
                        <div className="container">
                            <div className="slide-title">
                                <h2>Normal sleeps, super dreams</h2>
                            </div>
                            <div className="slide-text">
                                <p>Raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="slide-btns">
                                <Link href="/contact" className="theme-btn">Discover More<span></span></Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/slider/slide-2.jpg'})` }}>
                        <div className="container">
                            <div className="slide-title">
                                <h2>Normal sleeps, super dreams</h2>
                            </div>
                            <div className="slide-text">
                                <p>Raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="slide-btns">
                                <Link href="/contact" className="theme-btn">Discover More<span></span></Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${'images/slider/slide-1.jpg'})` }}>
                        <div className="container">
                            <div className="slide-title">
                                <h2>Normal sleeps, super dreams</h2>
                            </div>
                            <div className="slide-text">
                                <p>Raising a heavy fur muff that covered the whole of her lower arm towards the viewer.</p>
                            </div>
                            <div className="clearfix"></div>
                            <div className="slide-btns">
                                <Link href="/contact" className="theme-btn">Discover More<span></span></Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                ...
            </Swiper>
        </section>
    )
}

export default Hero2;