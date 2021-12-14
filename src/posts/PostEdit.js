import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

const PostEdit = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUserPosts = async () => {
    const response = await fetch(`http://localhost:3333/art/user`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => {
        const body = res.json();
        return body;
      })
      .then((data) => {
        setData(data);
        console.log("data:", data);
      });

    return response;
  };

  const deletePost = (post) => {
    console.log("posts", post)
    fetch(`http://localhost:3333/art/${post.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      })
    })
    .then(() => getUserPosts())
  };

  useEffect(async () => {
    if (data.length < 1) {
      const myResults = await getUserPosts();
    }
  }, [data]);

  const renderCard = (card, index) => {
    return (
      <Container>
        <Row>
          <Col md="2"></Col>
          <Col md="8">
            <Card
              style={{ width: "100", height: "100", margin: "20px" }}
              key={index}
              className="box"
            >
              <CardImg variant="top" src={data[index].url} />
              <CardBody>
                <CardTitle></CardTitle>
                <CardText></CardText>
              </CardBody>
              <ListGroup className="list-group-flush">
                <ListGroupItem>By: {data[index].artist_name}</ListGroupItem>
                <ListGroupItem>
                  Description: <br /> {data[index].description} <br /> Style:{" "}
                  {data[index].style} <br /> Era: {data[index].era}
                </ListGroupItem>
                <ListGroupItem>
                  For Sale: {!data[index].forSale ? "Yes" : "No"} <br /> Price:
                  ${data[index].price}
                </ListGroupItem>
              </ListGroup>
              <Button variant="danger" onClick={deletePost}>Delete</Button>
            </Card>
          </Col>
          <Col md="2"></Col>
        </Row>
      </Container>
    );
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button id="edit-post-btn" onClick={() => toggle()}>
        Edit Your Posts
      </Button>
      <Modal
        centered
        fullscreen="xl"
        scrollable
        size="xl"
        toggle={() => toggle()}
        isOpen={isOpen}
      >
        <ModalHeader>Your Posts</ModalHeader>
        <ModalBody>
          <div>{data.map(renderCard)}</div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              setIsSubmitting(true);
              setIsOpen(false);
            }}
          >
            Post Art To Gallery
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => {
              setIsSubmitting(true);
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PostEdit;
