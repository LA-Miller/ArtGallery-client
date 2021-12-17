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
  Form,
  Input,
} from "reactstrap";

const PostEdit = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [artistName, setNewArtistName] = useState(data.artist_name);
  const [url, setEditUrl] = useState(data.url);
  const [newDescription, setNewDescription] = useState(data.description);
  const [newStyle, setNewStyle] = useState(data.style);
  const [newEra, setNewEra] = useState(data.era);
  const [newForSale, setNewForSale] = useState(data.for_sale);
  const [newPrice, setNewPrice] = useState(data.price);
  const [editMode, setEditMode] = useState(false);

  const artPostUpdate = (postId, e) => {
    // console.log(postId);
    // console.log(artistName);
    console.log(newForSale);
    console.log(newPrice);
    console.log({
      artist_name: artistName,
      url: url,
      description: newDescription,
      style: newStyle,
      era: newEra,
      for_sale: newForSale,
      price: newPrice,
    });
    fetch(`http://localhost:3333/art/update/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        artist_name: artistName,
        url: url,
        description: newDescription,
        style: newStyle,
        era: newEra,
        for_sale: newForSale,
        price: newPrice,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((json) => console.log(json))
      .then(() => getUserPosts())
      .catch((err) => console.log(err));
  };

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
        // console.log("data:", data);
      });

    return response;
  };

  const deletePost = (postId) => {
    console.log(postId);
    console.log("Post deleted");
    fetch(`http://localhost:3333/art/${postId}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    }).then(() => getUserPosts());
  };

  useEffect(async () => {
    if (data.length < 1) {
      const myResults = await getUserPosts();
    }
  }, []);

  // const handleCheckChange = () => {
  //   this.setState({ checked: event.target.checked})

  // }

  const renderCard = (card, index) => {
    // setPostToUpdate(card);
    // console.log(postToUpdate);
    // console.log(card);
    // console.log("data", data);
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
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  By:
                  <Input
                    onChange={(e) => setNewArtistName(e.target.value)}
                    contentEditable={editMode}
                    placeholder={data[index].artist_name}
                    value={card.artistName}
                  >
                    {data[index].artist_name}
                  </Input>
                </ListGroupItem>
                <ListGroupItem>
                  Description:
                  <Input
                    onChange={(e) => setNewDescription(e.target.value)}
                    contentEditable={editMode}
                    placeholder={data[index].description}
                    value={card.newDescription}
                  >
                    {data[index].description}
                  </Input>
                  Style:
                  <Input
                    onChange={(e) => setNewStyle(e.target.value)}
                    contentEditable={editMode}
                    placeholder={data[index].style}
                    value={card.newStyle}
                  >
                    {data[index].style}
                  </Input>
                  Era:
                  <Input
                    onChange={(e) => setNewEra(e.target.value)}
                    contentEditable={editMode}
                    placeholder={data[index].era}
                    value={card.newEra}
                  >
                    {data[index].era}
                  </Input>
                </ListGroupItem>
                <ListGroupItem>
                  <h5>For Sale:</h5>
                  <Input
                    type="checkbox"
                    defaultChecked={ card.newForSale ?? data[index].for_sale } 
                    onChange={(e) => {console.log(e.target.value) ; setNewForSale(e.target.checked)}}
                    contentEditable={editMode}
                    placeholder={data[index].for_sale}
                    //value={true}
                  >
                    {/* {!data[index].for_sale ? "yes" : "no"} */}
                  </Input>
                  <br />
                  Price:
                  <Input
                    type="number"
                    min="1"
                    onChange={(e) => setNewPrice(e.target.value)}
                    contentEditable={editMode}
                    placeholder={data[index].price}
                    value={card.newPrice}
                  >
                  </Input>
                </ListGroupItem>
              </ListGroup>
              <div id="edit-card-buttons">
                <Button
                  id="update-post-btn"
                  onClick={() => artPostUpdate(card?.id)}
                >
                  Update Post
                </Button>
                <Button
                  style={{ backgroundColor: "red" }}
                  id="delete-btn"
                  onClick={() => deletePost(card?.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
          <Col md="2"></Col>
        </Row>
      </Container>
    );
  };

  const toggle = () => {
    setIsOpen(!isOpen);
    setEditMode(!editMode);
    console.log(editMode);
    console.log(isOpen);
  };

  return (
    <div>
      <Button id="edit-post-btn" onClick={() => toggle()}>
        Edit Posts
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
            variant="danger"
            id="close-edit-btn"
            onClick={() => {
              setIsSubmitting(true);
              setIsOpen(false);
              setEditMode(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PostEdit;
