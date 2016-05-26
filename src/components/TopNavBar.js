import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default function TopNavbar({ title }) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">{title}</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#">ava</NavItem>
          <NavItem eventKey={2} href="#">babel</NavItem>
          <NavItem eventKey={3} href="#">eslint</NavItem>
          <NavItem eventKey={4} href="#">karma</NavItem>
          <NavItem eventKey={5} href="#">webpack</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

TopNavbar.propTypes = {
  title: PropTypes.string.isRequired,
};
