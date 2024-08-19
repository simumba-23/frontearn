import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import { FaWhatsapp,FaInstagram,FaTwitter,FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://www.instagram.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={30} color="#25D366" />
              </a>
              <a href="https://www.facebook.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} color="#E4405F" />
              </a>
              <a href="https://wa.me" className="text-white me-3" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} color="#1DA1F2" />
              </a>
              <a href="https://www.twitter.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={30} color="#1DA1F2" />
              </a>
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/privacy&policy" className="text-white text-decorate-none">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="text-white">Terms of Use</Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="text-white">FAQs</Link>
              </li>
 
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} PayMe.io. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
