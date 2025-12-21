import React, {Fragment} from 'react';
import Navbar2 from '../../components/Navbar2/Navbar2'
import Hero from '../../components/hero/hero';
import Features from '../../components/Features/Features';
import About2 from '../../components/about2/about2';
import ServiceSectionS2 from '../../components/ServiceSectionS2/ServiceSectionS2';
import Testimonial from '../../components/Testimonial/Testimonial';
import ProjectSection from '../../components/ProjectSection/ProjectSection';
import FunFact from '../../components/FunFact/FunFact';
import TeamSection from '../../components/TeamSection/TeamSection';
import PartnerSection from '../../components/PartnerSection/PartnerSection';
import ContactSection from '../../components/ContactSection/ContactSection';
import BlogSection from '../../components/BlogSection/BlogSection';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';

const HomePage =() => {
    return(
        <Fragment>
            <div className="box-style">
                <Navbar2/>
                <Hero/>
                <Features/>
                <About2/>
                <ServiceSectionS2/>
                <Testimonial/>
                <ProjectSection/>
                <FunFact/>
                <TeamSection/>
                <PartnerSection/>
                <ContactSection/>
                <BlogSection/>
                <Footer/> 
                <Scrollbar/>
            </div>
        </Fragment>
    )
};
export default HomePage;