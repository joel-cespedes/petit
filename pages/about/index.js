import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import MissionVission from '../../components/MissionVission/MissionVission';
import Skill from '../../components/Skill/Skill';
import TeamSectionS2 from '../../components/TeamSectionS2/TeamSectionS2';
import Testimonial from '../../components/Testimonial/Testimonial';
import ProjectSection2 from '../../components/ProjectSection2/ProjectSection2';
import PartnerSectionS2 from '../../components/PartnerSection2/PartnerSectionS2';
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.png'


const AboutPage = () => {
    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'About Us'} pagesub={'About'} />
            <MissionVission />
            <Skill />
            <Testimonial tClass={'testimonials-section-s2'} />
            <ProjectSection2 pClass={'about-pg-project-section'} />
            <TeamSectionS2 />
            <PartnerSectionS2 />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default AboutPage;
