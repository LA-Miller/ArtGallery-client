import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

export default function PostCreate({
  artist_name,
  url,
  description,
  style,
  era,
  for_sale,
  price,
}) {
  //exporting and setting to default namespace to PostCreate and destructuring the props object to create an object of the listed items
  const [post, setPost] = useState({
    artist_name,
    url,
    description,
    style,
    era,
    for_sale,
    price,
  }); //creating post state and setting the state to the post object
  const [isSubmitting, setIsSubmitting] = useState(false); //creating isSubmitting state and setting the state to the isSubmitting boolean
  const [base64String, setBase64String] = useState(""); //creating base64String state and setting the state to the base64String string
  const [isOpen, setIsOpen] = useState(false);

  //http://localhost:3333/art/create
  //https://lam-art-gallery-server.herokuapp.com/art/create
  useEffect(() => {
    console.log("ping");
    if (isSubmitting) {
      console.log("pong");
      console.log(post);
      fetch("http://localhost:3333/art/create", {
        method: "POST",
        body: JSON.stringify({ post }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ${localStorage.getItem('token')}
        },
      })
        .then((res) => res.json()) //returns a promise in json format
        .then((data) => {
          console.log(data);
          setIsSubmitting(false); //setting it back to false so it does not keep running
        })
        .catch((err) => {
          console.error(err);
          setIsSubmitting(false);
        });
    }
  }, [isSubmitting]); //setting the isSubmitting state to false when the form is submitted

  useEffect(() => {
    console.log(base64String);
  }, [base64String]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log({ ...post, [name]: value });
    setPost({ ...post, [name]: value });
  }; //setting the post state to the value of the input

  const imageUpload64 = (event) => {
    //set post request to send image to server
    const file = document.getElementById("url").files[0];
    console.log(file);
    if (file) {
      //second if else statement to limit types of images, png, jpg, gif.
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64String(e.target.result);
        setPost({ ...post, url: e.target.result });
        console.log(post, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button id="create-post-btn" onClick={() => toggle()}>
        Create A Post
      </Button>
      <Modal
        centered
        fullscreen="xl"
        scrollable
        size="xl"
        toggle={() => toggle()}
        isOpen={isOpen}
      >
        <ModalHeader closeButton>Add to the Gallery</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="artist_name">Artist Name</Label>
              <Input
                type="text"
                name="artist_name"
                id="artist_name"
                placeholder="Artist Name"
                value={post.artist_name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="url">Upload Your Art</Label>
              <Input
                accept="jpg, jpeg, png"
                type="file"
                name="url"
                id="url"
                placeholder="https://www.example.com"
                onChange={imageUpload64}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                value={post.description}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="style">Style</Label>
              <Input
                type="textarea"
                name="style"
                id="style"
                placeholder="Style"
                value={post.style}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="era">Era</Label>
              <Input
                type="text"
                name="era"
                id="era"
                placeholder="Era"
                value={post.era}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="for_sale">For Sale</Label>
              <Input
                type="checkbox"
                name="for_sale"
                id="for_sale"
                placeholder="For Sale"
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                value={post.price}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setIsSubmitting(true)}>
            Post Art To Gallery
          </Button>{" "}
          <Button variant="danger" onClick={() => toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
