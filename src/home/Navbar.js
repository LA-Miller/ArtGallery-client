import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
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
import PostCreate from "../posts/PostCreate";
import PostIndex from "../posts/PostIndex";

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const createPost = () => {
    console.log("create");
    return(
      <PostCreate />
    )
  }

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
              <Button id="logout-btn" onClick={props.clickLogout}>
                Logout
              </Button>
            </NavItem>
          )}
          {!!localStorage.getItem("token") && (
            <NavItem className="create-post">
              <li>
                <Link to="/PostCreate">Create Art Post</Link>
              </li>
              <Switch>
                <Route exact path="/PostCreate"><PostCreate /></Route>
              </Switch>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Sitebar;
