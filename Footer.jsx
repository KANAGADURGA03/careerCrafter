// Footer.js
import React from 'react';
import './Footer.css'; // Import CSS for styling

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} CareerCrafter. All Rights Reserved.</p>
            <p>Contact us at support@careercrafter.com</p>
        </footer>
    );
};

export default Footer;
