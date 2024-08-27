import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../AboutUs.css'; // Assuming you have a CSS file for additional custom styles
import Footer from '../components/Footer';
const AboutUs = () => {
  return (
    <>
    <section className="about-us py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="text-center">Welcome to PayMe.io</h2>
            <p className="lead text-center">
              At PayMe.io, we believe in rewarding you for your time and engagement. Our platform is designed to make every moment you spend here worth it—whether you're watching videos, listening to music, reading blogs, or exploring other exciting content.
            </p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={6}>
            <Card className="h-100 shadow-sm hover-shadow">
              <Card.Body>
                <Card.Title>Who We Are</Card.Title>
                <Card.Text>
                  We are a passionate team dedicated to creating a space where entertainment meets opportunity. Our mission is to provide you with engaging content while rewarding you for your participation. We understand that your time is valuable, and we want to make sure you get the most out of it.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm hover-shadow">
              <Card.Body>
                <Card.Title>What We Do</Card.Title>
                <Card.Text>
                  Our website is a unique platform that connects you with a wide variety of tasks—each one designed to entertain, educate, and reward you. From watching videos and listening to podcasts to taking surveys and more, there's always something new to discover and enjoy. And the best part? You earn points for every activity, which you can later convert into real money.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h3 className="text-center mb-3">Why Choose Us?</h3>
            <ul className="list-group">
              <li className="list-group-item bg-dark text-white shadow-sm hover-shadow">
                <strong>User-Focused:</strong> Everything we do is with you in mind. Our platform is user-friendly, easy to navigate, and offers a seamless experience.
              </li>
              <li className="list-group-item bg-dark text-white shadow-sm hover-shadow">
                <strong>Fair Rewards:</strong> We ensure that your efforts are fairly rewarded. Our conversion rates are designed to strike the perfect balance between being achievable and meaningful.
              </li>
              <li className="list-group-item bg-dark text-white shadow-sm hover-shadow">
                <strong>Continuous Growth:</strong> We're constantly expanding our content and features to give you more opportunities to earn and enjoy.
              </li>
              <li className="list-group-item bg-dark text-white shadow-sm hover-shadow">
                <strong>Security & Integrity:</strong> We take security seriously, ensuring that your data is safe, and our platform is free from fraudulent activities.
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Card className="bg-light text-dark shadow-sm hover-shadow">
              <Card.Body>
                <Card.Title>Our Vision</Card.Title>
                <Card.Text>
                  We envision a world where your online time is not just spent but invested. We aim to be the leading platform in providing high-quality content that pays you back, making PayMe.io your go-to destination for entertainment and rewards.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="bg-primary text-white text-center shadow-sm hover-shadow">
              <Card.Body>
                <Card.Title>Join Us on This Journey</Card.Title>
                <Card.Text>
                  We're excited to have you with us on this journey of entertainment and rewards. Whether you're here to explore, learn, or earn, we promise to make your experience enjoyable and fulfilling.
                </Card.Text>
                <p>Thank you for being a part of PayMe.io. We look forward to growing with you!</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </section>
      <Footer />
</>
  );
};

export default AboutUs;
