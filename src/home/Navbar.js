import React, { useState } from "react";
import logo from '../assets/logo.svg'
import '../App.css';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
} from "reactstrap";

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  return (
    <Navbar color="faded" light expand="md">
      <NavbarBrand href="/">
        <img
          alt="Art Gallery Logo"
          src={logo}
          width="400"
          height="200"
         />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse className="moveToEnd"isOpen={isOpen} navbar>
        <Nav className="d-flex justify-content-end" navbar>
          <NavItem className="create">
            <Button id="create">Create Account</Button>
          </NavItem>
          <NavItem className="login">
            <Button variant="outline-success">Login</Button>
          </NavItem>
          <NavItem className="logout">
            <Button >Logout</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Sitebar;
