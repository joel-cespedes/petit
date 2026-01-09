import React from 'react';
import ContactForm from '../ContactFrom/ContactForm'


const ContactSection = ({ data }) => {

    return (
        <section className="contact-section">
            <div className="content-area">
                <div className="left-col">
                    <div className="contact-message">
                        <h4>{data?.contact_phone_message || ''}</h4>
                    </div>
                </div>
                <div className="right-col">
                    <div className="section-title-s2">
                        <span>{data?.contact_tag || ''}</span>
                        <h2>{data?.contact_title || ''}</h2>
                    </div>
                    <div className="contact-form">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )

}

export default ContactSection;
