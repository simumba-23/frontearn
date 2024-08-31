import React from 'react';
import { Accordion } from 'react-bootstrap';
import { FaQuestionCircle, FaUser, FaCoins, FaGift, FaTasks, FaBug, FaShieldAlt } from 'react-icons/fa';
import Footer from './Footer';

export const Faqs = () => {
  return (
    <>
      <div className="container my-5">
        <h2 className="mb-4 text-center">Frequently Asked Questions</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <FaUser className="mr-2" /> Account Management
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="0-0">
                  <Accordion.Header>How do I create an account?</Accordion.Header>
                  <Accordion.Body>
                    To create an account, click on the “Sign Up” button on the homepage, fill in your details such as name, email, and password, and then follow the instructions to complete the registration process. You’ll receive a confirmation email with a link to activate your account.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="0-1">
                  <Accordion.Header>How do I reset my password?</Accordion.Header>
                  <Accordion.Body>
                    If you’ve forgotten your password, click on the “Forgot Password” link on the login page. Enter your registered email address, and we’ll send you a link to reset your password.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="0-2">
                  <Accordion.Header>Can I change my email address after registration?</Accordion.Header>
                  <Accordion.Body>
                    Yes, you can change your email address in the “Account Settings” section of your profile. Simply go to the settings, update your email address, and confirm the change via the confirmation email sent to your new address.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <FaCoins className="mr-2" /> Earning Points
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="1-0">
                  <Accordion.Header>How do I earn points on the website?</Accordion.Header>
                  <Accordion.Body>
                    You can earn points by completing various tasks such as watching videos, listening to music, reading blogs, taking quizzes, and more. The number of points you earn depends on the specific task.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1-1">
                  <Accordion.Header>Are there daily limits on how many points I can earn?</Accordion.Header>
                  <Accordion.Body>
                    Yes, there may be daily limits on how many points you can earn from certain activities. These limits are set to ensure fair use and may vary depending on the task.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1-2">
                  <Accordion.Header>Can I earn points by referring friends to the website?</Accordion.Header>
                  <Accordion.Body>
                    Yes, you can earn bonus points by referring friends. When your friend signs up using your referral link and completes their first task, you’ll receive additional points.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <FaGift className="mr-2" /> Rewards & Withdrawals
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="2-0">
                  <Accordion.Header>What is the minimum number of points needed to request a payout?</Accordion.Header>
                  <Accordion.Body>
                    The minimum number of points required to request a payout is 2,100 points, which is equivalent to $5 USD.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2-1">
                  <Accordion.Header>How do I request a payout?</Accordion.Header>
                  <Accordion.Body>
                    Once you have accumulated the minimum number of points, go to the “Rewards” section of your account and select “Request Payout.” Follow the instructions to complete your withdrawal request.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2-2">
                  <Accordion.Header>When will I receive my payout?</Accordion.Header>
                  <Accordion.Body>
                    Payouts are processed every Saturday and Sunday. You must request your payout by Friday to be included in the weekend’s batch. Please note that there are limited slots each week, so not all requests may be processed immediately.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <FaTasks className="mr-2" /> Tasks & Activities
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="3-0">
                  <Accordion.Header>How do I know if a task is completed?</Accordion.Header>
                  <Accordion.Body>
                    Once you’ve completed a task, you will receive a confirmation message on the screen, and the points will be automatically credited to your account. You can also check your activity history for a detailed record of completed tasks.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3-1">
                  <Accordion.Header>What happens if a video doesn’t play or I experience technical issues?</Accordion.Header>
                  <Accordion.Body>
                    If you experience any technical issues while completing a task, try refreshing the page or clearing your browser cache. If the problem persists, please contact our support team for assistance.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3-2">
                  <Accordion.Header>Can I complete the same task multiple times?</Accordion.Header>
                  <Accordion.Body>
                    Some tasks can be repeated, while others are one-time only. Check the task description for details. Points may only be awarded once per task unless otherwise specified.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <FaBug className="mr-2" /> Technical Issues
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="4-0">
                  <Accordion.Header>Why is my account temporarily suspended?</Accordion.Header>
                  <Accordion.Body>
                    Your account may be temporarily suspended if we detect suspicious activity or if you violate our terms of service. Please contact support for more information on why your account was suspended.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4-1">
                  <Accordion.Header>The website is not loading properly. What should I do?</Accordion.Header>
                  <Accordion.Body>
                    First, check your internet connection and try refreshing the page. If the issue persists, try accessing the site from a different browser or device. You can also clear your browser’s cache and cookies. If none of these solutions work, please reach out to our technical support team.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4-2">
                  <Accordion.Header>How can I report a bug or technical issue?</Accordion.Header>
                  <Accordion.Body>
                    To report a bug, please use the “Contact Us” form on our website. Provide as much detail as possible, including screenshots if available, so our team can address the issue promptly.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <FaShieldAlt className="mr-2" /> Security & Privacy
            </Accordion.Header>
            <Accordion.Body>
              <Accordion>
                <Accordion.Item eventKey="5-0">
                  <Accordion.Header>How does the website protect my personal information?</Accordion.Header>
                  <Accordion.Body>
                    We take your privacy very seriously. Our website uses advanced encryption protocols to protect your personal information. We also have strict data protection policies in place and never share your information with third parties without your consent.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5-1">
                  <Accordion.Header>What should I do if I suspect someone is using my account without permission?</Accordion.Header>
                  <Accordion.Body>
                    If you suspect unauthorized activity on your account, please change your password immediately and contact our support team. We will investigate the issue and take necessary action to secure your account.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5-2">
                  <Accordion.Header>Can I delete my account?</Accordion.Header>
                  <Accordion.Body>
                    Yes, if you wish to delete your account, you can do so by contacting our support team. Please note that once your account is deleted, all your data, including points and rewards, will be permanently removed.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <Footer />
    </>
  );
};
