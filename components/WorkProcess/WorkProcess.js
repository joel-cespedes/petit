import React from 'react'

const WorkProcess = ({ data }) => {
    return (
        <section className="work-process-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                        <div className="section-title">
                            <span>{data?.process_tag || ''}</span>
                            <h3>{data?.process_title || ''}</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col col-lg-10 offset-lg-1">
                        <div className="work-process-grids clearfix">
                            <div className="grid">
                                <div className="icon">
                                    <i className={`fi ${data?.process1_icon || 'flaticon-idea'}`}></i>
                                </div>
                                <h3>{data?.process1_title || ''}</h3>
                                <p>{data?.process1_description || ''}</p>
                            </div>
                            <div className="grid">
                                <div className="icon">
                                    <i className={`fi ${data?.process2_icon || 'flaticon-diamond'}`}></i>
                                </div>
                                <h3>{data?.process2_title || ''}</h3>
                                <p>{data?.process2_description || ''}</p>
                            </div>
                            <div className="grid">
                                <div className="icon">
                                    <i className={`fi ${data?.process3_icon || 'flaticon-sheriff'}`}></i>
                                </div>
                                <h3>{data?.process3_title || ''}</h3>
                                <p>{data?.process3_description || ''}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WorkProcess;