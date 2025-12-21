import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Hero2 from '../../components/hero2/Hero2';
import WorkProcess from '../../components/WorkProcess/WorkProcess';
import About2 from '../../components/about2/about2';
import ServiceSectionS2 from '../../components/ServiceSectionS2/ServiceSectionS2';
import Testimonial from '../../components/Testimonial/Testimonial';
import ProjectSection2 from '../../components/ProjectSection2/ProjectSection2';
import FunFact from '../../components/FunFact/FunFact';
import TeamSection from '../../components/TeamSection/TeamSection';
import PartnerSection from '../../components/PartnerSection/PartnerSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import BlogSection from '../../components/BlogSection/BlogSection';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '/public/images/logo-2.png'


const HomePage3 = () => {
    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <Hero2 />
            <WorkProcess/>
            <About2 abClass={'about-section-s3'}/>
            <ServiceSectionS2 sClass={'services-section-s3'}/>
            <Testimonial />
            <ProjectSection2 />
            <FunFact />
            <TeamSection />
            <PartnerSection />
            <ContactSection />
            <BlogSection />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default HomePage3;