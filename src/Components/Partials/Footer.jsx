import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h3 className="footer-title">About Us</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="footer-column">
                    <h3 className="footer-title">Services</h3>
                    <ul>
                        <li><a href="#" className="footer-link">Service 1</a></li>
                        <li><a href="#" className="footer-link">Service 2</a></li>
                        <li><a href="#" className="footer-link">Service 3</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-title">Contact Us</h3>
                    <ul>
                        <li><a href="#" className="footer-link">Email</a></li>
                        <li><a href="#" className="footer-link">Phone</a></li>
                        <li><a href="#" className="footer-link">Address</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
