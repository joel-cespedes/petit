import React from 'react'
import Image from 'next/image'
import abimg from '/public/images/about-2.jpg'


const About = ({ data }) => {
    return (
        <section className="about-section-s2">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6 order-lg-1 order-2 col-12">
                        <div className="img-holder">
                            <Image src={data?.about_image || abimg} alt="" width={450} height={450} />
                            {/* <div className="experience-text">
                                {data?.about_experience_years || ''} {data?.about_experience_text || ''} <span>{data?.about_experience_highlight || ''}</span>
                            </div> */}
                        </div>
                    </div>
                    <div className="col col-lg-6 order-lg-2 order-1 col-12">
                        <div className="section-title-s2">
                            <span>{data?.about_tag || ''}</span>
                            <h2>{data?.about_title || ''}</h2>
                        </div>
                        <div className="about-content">
                            <h4>{data?.about_description_bold || ''}</h4>
                            <p>{data?.about_description || ''}</p>
                            <h5>Phone: {data?.about_phone || ''}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;
