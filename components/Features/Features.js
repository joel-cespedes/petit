import React from 'react'

const Features = ({ data }) => {
    return (
        <section className="features-section">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="feature-grids clearfix">
                            <div className="grid">
                                <div className="icon">
                                    <i className={`fi ${data?.feature1_icon || 'flaticon-sheriff'}`}></i>
                                </div>
                                <h3>{data?.feature1_title || ''}</h3>
                                <p>{data?.feature1_description || ''}</p>
                            </div>
                            <div className="grid">
                                <div className="icon">
                                    <i className={`fi ${data?.feature2_icon || 'flaticon-diamond'}`}></i>
                                </div>
                                <h3>{data?.feature2_title || ''}</h3>
                                <p>{data?.feature2_description || ''}</p>
                            </div>
                            <div className="grid">
                                <div className="icon">
                                    <i className={`fi ${data?.feature3_icon || 'flaticon-idea'}`}></i>
                                </div>
                                <h3>{data?.feature3_title || ''}</h3>
                                <p>{data?.feature3_description || ''}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features;