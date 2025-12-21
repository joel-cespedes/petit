import React from 'react'

const Skill = (props) => {
    return (
        <section className="experience-section">
            <div className="content-area">
                <div className="left-col"></div>
                <div className="right-col">
                    <h2>Why we are the best choice for <br />your next project!</h2>
                    <p>Helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman</p>
                    <ul>
                        <li><i className="ti-check"></i>peacefully between its four familiar walls a collection of textile samples</li>
                        <li><i className="ti-check"></i>Familiar walls a collection of textile samples</li>
                        <li><i className="ti-check"></i>peaacefully between its four familiar walls a collection of textile samples</li>
                        <li><i className="ti-check"></i>Between its four familiar walls a collection of textile samples</li>
                    </ul>
                    <div className="skills">
                        <div className="skill">
                            <h6>Marketing</h6>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: "85%" }}></div>
                                <span className="progress-value">85%</span>
                            </div>
                        </div>
                        <div className="skill">
                            <h6>Consulting</h6>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: "98%" }}></div>
                                <span className="progress-value">98%</span>
                            </div>
                        </div>
                        <div className="skill">
                            <h6>Development</h6>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: "92%" }}></div>
                                <span className="progress-value">92%</span>
                            </div>
                        </div>
                        <div className="skill">
                            <h6>Branding</h6>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: "90%" }}></div>
                                <span className="progress-value">90%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <section className="wpo-skill-section section-padding">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-12 col-12">
                        <div className="wpo-skill-text">
                            <h5>Our Professional Skill’s</h5>
                            <h2>Professional Skill of <span>Consoel.</span></h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 col-md-12 col-12">
                        <div className="wpo-skill-progress">
                            <div className="wpo-progress-single">
                                <h5 className="progress-title">Financial Investment</h5>
                                <div className="progress">
                                    <Fade left>
                                        <div className="progress-bar"
                                            data-wow-delay=".3s" role="progressbar" style={{ width: `${75}%` }} aria-valuenow="90"
                                            aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </Fade>
                                </div>
                                <span className="progress-number">75%</span>
                            </div>

                            <div className="wpo-progress-single">
                                <h5 className="progress-title">Business Analysis</h5>
                                <div className="progress">
                                    <Fade left>
                                        <div className="progress-bar" data-wow-duration="0.7s"
                                            data-wow-delay=".3s" role="progressbar" style={{ width: `${80}%` }} aria-valuenow="75"
                                            aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </Fade>
                                </div>
                                <span className="progress-number">80%</span>
                            </div>

                            <div className="wpo-progress-single">
                                <h5 className="progress-title">Tax Management</h5>
                                <div className="progress">
                                    <Fade left>
                                        <div className="progress-bar" data-wow-duration="0.9s"
                                            data-wow-delay=".3s" role="progressbar" style={{ width: `${85}%` }} aria-valuenow="95"
                                            aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </Fade>
                                </div>
                                <span className="progress-number">85%</span>
                            </div>
                            <div className="wpo-progress-single">
                                <h5 className="progress-title">Financial Advices</h5>
                                <div className="progress">
                                    <Fade left>
                                        <div className="progress-bar" data-wow-duration="1.1s"
                                            data-wow-delay=".3s" role="progressbar" style={{ width: `${95}%` }} aria-valuenow="95"
                                            aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </Fade>
                                </div>
                                <span className="progress-number">95%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
        </section>
    )
}

export default Skill;