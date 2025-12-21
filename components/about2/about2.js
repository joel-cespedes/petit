import React from 'react'
import abimg from '/public/images/about.jpg'
import VideoModal from '../ModalVideo/VideoModal'
import Image from 'next/image'


const About2 = (props) => {
    return (
        <section className={`about-section section-padding ${props.abClass}`}>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6 col-12">
                        <div className="section-title-s2">
                            <span>We are consulting agency!</span>
                            <h2>We’re interested to <br />share about us</h2>
                        </div>
                        <div className="about-content">
                            <h4>It wasn't a dream. His room, a proper human room although little too small, lay peacefully between its four</h4>
                            <p>Peacefully between its four familiar walls a collection of textile samples lay spread out on the table - Samsa was a travelling salesman  and above it there hung a piture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window</p>
                            <h5>Phone: 012345645, +6546521145</h5>
                        </div>
                    </div>
                    <div className="col col-lg-6  col-12">
                        <div className="img-holder">
                            <Image src={abimg} alt="" />
                            <div className="experience-text">
                                25 Years of <span>Experience</span>
                            </div>
                            <VideoModal />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About2;