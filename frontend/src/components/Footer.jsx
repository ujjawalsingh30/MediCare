
import React from 'react'
import { footerStyles } from '../assets/dummyStyles';
import logo from '../assets/logo.png'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Stethoscope, Activity, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Doctors", href: "/doctors" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
        { name: "Appointments", href: "/appointments" },
    ];

    const services = [
        { name: "Blood Pressure Check", href: "/services" },
        { name: "Blood Sugar Test", href: "/services" },
        { name: "Full Blood Count", href: "/services" },
        { name: "X-Ray Scan", href: "/services" },
        { name: "Blood Sugar Test", href: "/services" },
    ];

    const socialLinks = [
        {
            Icon: Facebook,
            color: footerStyles.facebookColor,
            name: "Facebook",
            href: "",
        },
        {
            Icon: Twitter,
            color: footerStyles.twitterColor,
            name: "Twitter",
            href: "",
        },
        {
            Icon: Instagram,
            color: footerStyles.instagramColor,
            name: "Instagram",
            href: "",
        },
        {
            Icon: Linkedin,
            color: footerStyles.linkedinColor,
            name: "LinkedIn",
            href: "",
        },
        {
            Icon: Youtube,
            color: footerStyles.youtubeColor,
            name: "YouTube",
            href: "",
        },
    ];


    return (
        <footer className={footerStyles.footerContainer}>
            <div className={footerStyles.floatingIcon1}>
                <Stethoscope className={footerStyles.stethoscopeIcon} />
            </div>

            <div className={footerStyles.floatingIcon2} style={{
                animationDelay: "3s"
            }}>
                <Activity className={footerStyles.activityIcon} />
            </div>

            <div className={footerStyles.mainContent}>
                <div className={footerStyles.gridContainer}>
                    <div className={footerStyles.companySection}>
                        <div className={footerStyles.logoContainer}>
                            <div className={footerStyles.logoWrapper}>
                                <div className={footerStyles.logoImageContainer}>
                                    <img src={logo} alt="logo" className={footerStyles.logoImage} />

                                </div>
                            </div>

                            <div>
                                <h2 className={footerStyles.companyName}>
                                    MediCare
                                </h2>
                                <p className={footerStyles.companyTagline}>
                                    Healthcare Solution
                                </p>
                            </div>
                        </div>

                        <p className={footerStyles.companyDescription}>
                            Your trusted partner in healthcare innovation. We're committed to providing exceptional medical care with cutting-edge technology and compassionate service.
                        </p>
                        <div className={footerStyles.contactContainer}>
                            <div className={footerStyles.contactItem}>
                                <div className={footerStyles.contactIconWrapper}>
                                    <Phone className={footerStyles.contactIcon} />
                                </div>
                                <span className={footerStyles.contactText}>
                                    +91 85684268523
                                </span>
                            </div>


                            <div className={footerStyles.contactItem}>
                                <div className={footerStyles.contactIconWrapper}>
                                    <Mail className={footerStyles.contactIcon} />
                                </div>
                                <span className={footerStyles.contactText}>
                                    medicare@gmail.com
                                </span>
                            </div>


                            <div className={footerStyles.contactItem}>
                                <div className={footerStyles.contactIconWrapper}>
                                    <MapPin className={footerStyles.contactIcon} />
                                </div>
                                <span className={footerStyles.contactText}>
                                    Amritsar, India
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* quick Links */}

                </div>
            </div>
        </footer>
    )
}

export default Footer
