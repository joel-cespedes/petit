import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'
import Link from  'next/link'
import Projects from '../../api/project'
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.png'
import Image from 'next/image';

const ProjectSinglePage = (props) => {

    const router = useRouter()
    const projectDetails = Projects.find(item => item.slug === router.query.slug)

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={projectDetails?.title} pagesub={'Project'} />
            <section className="project-sigle-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="project-single-content">
                                <div className="img-holder">
                                    <Image src={projectDetails?.pImg} alt="" />
                                </div>
                                <div className="content-area">
                                    <div className="project-info">
                                        <ul>
                                            <li><span>Client:</span> Themegeniuslab</li>
                                            <li><span>Location:</span> Dreem city hold street</li>
                                            <li><span>Status:</span> Completed</li>
                                            <li><span>Duration:</span> 1 Month</li>
                                            <li><span>Tags:</span> Consulting, Business</li>
                                        </ul>
                                    </div>
                                    <h2>Business consulting project on drem city</h2>
                                    <p>The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather</p>
                                    <p>His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table samsa was a travelling salesman</p>

                                    <div className="challange-solution-section">
                                        <div className="theme-accordion-s1">
                                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                                <AccordionSummary
                                                    expandIcon={""}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                >
                                                    <Typography>The Challange Was</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                        <p>His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table samsa was a travelling salesman</p>
                                                        <ul>
                                                            <li><i className="ti-check"></i>spread out on the table samsa was a travelling salesman</li>
                                                            <li><i className="ti-check"></i>human room although a little too small</li>
                                                        </ul>
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                                <AccordionSummary
                                                    expandIcon={""}
                                                    aria-controls="panel2bh-content"
                                                    id="panel2bh-header"
                                                >
                                                    <Typography>Our Solutions Was</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                    <p>His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table samsa was a travelling salesman</p>
                                                            <ul>
                                                                <li><i className="ti-check"></i>spread out on the table samsa was a travelling salesman</li>
                                                                <li><i className="ti-check"></i>human room although a little too small</li>
                                                            </ul>
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </div>
                                    <div className="prev-next-project">
                                        <div>
                                            <Link onClick={ClickHandler} href={'/project-single/Investment-planning'}>
                                                <div className="icon">
                                                    <i className="fi flaticon-back"></i>
                                                </div>
                                                <span>Previous project</span>
                                                <h5>Busines consulting Project</h5>
                                            </Link>
                                        </div>
                                        <div>
                                            <Link onClick={ClickHandler} href={'/project-single/Financial-Advices'}>
                                                <div className="icon">
                                                    <i className="fi flaticon-next"></i>
                                                </div>
                                                <span>Next project</span>
                                                <h5>Busines consulting Project</h5>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default ProjectSinglePage;