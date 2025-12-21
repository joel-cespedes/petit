import React from 'react'

const Features = (props) => {
    return (
        <section className="features-section">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="feature-grids clearfix">
                            <div className="grid">
                                <div className="icon">
                                    <i className="fi flaticon-sheriff"></i>
                                </div>
                                <h3>Business Consulting</h3>
                                <p>Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table</p>
                            </div>
                            <div className="grid">
                                <div className="icon">
                                    <i className="fi flaticon-diamond"></i>
                                </div>
                                <h3>Market Research</h3>
                                <p>Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table</p>
                            </div>
                            <div className="grid">
                                <div className="icon">
                                    <i className="fi flaticon-idea"></i>
                                </div>
                                <h3>Thaught Leadership</h3>
                                <p>Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features;