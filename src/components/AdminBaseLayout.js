import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';
import AuthContext from '../context/AuthContext';
import { NavDropdown } from 'react-bootstrap';

const BaseLayout = ({ title, children }) => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
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
            <NavLink className="nav-link px-3" onClick={logoutUser}>
              Sign out
            </NavLink>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Admin" activeClassName="active">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/AdminTransactions" activeClassName="active">
                    Transactions
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/AddTask" activeClassName="active">
                  Create Tasks
                  </NavLink>
                  </li>
                <li className="nav-item">
                  <NavDropdown title="Tasks" id="tasks-dropdown">
                    <NavDropdown.Item as={NavLink} to="/tasks" activeClassName="active">
                      All Tasks
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/Manage/video" activeClassName="active">
                      Video Tasks
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/Manage/Music" activeClassName="active">
                      Music Tasks
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/Manage/Ad" activeClassName="active">
                      Ad Tasks
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/Manage/Survey" activeClassName="active">
                      Article Tasks
                    </NavDropdown.Item>
                  </NavDropdown>
                </li>
                {/* <li className="nav-item">
                  <NavLink className="nav-link" to="/Customer-List" activeClassName="active">
                    Customers
                  </NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create" activeClassName="active">
                    Create Blogs
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"> */}
                  {/* <h4 className="h2">{title}</h4> */}
                {/* </div> */}
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
