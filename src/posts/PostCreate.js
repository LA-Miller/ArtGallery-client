import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const PostCreate = (props) => {
  const [artistName, setArtistName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("");
  const [era, setEra] = useState("");
  const [forSale, setForSale] = useState(false);
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    imageUpload64();
    
    fetch("https://lam-art-gallery-server.herokuapp.com/art/create", {
      method: "POST",
      body: JSON.stringify({
        log: {
          artist_name: artistName,
          image: image,
          description: description,
          style: style,
          era: era,
          for_sale: forSale,
          price: price,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArtistName("");
        setImage("");
        setDescription("");
        setStyle("");
        setEra("");
        setForSale(false);
        setPrice("");
        props.fetchPosts();
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setImage({ ...image, [name]: value });
  };

  const imageUpload64 = (event) => {
    let img64 = "";
    getBase64(event.target.files[0], (result) => {
      img64 = result;
      console.log(result);
      setImage({ ...image, url: img64 });
    });
    function getBase64(file, cb) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    }
  };

  // const imageRender64 = (event) => {
  //     let decoded = base64decode(encoded)
  // }
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="artist_name">Artist Name</Label>
        <Input
          type="text"
          name="artist_name"
          id="artist_name"
          placeholder="Artist Name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="url">Image</Label>
        <Input
          accept="image/*"
          type="file"
          name="url"
          id="url"
          placeholder="https://www.example.com"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="style">Style</Label>
        <Input
          type="textarea"
          name="style"
          id="style"
          placeholder="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="era">Era</Label>
        <Input
          type="text"
          name="era"
          id="era"
          placeholder="Era"
          value={era}
          onChange={(e) => setEra(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="for_sale">For Sale</Label>
        <Input
          type="textarea"
          name="for_sale"
          id="for_sale"
          placeholder="For Sale"
          value={forSale}
          onChange={(e) => setForSale(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        <Input
          type="textarea"
          name="price"
          id="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormGroup>
      <Button type="submit">Submit Post</Button>
    </Form>
  );
};

export default PostCreate;
