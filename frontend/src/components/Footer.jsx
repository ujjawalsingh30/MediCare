import React from 'react'
import { footerStyles } from '../assets/dummyStyles';
import logo from '../assets/logo.png'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

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
            Icon: <Linkedin></Linkedin>,
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
        <div>

        </div>
    )
}

export default Footer
