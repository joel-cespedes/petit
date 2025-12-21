import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Footer from '../../components/footer/Footer';
import Services from '../../api/service'
import ServiceTab from './ServiceTab';
import Logo from '/public/images/logo-2.png'
import Image from 'next/image';


const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const SubmitHandler = (e) => {
    e.preventDefault()
}


const ServiceSinglePage = (props) => {

    const router = useRouter()

    const ServiceDetails = Services.find(item => item.slug === router.query.slug)

    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={ServiceDetails?.sTitle} pagesub={'Project'} />

            <section className="service-single-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-9 order-lg-2 order-1 col-12">
                            <div className="service-single-content">
                                <div className="service-pic">
                                    <Image src={ServiceDetails?.sImg} alt="" />
                                </div>
                                <h2>Market Research service</h2>
                                <p>It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops</p>
                                <p>Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright</p>

                                <h3>Magazine and housed in a nice, gilded frame</h3>
                                <p>Peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut</p>
                                <div className="service-features">
                                    <ul>
                                        <li><i className="ti-check-box"></i>Towards the viewer gregor then turned</li>
                                        <li><i className="ti-check-box"></i>Showed a lady fitted out with a fur hat and</li>
                                        <li><i className="ti-check-box"></i>Turned to look out the window</li>
                                    </ul>
                                    <ul>
                                        <li><i className="ti-check-box"></i>Towards the viewer gregor then turned</li>
                                        <li><i className="ti-check-box"></i>Showed a lady fitted out with a fur hat and</li>
                                        <li><i className="ti-check-box"></i>Turned to look out the window</li>
                                    </ul>
                                </div>

                                <ServiceTab />

                                <div className="request-service">
                                    <h3>Request this service</h3>
                                    <form method="post" onSubmit={SubmitHandler}>
                                        <div>
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Your Name*" />
                                        </div>
                                        <div>
                                            <input type="email" className="form-control" name="email" id="email" placeholder="Your Email*" />
                                        </div>
                                        <div>
                                            <input type="text" className="form-control" name="phone" id="phone" placeholder="Your Phone*" />
                                        </div>
                                        <div className="submit-area">
                                            <button type="submit">Submit Now</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-3 order-lg-1 order-2 col-12">
                            <div className="service-sidebar">
                                <div className="widget service-list-widget">
                                    <ul>
                                        <li className="current"><Link href="/services">All Service</Link></li>
                                        {Services.map((service, srv) => (
                                            <li key={srv}><Link onClick={ClickHandler} href={'/service-single/[slug]'} as={`/service-single/${service.slug}`}>{service.sTitle}</Link></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="widget service-features-widget">
                                    <h3>Our Service Features</h3>
                                    <ol>
                                        <li>Quality service guarantee</li>
                                        <li>100% safe work</li>
                                        <li>Money back guarantee</li>
                                        <li>100% satisfied client</li>
                                    </ol>
                                </div>
                                <div className="widget download-widget">
                                    <ul>
                                        <li><Link onClick={ClickHandler} href='/contact'><i className="ti-file"></i>Download Brochure</Link></li>
                                    </ul>
                                </div>
                                <div className="widget contact-widget">
                                    <div>
                                        <h4>Need help?</h4>
                                        <p>Covered the whole of her lower arm towards the viewer. Gregor then turned to look out the ?</p>
                                        <p>Phone: ++8451442514</p>
                                        <Link onClick={ClickHandler} href='/contact'>Contact With Us</Link>
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
export default ServiceSinglePage;