import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const ContactPage = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h2">Direct Contact</Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <h5><FaEnvelope /> Support Email</h5>
              <p>support@example.com</p>
            </Col>
            <Col md={6}>
              <h5><FaPhone /> Support Phone Number</h5>
              <p>+123-456-7890</p>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <h5><FaClock /> Business Hours</h5>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            </Col>
            <Col md={6}>
              <h5><FaMapMarkerAlt /> Physical Address</h5>
              <p>123 Main Street, City, Country</p>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h5>Connect with us on Social Media</h5>
              <p>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /> Facebook</a><br />
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a><br />
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
