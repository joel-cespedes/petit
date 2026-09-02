import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
};

const PartnerSection = ({ data }) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    // Carrusel desde partner_images; fallback a la imagen unica antigua (partner_image).
    // Cada item lleva su alt_text (nombre del partner) para accesibilidad + SEO.
    const images = Array.isArray(data?.partner_images)
        ? data.partner_images
            .filter((it) => it?.image_url)
            .map((it) => ({ src: it.image_url, alt: it.alt_text || 'Partner' }))
        : [];
    if (images.length === 0 && data?.partner_image) {
        images.push({ src: data.partner_image, alt: 'Partner' });
    }

    return (
        <section className="cta-with-partners section-padding">
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
                            {images.length > 1 ? (
                                <Slider {...settings} className="partner-carousel">
                                    {images.map((img, i) => (
                                        <div className="partner-slide" key={i}>
                                            <img src={img.src} alt={img.alt} />
                                        </div>
                                    ))}
                                </Slider>
                            ) : images.length === 1 ? (
                                <img src={images[0].src} alt={images[0].alt} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PartnerSection;
