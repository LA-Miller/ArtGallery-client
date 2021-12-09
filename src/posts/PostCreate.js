import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function PostCreate({ artist_name, url, description, style, era, for_sale, price, owner_id }) {//exporting and setting to default namespace to PostCreate and destructuring the props object to create an object of the listed items
    const [post, setPost] = useState({ artist_name, url, description, style, era, for_sale, price, owner_id });//creating post state and setting the state to the post object
    const [isSubmitting, setIsSubmitting] = useState(false);//creating isSubmitting state and setting the state to the isSubmitting boolean
    const [base64String, setBase64String] = useState('');//creating base64String state and setting the state to the base64String string


    useEffect(() => {
        console.log('ping')
        if (isSubmitting) {
            console.log('pong')
            console.log(post);
            fetch("https://lam-art-gallery-server.herokuapp.com/art/create", {
                method: 'POST',
                body: JSON.stringify({ post }),
                headers: ({
                    'Content-type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM5MDYxMzYxLCJleHAiOjE2MzkxNDc3NjF9.HRr1BdJr0ncjusFh_gi7Z2bjUps0Yep5gwyCDyCH55E` // ${localStorage.getItem('token')}
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsSubmitting(false); //setting it back to false so it does not keep running
            })
            .catch(err => {
                console.error(err)
                setIsSubmitting(false);
            })
        }

    }, [isSubmitting]);//setting the isSubmitting state to false when the form is submitted

    useEffect(() => {
        console.log(base64String);

    }, [base64String]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };//setting the post state to the value of the input

    const imageUpload64 = (event) => {//set post request to send image to server
        const file = document.getElementById('url').files[0];
        console.log(file);
        if (file) {
            //second if else statement to limit types of images, png, jpg, gif. 
            const reader = new FileReader();
            reader.onload = (e) => {
                setBase64String(e.target.result);
                setPost({ ...post, url : e.target.result });
                console.log(post, e.target.result);
            };
            reader.readAsDataURL(file);
        }
   

    return (
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
                <Label for="url">Url</Label>
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
            <FormGroup>
                <Label for="owner_id">Owner ID</Label>
                <Input
                    type="textarea"
                    name="owner_id"
                    id="owner_id"
                    placeholder="Owner ID"
                    value={post.owner_id}
                    onChange={handleInputChange}
                />
            </FormGroup>
            <Button onClick={(() => setIsSubmitting(true))}>Submit</Button>
        </Form>
    );
}
