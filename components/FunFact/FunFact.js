import React from 'react'
import CountUp from 'react-countup';

const FunFact = ({ data }) => {
    const funFactItems = [
        {
            title: data?.funfact_1_number || '0',
            subTitle: data?.funfact_1_label || '',
            Symbol: data?.funfact_1_symbol || '',
            icon: `fi ${data?.funfact_1_icon || 'flaticon-diamond'}`,
        },
        {
            title: data?.funfact_2_number || '0',
            subTitle: data?.funfact_2_label || '',
            Symbol: data?.funfact_2_symbol || '',
            icon: `fi ${data?.funfact_2_icon || 'flaticon-happy'}`,
        },
        {
            title: data?.funfact_3_number || '0',
            subTitle: data?.funfact_3_label || '',
            Symbol: data?.funfact_3_symbol || '',
            icon: `fi ${data?.funfact_3_icon || 'flaticon-projector'}`,
        },
        {
            title: data?.funfact_4_number || '0',
            subTitle: data?.funfact_4_label || '',
            Symbol: data?.funfact_4_symbol || '',
            icon: `fi ${data?.funfact_4_icon || 'flaticon-medal'}`,
        },
    ];

    return (
        <section className="fun-fact-section">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="fun-fact-grids clearfix">
                            {funFactItems.map((funfact, fitem) => (
                                <div className="grid" key={fitem}>
                                    <div className="icon">
                                        <div className={funfact.icon}></div>
                                    </div>
                                    <div className="info">
                                        <h3><span><CountUp end={parseInt(funfact.title)} enableScrollSpy /></span>{funfact.Symbol}</h3>
                                        <p>{funfact.subTitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <span id="counter" className='d-none' />
        </section>
    )
}

export default FunFact;
