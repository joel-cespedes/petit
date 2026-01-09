import React from 'react';

const Testimonial = ({ data, tClass }) => {
    const quoteIconStyle = {
        width: '76px',
        height: '54px',
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translateX(-50%)',
        backgroundImage: `url(${data?.testimonial_quote_icon || '/images/quote.png'})`,
        backgroundPosition: 'center center',
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <section className={`testimonials-section section-padding ${tClass || ''}`}>
            <h2 className="hidden">Testimonials</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-xl-8 col-lg-10">
                        <div className="testimonials-area testimonials-area-no-before">
                            <div style={quoteIconStyle}></div>
                            <p>{data?.testimonial_quote || ''}</p>
                            <span className="quoter">{data?.testimonial_author || ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial;
