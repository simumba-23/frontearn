import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "../App.css"
const TopNavbar = () => {
  return (
    <Navbar expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Pay<span>Me</span>.io
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/testmonial">
              Testimonial
            </Nav.Link>
            <Nav.Link as={Link} to="/aboutus">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/blogs">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/Login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/Register">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
