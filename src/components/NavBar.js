import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth";

const NavBar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logout());
    };

    const authLinks = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                </NavLink>
            </li>
            <li className="nav-item">
                <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    Logout
                </span>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                    Login
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                    Register
                </NavLink>
            </li>
        </>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    EARN BY APP
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            {isAuthenticated ? authLinks : guestLinks}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
