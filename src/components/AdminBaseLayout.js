import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Tooltip, OverlayTrigger, Image } from 'react-bootstrap';
import { FaHome, FaLink, FaVideo, FaGift, FaMusic, FaTasks, FaWallet, FaLockOpen, FaMoneyBillWave, FaCog, FaQuestionCircle, FaPhone, FaCommentsDollar, FaSignOutAlt, FaBell, FaEnvelope, FaBlog, FaList } from 'react-icons/fa';
import { FcSurvey } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { MdPayment } from "react-icons/md";
import { FaTag, FaUsers } from "react-icons/fa6";
import { WiMoonAltWaningCrescent3 } from "react-icons/wi";
import AuthContext from '../context/AuthContext';
import { IoDocumentText } from "react-icons/io5";
import userProfile from '../Assets/userProfile.jpg';
import { MdMonetizationOn } from "react-icons/md";
import '../App.css';
import '../SideBar.css'


const BaseLayout = ({ children, title }) => {
  const [profileData, setProfileData] = useState(null);
  const { user, logoutUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    console.log('Sidebar toggle clicked'); // Debugging log
    setIsSidebarOpen(!isSidebarOpen);
  };

  const profileImage = userProfile;

  return (
    <>
      {user && (
        <>
          <header className="navbar navbar-dark sticky-top dash-header flex-md-nowrap p-2 shadow">
            <div className="d-flex align-items-center">
              <button
                className="navbar-toggler d-md-none"
                type="button"
                onClick={toggleSidebar}
                aria-controls="sidebarMenu"
                aria-expanded={isSidebarOpen}
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="">
                Pay<span>Me</span>.io
              </Link>
            </div>
            <div className="navbar-nav flex-row flex-grow-1 justify-content-end">
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="message-tooltip">Messages</Tooltip>}>
                <Nav.Link as={Link} to="/messages" className="nav-icon">
                  <FaEnvelope />
                </Nav.Link>
              </OverlayTrigger>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="notification-tooltip">Notifications</Tooltip>}>
                <Nav.Link as={Link} to="/notifications" className="nav-icon mx-3">
                  <FaBell />
                </Nav.Link>
              </OverlayTrigger>
              <NavDropdown align="end" title={<Image src={profileImage} roundedCircle width="30" height="30" alt="Profile" />} id="profile-dropdown">
                <NavDropdown.Item as={NavLink} to="/account_profile"><CgProfile className="me-2" /> Profile</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/account_settings"><FaCog className="me-2" /> Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutUser}><FaSignOutAlt className="me-2" /> Sign out</NavDropdown.Item>
              </NavDropdown>
            </div>
          </header>

          <Container fluid>
            <div className="row">
              <nav
                id="sidebarMenu"
                className={`col-md-3 col-lg-2 d-md-block bg-light sidebar ${isSidebarOpen ? 'show' : ''}`} // Add styles for the 'show' class
              >
                <div className="position-sticky pt-3">
                  <Nav className="flex-column">
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="admin-tooltip">Go to Dashboard</Tooltip>}
                    >
                      <Nav.Link as={NavLink} to="/AdminInfo" activeClassName="active">
                        <FaHome className="me-2" /> Home
                      </Nav.Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="users-tooltip">Manage Users</Tooltip>}
                    >
                      <Nav.Link as={NavLink} to="/users_list" activeClassName="active">
                        <FaUsers className='me-2' /> Users
                      </Nav.Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Tasks-tooltip">View and Manage Contents</Tooltip>}
                    >
                      <NavDropdown
                        title={
                          <>
                            <FaTasks className="me-2" /> Contents
                          </>
                        }
                        id="tasks-dropdown"
                      >
                        <NavDropdown.Item
                          as={NavLink}
                          to="/Manage/Video"
                          activeClassName="active"
                        >
                          <FaVideo className="me-2" /> Videos
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={NavLink}
                          to="/Manage/Music"
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
                        <NavDropdown.Item
                          as={NavLink}
                          to="/create"
                          activeClassName="active"
                        >
                          <FaBlog className="me-2" /> Blog
                        </NavDropdown.Item>
                      </NavDropdown>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Rewards-tooltip">Manage Rewards</Tooltip>}
                    >
                      <Nav.Link as={NavLink} to="/create_rewards" activeClassName="active">
                        <FaGift className="me-2" /> Rewards
                      </Nav.Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Rewards-tooltip">Add Task and Category </Tooltip>}
                    >
                      <Nav.Link as={NavLink} to="/category" activeClassName="active">
                        <FaList className="me-2" /> Category 
                      </Nav.Link>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Rewards-tooltip">Add Tag </Tooltip>}
                    >
                      <Nav.Link as={NavLink} to="/tags" activeClassName="active">
                        <FaTag className="me-2" />Tag
                      </Nav.Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Pay-tooltip">Manage Payment</Tooltip>}
                    >
                      <Nav.Link as={NavLink} to="/payment" activeClassName="active">
                        <FaWallet className="me-2" /> Payment
                      </Nav.Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="Rewards-tooltip">Manage Revenue</Tooltip>}
                    >
                      <Nav.Link as={NavLink} to="#" activeClassName="active">
                        <MdMonetizationOn className='me-2' /> Revenue
                      </Nav.Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip id="toggle-tooltip">Switch Mode</Tooltip>}
                    >
                      <Nav.Link onClick={toggleMode}>
                        <WiMoonAltWaningCrescent3 className="me-2" /> {darkMode ? 'Light Mode' : 'Dark Mode'}
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
