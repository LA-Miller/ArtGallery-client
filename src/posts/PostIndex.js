import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Sitebar from "../home/Navbar";
import PostCreate from "./PostCreate";
import ImageSlider from "../home/ImageSlider";
import { SliderData } from "../home/SliderData";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  ListGroup,
  ListGroupItem,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import Sitebar from "../home/Navbar";
import PostCreate from "./PostCreate";
import { render } from "@testing-library/react";

const PostIndex = (props) => {
  const [data, setData] = useState([]);
  const [artistName, setArtistName] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("");
  const [era, setEra] = useState("");
  const [forSale, setForSale] = useState(true);
  const [price, setPrice] = useState("");

  //http://localhost:3333/art/
  //https://lam-art-gallery-server.herokuapp.com/art/
  const fetchPosts = async () => {
    const response = await fetch("http://localhost:3333/art/", {
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

  useEffect(async () => {
    if (data.length < 1) {
      const myResults = await fetchPosts();
    }
  }, [data]);
  
  const renderCard = (card, index) => {
    let i = 0;
    return(
      <Card style={{ width: "18rem" }} key={index} className="box">
      <CardImg variant="top" src={data[index].image} />
      <CardBody>
        <CardTitle></CardTitle>
        <CardText></CardText>
      </CardBody>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          By: {data[index].artist_name}
        </ListGroupItem>
        <ListGroupItem>
          Description: <br /> {data[index].description} <br /> Style: {data[index].style} <br /> Era: {data[index].era}
        </ListGroupItem>
        <ListGroupItem>
          For Sale: {!data[index].forSale ? "Yes" : "No"} <br /> Price: ${data[index].price}
        </ListGroupItem>
      </ListGroup>
    </Card> 
    )
  }

  return (
    <div className="main">
      <ImageSlider slides={SliderData} />;
      <div className="mainDiv">
        {data.map(renderCard)}
      </div>
    </div>
  );
};

export default PostIndex;
