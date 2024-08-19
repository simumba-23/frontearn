import React from 'react';
import Layout from '../components/Layout';
import { Link, NavLink } from 'react-router-dom';
import Footer from '../components/Footer';
import TopNavbar from '../components/TobNavbar';

const Homepage = () => {
  return (
    <>
      <Layout title="PayMe.io | Home" content="Home Page" />
      
      <div className="homepage">
        
        <header className="header">
          <>
          <TopNavbar />
        
            <div className="hero">
              <h1>
                Earn Money By <br /> <span>Doing what You Love</span>
              </h1>
              <p>
                Get paid for spending time on our website, taking surveys, listening to music, podcasts, and more.
              </p>
            </div>
          </>
        </header>
        <main>
          <section className="steps">
            <div className="container">
              <h2>It's Just Three Steps</h2>
              <h3>How You Start?</h3>
              <div className="row">
                <div className="col-md-4 step">
                  <img src="https://via.placeholder.com/150" alt="Create an Account" />
                  <p>Create an Account</p>
                  <div className="step-number">1</div>
                </div>
                <div className="col-md-4 step">
                  <img src="https://via.placeholder.com/150" alt="Complete Your Tasks" />
                  <p>Complete Tasks</p>
                  <div className="step-number">2</div>
                </div>
                <div className="col-md-4 step">
                  <img src="https://via.placeholder.com/150" alt="Earn Money" />
                  <p>Earn Rewards</p>
                  <div className="step-number">3</div>
                </div>
              </div>
            </div>
          </section>
          <section className="why-join">
            <div className="container">
              <h2>Earn Extra Money</h2>
              <h3>Why Join Us?</h3>
              <div className="row">
                <div className="col-md-4 join-item">
                  <i className="icon-placeholder"></i>
                  <p>What is PayMe.io?</p>
                </div>
                <div className="col-md-4 join-item">
                  <i className="icon-placeholder"></i>
                  <p>How and how much do I earn?</p>
                </div>
                <div className="col-md-4 join-item">
                  <i className="icon-placeholder"></i>
                  <p>20% Referral Bonus</p>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Homepage;
