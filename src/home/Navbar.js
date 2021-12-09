import React, { useState } from "react";
import logo from "../assets/logo.svg";
import "../App.css";
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
      <NavbarBrand id="logo" className="text-center" href="/">
        <img alt="Art Gallery Logo" src={logo} width="400" height="200" />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse className="moveToEnd" isOpen={isOpen} navbar>
        <Nav className="nav">
          {!!localStorage.getItem("token") && (
            <NavItem className="logout">
              <Button id="logout-btn" onClick={props.clickLogout}>Logout</Button>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Sitebar;
