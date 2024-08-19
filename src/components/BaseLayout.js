import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import '../App.css';

const BaseLayout = ({ children, title }) => {
  const { user, logoutUser } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <>
      {user && (
        <>
          <header className="navbar navbar-dark sticky-top dash-header flex-md-nowrap p-2 shadow">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="">
              Pay<span>Me</span>.io
            </Link>
            <button
              className="navbar-toggler position-absolute d-md-none collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-nav">
              <div className="nav-item text-nowrap">
                <Link className="nav-link px-3" onClick={logoutUser}>
                  Sign out
                </Link>
              </div>
            </div>
          </header>

          <Container fluid>
            <div className="row">
              <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                  <Nav className="flex-column">
                    <Nav.Link as={NavLink} to="/Customer" activeClassName="active">
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/TransactionSummary" activeClassName="active">
                      Transactions
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/withdraw/form" activeClassName="active">
                      Cash Withdraw
                    </Nav.Link>
                    <NavDropdown title="Tasks" id="tasks-dropdown">
                      <NavDropdown.Item as={NavLink} to="/tasks" activeClassName="active">All Tasks</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/tasks/video" activeClassName="active">Video Tasks</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/tasks/Music" activeClassName="active">Music Tasks</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/tasks/Ad" activeClassName="active">Ad Tasks</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/tasks/article" activeClassName="active">Article Tasks</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Settings" id="Settings-dropdown">
                      <NavDropdown.Item as={NavLink} to="/tasks" activeClassName="active">Change Language</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="#" onClick={toggleMode}>
                        Change Mode
                      </NavDropdown.Item>
                    </NavDropdown>
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
