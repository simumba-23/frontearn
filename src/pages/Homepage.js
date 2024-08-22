import React from 'react';
import Layout from '../components/Layout';
import { Link, NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import TopNavbar from '../components/TobNavbar';
import WhyJoin from './WhyJoinUs';
import StepsSection from './StepSections';
import { Row,Container,Col } from 'react-bootstrap';

const Homepage = () => {
  return (
    <>
      <Layout title="PayMe.io | Home" content="Home Page" />
      
      <div className="homepage">
        
        <header className="header">
          <>
          <TopNavbar />
        
          <section className="hero  text-white py-5">
      <Container>
        <Row className="align-items-center text-center">
          <Col md={12}>
            <h1 className="display-4 mb-4">
              Earn Money By <br />
              <span className="hero-highlight">Doing what You Love</span>
            </h1>
            <p className="lead">
              Get paid for spending time on our website, taking surveys, listening to music, podcasts, and more.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
          </>
        </header>
        <main>
          <StepsSection />
          <WhyJoin />
          
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Homepage;
