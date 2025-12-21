import React from "react";
import Projects from '../../api/project'
import Link from "next/link";
import Image from "next/image";


const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const ProjectSection2 = (props) => {
    return (
        <section className={`projects-sections-s2 section-padding ${props.pClass}`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-xl-8 col-lg-10">
                        <div className="section-title-s3">
                            <span>Projects</span>
                            <h2>Recent Projects</h2>
                            <p>Showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="project-grids projects-slider">
                            {Projects.slice(0, 6).map((project, prj) => (
                                <div className="grid" key={prj}>
                                    <div className="img-holder">
                                        <Image src={project.pImg} alt="project" className="img img-responsive" />
                                    </div>
                                    <div className="hover-content">
                                        <div className="top-link">
                                            <Link onClick={ClickHandler} href={"/project-single/[slug]"} as={`/project-single/${project.slug}`}><i className="fi flaticon-next"></i></Link>
                                        </div>
                                        <div className="details">
                                            <h3>{project.title}</h3>
                                            <p className="cat">{project.subTitle}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProjectSection2;