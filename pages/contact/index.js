import React, { Fragment, useState, useEffect, useMemo } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';
import Logo from '/public/images/logo-2.png';
import { useLanguage } from '../../context/LanguageContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Genera dos números pequeños para el captcha de suma (1-9).
const makeCaptcha = () => ({
    a: 1 + Math.floor(Math.random() * 9),
    b: 1 + Math.floor(Math.random() * 9),
});

const ContactPage = () => {
    const { language } = useLanguage();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({ name: '', email: '', message: '', captchaAnswer: '' });
    const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
    const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    // Inicializa el captcha solo en cliente (evita mismatch de hidratación).
    useEffect(() => {
        setCaptcha(makeCaptcha());
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/api/contact-page?lang=${language}`);
                if (res.ok) setData(await res.json());
            } catch (err) {
                console.error('Error fetching contact data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [language]);

    const whatsappLink = useMemo(() => {
        const num = (data?.whatsapp_number || '').replace(/[^0-9]/g, '');
        return num ? `https://wa.me/${num}` : null;
    }, [data]);

    const mailtoLink = data?.email_mailto ? `mailto:${data.email_mailto}` : null;

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        // Validación de captcha en cliente (el servidor también lo valida)
        if (parseInt(form.captchaAnswer, 10) !== captcha.a + captcha.b) {
            setStatus('error');
            setErrorMsg(language === 'es' ? 'Respuesta incorrecta. Inténtalo de nuevo.'
                : language === 'nl' ? 'Onjuist antwoord. Probeer opnieuw.'
                : 'Incorrect answer. Please try again.');
            setCaptcha(makeCaptcha());
            setForm((prev) => ({ ...prev, captchaAnswer: '' }));
            return;
        }

        setStatus('sending');
        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    captcha_a: captcha.a,
                    captcha_b: captcha.b,
                    captcha_answer: parseInt(form.captchaAnswer, 10),
                }),
            });

            if (res.ok) {
                setStatus('success');
                setForm({ name: '', email: '', message: '', captchaAnswer: '' });
                setCaptcha(makeCaptcha());
            } else {
                const body = await res.json().catch(() => ({}));
                setStatus('error');
                setErrorMsg(body.detail || 'Error sending message.');
                setCaptcha(makeCaptcha());
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg(language === 'es' ? 'Error de conexión. Inténtalo más tarde.'
                : language === 'nl' ? 'Verbindingsfout. Probeer later opnieuw.'
                : 'Connection error. Please try again later.');
        }
    };

    return (
        <Fragment>
            <Navbar hclass={'header-style-3'} Logo={Logo} />
            <PageTitle
                pageTitle={data?.page_title || 'Contact Us'}
                pagesub={data?.page_breadcrumb || 'Contact'}
                backgroundImage={data?.background_image}
            />

            <section className="contact-section section-padding">
                <div className="container">
                    <div className="section-title-s3" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        {data?.section_tag && <span>{data.section_tag}</span>}
                        {data?.section_title && <h2>{data.section_title}</h2>}
                        {data?.section_subtitle && <p>{data.section_subtitle}</p>}
                    </div>

                    <div className="row">
                        {/* Canales directos */}
                        <div className="col col-lg-5 col-12" style={{ marginBottom: '30px' }}>
                            <div className="contact-info" style={styles.infoBox}>
                                {mailtoLink && (
                                    <a href={mailtoLink} style={styles.channel}>
                                        <i className="ti-email" style={styles.channelIcon}></i>
                                        <span>{data.email_mailto}</span>
                                    </a>
                                )}
                                {whatsappLink && (
                                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={styles.channel}>
                                        <i className="ti-mobile" style={styles.channelIcon}></i>
                                        <span>WhatsApp</span>
                                    </a>
                                )}
                                {data?.phone && (
                                    <a href={`tel:${data.phone}`} style={styles.channel}>
                                        <i className="ti-headphone-alt" style={styles.channelIcon}></i>
                                        <span>{data.phone}</span>
                                    </a>
                                )}
                                {data?.linkedin_url && (
                                    <a href={data.linkedin_url} target="_blank" rel="noopener noreferrer" style={styles.channel}>
                                        <i className="ti-linkedin" style={styles.channelIcon}></i>
                                        <span>LinkedIn</span>
                                    </a>
                                )}
                                {data?.address && (
                                    <div style={styles.channel}>
                                        <i className="ti-location-pin" style={styles.channelIcon}></i>
                                        <span>{data.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Formulario */}
                        <div className="col col-lg-7 col-12">
                            {status === 'success' ? (
                                <div style={styles.successBox}>
                                    {data?.form_success || 'Thank you! Your message has been sent.'}
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    {status === 'error' && (
                                        <div style={styles.errorBox}>{errorMsg}</div>
                                    )}
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>{data?.form_name_label || 'Your Name'}</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            required
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>{data?.form_email_label || 'Your Email'}</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            required
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>{data?.form_message_label || 'Your Message'}</label>
                                        <textarea
                                            value={form.message}
                                            onChange={(e) => handleChange('message', e.target.value)}
                                            required
                                            rows={6}
                                            style={{ ...styles.input, resize: 'vertical' }}
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>
                                            {`${language === 'es' ? '¿Cuánto es' : language === 'nl' ? 'Hoeveel is' : 'How much is'} ${captcha.a} + ${captcha.b}?`}
                                        </label>
                                        <input
                                            type="number"
                                            value={form.captchaAnswer}
                                            onChange={(e) => handleChange('captchaAnswer', e.target.value)}
                                            required
                                            style={{ ...styles.input, maxWidth: '160px' }}
                                        />
                                    </div>
                                    <button type="submit" className="theme-btn" disabled={status === 'sending'} style={styles.submitBtn}>
                                        {status === 'sending'
                                            ? (language === 'es' ? 'Enviando...' : language === 'nl' ? 'Verzenden...' : 'Sending...')
                                            : (data?.form_button || 'Send Message')}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <Scrollbar />
        </Fragment>
    );
};

const styles = {
    infoBox: {
        backgroundColor: '#f8f7f4',
        padding: '30px',
        borderRadius: '8px',
        height: '100%',
    },
    channel: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 0',
        color: '#333',
        textDecoration: 'none',
        borderBottom: '1px solid #eee',
        fontSize: '15px',
    },
    channelIcon: {
        color: '#c19d56',
        fontSize: '20px',
        width: '24px',
    },
    formGroup: { marginBottom: '20px' },
    label: { display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' },
    input: {
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '15px',
        boxSizing: 'border-box',
    },
    submitBtn: { border: 'none', cursor: 'pointer' },
    successBox: {
        backgroundColor: '#efe',
        color: '#0a0',
        padding: '20px',
        borderRadius: '8px',
        fontSize: '16px',
        textAlign: 'center',
    },
    errorBox: {
        backgroundColor: '#fee',
        color: '#c00',
        padding: '12px 15px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
};

export default ContactPage;
