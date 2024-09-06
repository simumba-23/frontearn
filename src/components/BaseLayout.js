import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Tooltip, OverlayTrigger, Image } from 'react-bootstrap';
import { FaHome, FaLink, FaVideo, FaGift, FaMusic, FaUserFriends, FaTasks, FaLockOpen, FaMoneyBillWave, FaCog, FaQuestionCircle, FaPhone, FaCommentsDollar, FaSignOutAlt, FaBell, FaEnvelope } from 'react-icons/fa';
import { FcSurvey } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { MdPayment } from "react-icons/md";
import { WiMoonAltWaningCrescent3 } from "react-icons/wi";
import AuthContext from '../context/AuthContext';
import userProfile from '../Assets/userProfile.jpg'

import '../App.css';

const BaseLayout = ({ children, title }) => {
  const [profileData, setProfileData] = useState(null);

  const { user, logoutUser } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar toggle

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'enabled') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };
  const profileImage =  userProfile; 
  return (
    <>
      {user && (
        <>
          <header className="navbar navbar-dark sticky-top dash-header flex-md-nowrap p-2 shadow">
            <div className="d-flex align-items-center">
              <button
                className="navbar-toggler d-md-none"
                type="button"
                onClick={toggleSidebar} // Attach the toggle function
                aria-controls="sidebarMenu"
                aria-expanded={isSidebarOpen} // Update aria-expanded based on state
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="">
                Pay<span>Me</span>.io
              </Link>
            </div>
            <div className="navbar-nav flex-row flex-grow-1 justify-content-end">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="message-tooltip">Messages</Tooltip>}
              >
                <Nav.Link as={Link} to="/messages" className="nav-icon">
                  <FaEnvelope />
                </Nav.Link>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="notification-tooltip">Notifications</Tooltip>}
              >
                <Nav.Link as={Link} to="/notifications" className="nav-icon mx-3">
                  <FaBell />
                </Nav.Link>
              </OverlayTrigger>
              <NavDropdown
                align="end"
                title={
                  <Image
                    src={profileImage}
                    roundedCircle
                    width="30"
                    height="30"
                    alt="Profile"
                  />
                }
                id="profile-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/profile">
                  <CgProfile className="me-2" /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/settings">
                  <FaCog className="me-2" /> Settings
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutUser}>
                  <FaSignOutAlt className="me-2" /> Sign out
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </header>

          <Container fluid>
            <div className="row">
              <nav
                id="sidebarMenu"
                className={`col-md-3 col-lg-2 d-md-block bg-light sidebar collapse ${isSidebarOpen ? 'show' : ''}`} // Conditionally apply 'show' class
              >
                <div className="position-sticky pt-3">
                  <Nav className="flex-column">
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="home-tooltip">Go to Dashboard</Tooltip>}
                    >
                      <Nav.Link as={NavLink} to="/Customer" activeClassName="active">
                        <FaHome className="me-2" /> Home
                      </Nav.Link>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Tasks-tooltip">View and Start Tasks</Tooltip>}
                    >
                      <NavDropdown
                        title={
                          <>
                            <FaTasks className="me-2" /> Tasks
                          </>
                        }
                        id="tasks-dropdown"
                      >
                        <NavDropdown.Item
                          as={NavLink}
                          to="/tasks/video"
                          activeClassName="active"
                        >
                          <FaVideo className="me-2" /> Videos
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={NavLink}
                          to="/tasks/music"
                          activeClassName="active"
                        >
                          <FaMusic className="me-2" /> Music
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={NavLink}
                          to="/tasks/survey"
                          activeClassName="active"
                        >
                          <FcSurvey className="me-2" /> Surveys
                        </NavDropdown.Item>
                      </NavDropdown>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Rewards-tooltip">Check Your Rewards</Tooltip>}
                    >
                      <Nav.Link as={NavLink} to="/TransactionSummary" activeClassName="active">
                        <FaGift className="me-2" /> Rewards
                      </Nav.Link>
                    </OverlayTrigger>
                    
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Refferal-tooltip">Refer Friends and Earn More</Tooltip>}
                    >
                      <NavDropdown title={<><FaLink className="me-2" /> Refferals </>} id="Settings-dropdown">
                      
                        <NavDropdown.Item as={NavLink} to="/referrals">
                        <FaUserFriends className='me-2' />Invites Friends
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/ReferralEarnings">
                        <FaGift className='me-2' />Refferal Earnings
                        </NavDropdown.Item>
                      </NavDropdown>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Rewards-tooltip">Manage Your Account</Tooltip>}
                    >
                      <NavDropdown title={<><FaCog className="me-2" /> Accounts</>} id="Settings-dropdown">
                        <NavDropdown.Item as={NavLink} to="/profile" activeClassName="active">
                        <CgProfile /> Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/settings">
                          <FaCog className="me-2" /> Security
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/payments">
                        <MdPayment className='me-2' /> Payments
                        </NavDropdown.Item>
                      </NavDropdown>
                    </OverlayTrigger>


                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="supports-tooltip">Get Help and Support</Tooltip>}
                    >
                      <NavDropdown title={<><FaQuestionCircle className="me-2" /> Supports</>} id="Settings-dropdown">
                        <NavDropdown.Item as={NavLink} to="/support/faqs" activeClassName="active">
                          <FaQuestionCircle className="me-2" /> FAQS
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/support/contactform">
                          <FaPhone className="me-2" /> Contact Us
                        </NavDropdown.Item>
                      </NavDropdown>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="toggle-tooltip">Switch Mode</Tooltip>}
                    >
                      <Nav.Link onClick={toggleMode} className="nav-link">
                        <WiMoonAltWaningCrescent3 className='me-2' />
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                      </Nav.Link>
                    </OverlayTrigger>
                  </Nav>
                </div>
              </nav>
              <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">{title}</h1>
                </div>
                {children}
              </main>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default BaseLayout;
