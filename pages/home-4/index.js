import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Hero3 from '../../components/hero3';
import Features from '../../components/Features/Features';
import WorkProcess from '../../components/WorkProcess/WorkProcess';
import About from '../../components/about/about';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import Testimonial from '../../components/Testimonial/Testimonial';
import ProjectSection from '../../components/ProjectSection/ProjectSection';
import FunFact from '../../components/FunFact/FunFact';
import TeamSection from '../../components/TeamSection/TeamSection';
import PartnerSection from '../../components/PartnerSection/PartnerSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import BlogSection from '../../components/BlogSection/BlogSection';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '/public/images/logo.png'

const HomePage4 =() => {
    return(
        <Fragment>
            <Navbar hclass={'header-style-1'}  Logo={Logo}/>
            <Hero3/>
            <Features/>
            <WorkProcess/>
            <About/>
            <ServiceSection/>
            <Testimonial/>
            <ProjectSection/>
            <FunFact/>
            <TeamSection/>
            <PartnerSection/>
            <ContactSection/>
            <BlogSection/>
            <Footer/> 
            <Scrollbar/>
        </Fragment>
    )
};
export default HomePage4;