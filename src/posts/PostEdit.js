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
    const [artist_name, setEditArtistName] = useState(props.artist_name);
    const [url, setEditUrl] = useState(props.url);
    const [description, setEditDescription] = useState(props.description);
    const [style, setEditStyle] = useState(props.style);
    const [era, setEditEra] = useState(props.era);
    const [for_sale, setEditForSale] = useState(props.for_sale);
    const [price, setEditPrice] = useState(props.price);
    const [editMode, setEditMode] = useState(false);
    const [updateFields,setUpdateFields] = useState({});

    const artPostUpdate = (postId, e) => {
        console.log(postId);
        fetch(`http://localhost:3003/art/update/${postId}`, {
            method: "PUT",
            body: JSON.stringify(postId),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
         })
            

        //.then( getUserPosts => res.json(getUserPosts))
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log({ ...data, [name]: value });
        setData({ ...data, [name]: value });
    }; //setting the post state to the value of the input


    const handleUpdate = (e) => {
        setEditMode(!editMode);

    }

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3003/art/user`, {
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
        fetch(`http://localhost:3003/art/${postId}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }),
        })
            .then(() => getUserPosts());
    };

    useEffect(async () => {
        if (data.length < 1) {
            const myResults = await getUserPosts();
        
        }
    }, []);

    const renderCard = (card, index) => {
        console.log(card);
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
                                <ListGroupItem >By:
                                    <Input onChange={handleInputChange} contentEditable={editMode}>{data[index].artist_name}</Input> </ListGroupItem>
                                <ListGroupItem>
                                    Description: <div onChange={handleInputChange} contentEditable={editMode}>{data[index].description}</div>
                                    Style:{" "}<div onChange={handleInputChange} contentEditable={editMode}>{data[index].style} </div>
                                    Era:<div onChange={handleInputChange} contentEditable={editMode}>{data[index].era}</div>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <h5>For Sale:</h5> <div onChange={handleInputChange} contentEditable={editMode}> {!data[index].forSale ? "Yes" : "No"}</div>
                                    <br />
                                    Price:<div onChange={handleInputChange} contentEditable={editMode}>${data[index].price}</div>
                                </ListGroupItem>
                            </ListGroup>
                            <Button onClick={() => handleUpdate()}>Edit Post</Button>
                            <Button onClick={() => artPostUpdate(card?.id)}>Update Post</Button>
                            <Button variant="danger" onClick={() => deletePost(card?.id)}>
                                Delete
                            </Button>
                        </Card>
                    </Col>
                    <Col md="2"></Col>
                </Row>
            </Container>
        );
    };

    const toggle = () => {
        setIsOpen(!isOpen);
        console.log(isOpen);
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
                        onClick={(e) => {
                            setIsSubmitting(true);
                            setIsOpen(false);
                            artPostUpdate(e);
                        }}
                    >
                        Post Art To Gallery
                    </Button>{" "}
                    <Button
                        variant="danger"
                        onClick={() => {
                            setIsSubmitting(true);
                            setIsOpen(false);
                            setEditMode(false);
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
