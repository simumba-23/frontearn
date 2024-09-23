import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0 ">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="https://wa.me/your_number" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={30} />
              </a>
              <a href="https://www.instagram.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} />
              </a>
              <a href="https://twitter.com" className="text-white me-3" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={30} />
              </a>
              <a href="https://www.facebook.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={30} />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark p-0">
                <Link to="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark p-0">
                <Link to="/terms-of-use" className="text-white text-decoration-none">Terms of Use</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark p-0">
                <Link to="/faqs" className="text-white text-decoration-none">FAQs</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark p-0">
                <Link to="/AdminRegister" className="text-white text-decoration-none">Admin</Link>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark p-0">
                <Link to="/" className="text-white text-decoration-none">Home</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark p-0">
                <Link to="/aboutus" className="text-white text-decoration-none">About Us</Link>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark p-0">
                <Link to="/feedback" className="text-white text-decoration-none">Feedback</Link>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item className="bg-dark p-0">
                <Link to="/contactus" className="text-white text-decoration-none">Contact Us</Link>
              </ListGroup.Item>
          </Col>
        </Row>
        <div className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} PayMe.io. All Rights Reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
