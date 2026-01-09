import React, { useState } from 'react'
import Link from "next/link";
import Team from '../../api/team'
import ModalVideo from 'react-modal-video'
import Image from 'next/image';


const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const TeamSection = ({ data }) => {

    const [isOpen, setOpen] = useState(false)

    return (
        <section className="cta-with-team-section section-padding">
            <div className="bg"></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-xl-8 col-lg-10">
                        <div className="cta-content">
                            <div className="video-holder">
                                <button className="btn-wrap" onClick={() => setOpen(true)}><i className="fi flaticon-video-player" aria-hidden="true"></i><span>{data?.cta_video_text || ''}</span></button>
                            </div>
                            <h3>{data?.cta_title || ''}</h3>
                        </div>
                    </div>
                </div>
                <div className="team-section">
                    <div className="row">
                        <div className="col col-lg-6 col-12">
                            <div className="section-title-s4">
                                <span>{data?.team_tag || ''}</span>
                                <h2>{data?.team_title || ''}</h2>
                            </div>
                        </div>
                        <div className="col col-lg-6 col-12">
                            <div className="title-text">
                                <p>{data?.team_description || ''}</p>
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
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="7e90gBu4pas" onClose={() => setOpen(false)} />
        </section>
    )
}

export default TeamSection;