import React from 'react'
import Link from "next/link";
import Team from '../../api/team'
import Image from 'next/image';


const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const TeamSectionS2 = (props) => {

    return (
        <div className={`team-section section-padding ${props.tmClass}`}>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6 col-12">
                        <div className="section-title-s2">
                            <span>Team members</span>
                            <h2>See our passionate <br />team members</h2>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-12">
                        <div className="title-text">
                            <p>Showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer gregor then turned to look arround the world </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="team-grids clearfix">
                            {Team.map((team, aitem) => (
                                <div className="grid" key={aitem}>
                                    <div className="img-holder">
                                        <Image src={team.tImg} alt="" />
                                    </div>
                                    <div className="details">
                                        <h5><Link onClick={ClickHandler} href={"/team-single/[slug]"} as={`/team-single/${team.slug}`}>{team.name}</Link></h5>
                                        <span>{team.title}</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamSectionS2;