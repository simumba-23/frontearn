import React from 'react';
import { Accordion } from 'react-bootstrap';
import { FaQuestionCircle, FaUser, FaCoins, FaGift, FaTasks, FaBug, FaShieldAlt } from 'react-icons/fa';
import BaseLayout from '../components/BaseLayout';

export const SupportFaqs = () => {
  return (
    <BaseLayout title='Frequently Asked Questions'>
     <div className="container my-3">
      {/* <h2 className="mb-4 text-center"></h2> */}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaUser className="mr-2" /> Account Management
          </Accordion.Header>
          <Accordion.Body>
            <h5>How do I create an account?</h5>
            <p>To create an account, click on the “Sign Up” button on the homepage...</p>
            <h5>How do I reset my password?</h5>
            <p>If you’ve forgotten your password, click on the “Forgot Password” link...</p>
            <h5>Can I change my email address after registration?</h5>
            <p>Yes, you can change your email address in the “Account Settings”...</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaCoins className="mr-2" /> Earning Points
          </Accordion.Header>
          <Accordion.Body>
            <h5>How do I earn points on the website?</h5>
            <p>You can earn points by completing various tasks...</p>
            <h5>Are there daily limits on how many points I can earn?</h5>
            <p>Yes, there may be daily limits on how many points you can earn...</p>
            <h5>Can I earn points by referring friends to the website?</h5>
            <p>Yes, you can earn bonus points by referring friends...</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaGift className="mr-2" /> Rewards & Withdrawals
          </Accordion.Header>
          <Accordion.Body>
            <h5>What is the minimum number of points needed to request a payout?</h5>
            <p>The minimum number of points required to request a payout is 2,100...</p>
            <h5>How do I request a payout?</h5>
            <p>Once you have accumulated the minimum number of points...</p>
            <h5>When will I receive my payout?</h5>
            <p>Payouts are processed every Saturday and Sunday...</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FaTasks className="mr-2" /> Tasks & Activities
          </Accordion.Header>
          <Accordion.Body>
            <h5>How do I know if a task is completed?</h5>
            <p>Once you’ve completed a task, you will receive a confirmation...</p>
            <h5>What happens if a video doesn’t play or I experience technical issues?</h5>
            <p>If you experience any technical issues while completing a task...</p>
            <h5>Can I complete the same task multiple times?</h5>
            <p>Some tasks can be repeated, while others are one-time only...</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <FaBug className="mr-2" /> Technical Issues
          </Accordion.Header>
          <Accordion.Body>
            <h5>Why is my account temporarily suspended?</h5>
            <p>Your account may be temporarily suspended if we detect suspicious activity...</p>
            <h5>The website is not loading properly. What should I do?</h5>
            <p>First, check your internet connection and try refreshing the page...</p>
            <h5>How can I report a bug or technical issue?</h5>
            <p>To report a bug, please use the “Contact Us” form on our website...</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <FaShieldAlt className="mr-2" /> Security & Privacy
          </Accordion.Header>
          <Accordion.Body>
            <h5>How does the website protect my personal information?</h5>
            <p>We take your privacy very seriously. Our website uses advanced encryption...</p>
            <h5>What should I do if I suspect someone is using my account without permission?</h5>
            <p>If you suspect unauthorized activity on your account, please change your password immediately...</p>
            <h5>Can I delete my account?</h5>
            <p>Yes, if you wish to delete your account, you can do so by contacting our support team...</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    
    </BaseLayout>
   
  );
};
