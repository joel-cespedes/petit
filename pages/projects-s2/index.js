import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import ProjectSection2 from '../../components/ProjectSection2/ProjectSection2';
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.png'

const ProjectPageS2 =() => {
    return(
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'Projects'} pagesub={'Project'}/> 
            <ProjectSection2/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default ProjectPageS2;
