import React from 'react'
import CountUp from 'react-countup';

const funFact = [
    {
        title: '25',
        subTitle: 'Years of experience',
        Symbol: '+',
        icon: 'fi flaticon-diamond',
    },
    {
        title: '250',
        subTitle: 'Happy clients',
        Symbol: '+',
        icon: 'fi flaticon-happy',
    },
    {
        title: '137',
        subTitle: 'Projects done',
        Symbol: '+',
        icon: 'fi flaticon-projector',
    },
    {
        title: '13',
        subTitle: 'Awards won',
        Symbol: '+',
        icon: 'fi flaticon-medal',
    },


]


const FunFact = (props) => {
    return (
        <section className="fun-fact-section">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="fun-fact-grids clearfix">
                            {funFact.map((funfact, fitem) => (
                                <div className="grid" key={fitem}>
                                    <div className="icon">
                                        <div className={funfact.icon}></div>
                                    </div>
                                    <div className="info">
                                        <h3><span><CountUp end={funfact.title} enableScrollSpy /></span>{funfact.Symbol}</h3>
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