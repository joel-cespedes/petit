import React from 'react';



const Testimonial = (prop) => {

    return (
        <section className={`testimonials-section section-padding ${prop.tClass}`}>
            <h2 className="hidden">Testimonials</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-xl-8 col-lg-10">
                        <div className="testimonials-area">
                            <p> Lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table Samsa was a travelling salesman it there hung a picture that he had re ently cut out of an</p>
                            <span className="quoter">Thomas Calvin</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial;