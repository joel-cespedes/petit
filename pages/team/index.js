import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import TeamSectionS2 from '../../components/TeamSectionS2/TeamSectionS2';
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.png'

const TeamPage =() => {
    return(
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle pageTitle={'Team'} pagesub={'Team'}/> 
            <TeamSectionS2 tmClass={'team-pg-section'}/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default TeamPage;
