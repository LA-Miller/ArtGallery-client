import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Card, ListGroup, ListGroupItem, CardImg, CardBody, CardTitle, CardText, CardLink,  } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import Sitebar from "../home/Navbar";
import PostCreate from "./PostCreate";
//import PostCreate from "./PostCreate";

const PostIndex = (props) => {
  const [art, setArt] = useState([]);

  const fetchPosts = () => {
    fetch("https://lam-art-gallery-server.herokuapp.com/art/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setArt(data);
      });
  };

  return (
    <div className="main">
      <div className="mainDiv">
        <PostCreate/>
        <Card style={{ width: "18rem" }}>
          <CardImg variant="top" src="holder.js/100px180?text=Image cap" />
          <CardBody>
            <CardTitle>Card Title</CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
          </CardBody>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Cras justo odio</ListGroupItem>
            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem>Vestibulum at eros</ListGroupItem>
          </ListGroup>
          <CardBody>
            <CardLink href="#">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PostIndex;
