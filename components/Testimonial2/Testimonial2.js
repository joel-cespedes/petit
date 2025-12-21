import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
    dots: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};

const Testimonial2 = () => {

    return (
        <section className="testimonials-section-s2 section-padding">
            <h2 className="hidden">Testimonials</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-xl-8 col-lg-10">
                        <div className="testimonial-slider">
                            <Slider {...settings}>
                                <div className="testimonials-area">
                                    <p> Lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table Samsa was a travelling salesman it there hung a picture that he had re ently cut out of an</p>
                                    <span className="quoter">Thomas Calvin</span>
                                </div>
                                <div className="testimonials-area">
                                    <p> Lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table Samsa was a travelling salesman it there hung a picture that he had re ently cut out of an</p>
                                    <span className="quoter">Thomas Calvin</span>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial2;