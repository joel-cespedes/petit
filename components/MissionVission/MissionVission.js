import React from "react";
import abimg1 from '/public/images/about/img-1.jpg'
import abimg2 from '/public/images/about/img-2.jpg'
import abimg3 from '/public/images/about/img-3.jpg'
import Image from "next/image";


const MissionVission = () => {
    return (
        <section className="mission-vision-section section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-xl-8 col-lg-10">
                        <div className="title-area">
                            <h2>A collection of textile samples lay spread out on the table amsa was travelling salesman and above it there hung a picture that he had of an illustrated magazine and housed</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="mission-vision-grids clearfix">
                            <div className="grid">
                                <div className="img-holder">
                                    <Image src={abimg1} alt="" />
                                </div>
                                <h3>Our mission</h3>
                                <p>He thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table</p>
                            </div>
                            <div className="grid">
                                <div className="img-holder">
                                    <Image src={abimg2} alt="" />
                                </div>
                                <h3>Our vision</h3>
                                <p>He thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table</p>
                            </div>
                            <div className="grid">
                                <div className="img-holder">
                                    <Image src={abimg3} alt="" />
                                </div>
                                <h3>Our strategies</h3>
                                <p>He thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MissionVission;