import React, { useState } from "react";
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
      <NavbarBrand href="/">Art Gallery</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="m1-auto" navbar>
          <NavItem>
            <Button>Logout</Button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Sitebar;
