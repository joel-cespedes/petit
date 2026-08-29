import React, { Fragment, useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar'
import Footer from '../../components/footer/Footer';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';
import { safeFetch, getGlobalContent, SSR_LANG } from '../../utils/serverData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const SECTIONS = [
    { titleKey: 'about_title', contentKey: 'about_content' },
    { titleKey: 'experience_title', contentKey: 'experience_content' },
    { titleKey: 'education_title', contentKey: 'education_content' },
    { titleKey: 'achievements_title', contentKey: 'achievements_content' },
];

// La ficha unica de about_page se migro a la tabla team_members. Si el backend
// aun no expone la lista, caemos al perfil antiguo para no dejar la pagina vacia.
const getMembers = (data) => {
    if (!data) return [];
    if (Array.isArray(data.team_members) && data.team_members.length > 0) {
        return data.team_members;
    }
    return data.name ? [data] : [];
};

const AboutPage = ({ initialData }) => {
    const { language } = useLanguage();
    const [data, setData] = useState(initialData || null);
    const [loading, setLoading] = useState(initialData == null);

    const skipNextFetch = useRef(language === SSR_LANG && initialData != null);

    const members = getMembers(data);

    useEffect(() => {
        if (skipNextFetch.current) {
            skipNextFetch.current = false;
            return;
        }
        fetchData();
    }, [language]);

    const fetchData = async () => {
        try {
            const res = await fetch(`${API_URL}/api/about?lang=${language}`);
            if (res.ok) {
                setData(await res.json());
            }
        } catch (err) {
            console.error('Error fetching about data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Fragment>
                <Navbar hclass={'header-style-3'} />
                <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>
                <Footer />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} />
            <PageTitle pageTitle={data?.page_title || 'About Us'} pagesub={data?.page_breadcrumb || 'About'} backgroundImage={data?.background_image} />
            <section className="team-sigle-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-12 col-12">
                            {members.map((member, idx) => (
                                <div
                                    className="team-single-content"
                                    key={member.id ?? idx}
                                    style={idx > 0 ? { marginTop: '80px' } : undefined}
                                >
                                    <div className="team">
                                        {member.profile_image && (
                                            <div className="img-holder">
                                                <img src={member.profile_image} alt={member.name} style={{ maxWidth: '300px', borderRadius: '8px' }} />
                                            </div>
                                        )}
                                        <div className="team-single-info">
                                            <div className="info">
                                                <h3>{member.name}</h3>
                                                <span>{member.title}</span>
                                                <ul>
                                                    {member.phone && (
                                                        <li><i className="ti-mobile"></i><span>Phone: </span>{member.phone}</li>
                                                    )}
                                                    {member.email && (
                                                        <li><i className="ti-email"></i><span>Email: </span>{member.email}</li>
                                                    )}
                                                    {member.experience && (
                                                        <li><i className="ti-timer"></i><span>Experience: </span>{member.experience}</li>
                                                    )}
                                                    {member.address && (
                                                        <li><i className="ti-location-pin"></i><span>Address: </span>{member.address}</li>
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="social">
                                                <ul>
                                                    {member.social_facebook && (
                                                        <li><Link href={member.social_facebook} target="_blank"><i className="ti-facebook"></i></Link></li>
                                                    )}
                                                    {member.social_twitter && (
                                                        <li><Link href={member.social_twitter} target="_blank"><i className="ti-twitter-alt"></i></Link></li>
                                                    )}
                                                    {member.social_linkedin && (
                                                        <li><Link href={member.social_linkedin} target="_blank"><i className="ti-linkedin"></i></Link></li>
                                                    )}
                                                    {member.social_pinterest && (
                                                        <li><Link href={member.social_pinterest} target="_blank"><i className="ti-pinterest"></i></Link></li>
                                                    )}
                                                    {member.social_instagram && (
                                                        <li><Link href={member.social_instagram} target="_blank"><i className="ti-instagram"></i></Link></li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="team-details">
                                        {SECTIONS.map(({ titleKey, contentKey }) => (
                                            member[titleKey] ? (
                                                <Fragment key={titleKey}>
                                                    <h2>{member[titleKey]}</h2>
                                                    {member[contentKey] && (
                                                        <div dangerouslySetInnerHTML={{ __html: member[contentKey] }} />
                                                    )}
                                                </Fragment>
                                            ) : null
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

export async function getStaticProps({ locale = 'en' }) {
    const [data, globalContent] = await Promise.all([
        safeFetch(`/api/about?lang=${locale}`, null),
        getGlobalContent(locale),
    ]);

    return {
        props: { initialData: data, globalContent },
        revalidate: 60,
    };
}

export default AboutPage;
