import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function PostCreate({artist_name,url,description,style,era, for_sale, price, token}) { 
  const [post, setPost] = useState({artist_name,url,description,style,era,for_sale,price});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false); //show all the fields may need to be removed

  const [base64String, setBase64String] = useState("");
  console.log(token);

  useEffect(() => {
    if (isSubmitting) {
      setIsSubmitting(false);
      console.log(isSubmitting);
      console.log(post);
      fetch("https://lam-art-gallery-server.herokuapp.com/art/create", {
        method: "POST",
        body: JSON.stringify({
          log: {
            artist_name: artist_name,
            url: base64String,
            description: description,
            style: style,
            era: era,
            for_sale: for_sale,
            price: price,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [isSubmitting]);

  useEffect(() => {
    console.log(base64String);
  }, [base64String]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const imageUpload64 = (event) => {
    //set post request to send image to
    let img64 = "";
    // getBase64(event.target.files[0], (result) => {
    //     img64 = result;
    //     console.log(result);
    //     setPost({ ...post, url: img64 });
    // });
    const file = document.getElementById("url").files[0];
    console.log(file);
    if (file) {
      //second if else statement to limit types of images, png, jpg, gif.
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64String(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    function getBase64(file, cb) {
      let reader = new FileReader();
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
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(post);
        setIsSubmitting(true);
      }}
    >
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
        <Label for="url">Url</Label>
        <Input
          accept="jpg, jpeg, png"
          type="file"
          name="url"
          id="url"
          placeholder="https://www.example.com"
          value={post.url}
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
          type="textarea"
          name="for_sale"
          id="for_sale"
          placeholder="For Sale"
          value={post.for_sale}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        <Input
          type="textarea"
          name="price"
          id="price"
          placeholder="Price"
          value={post.price}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}
