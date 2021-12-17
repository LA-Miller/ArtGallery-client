import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
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
import Sitebar from "../home/Navbar";
import PostCreate from "./PostCreate";
import { render } from "@testing-library/react";

const PostIndex = () => {
  const [data, setData] = useState([]);

  //http://localhost:3333/art/
  //https://lam-art-gallery-server.herokuapp.com/art/
  const fetchPosts = async () => {
    const response = await fetch("http://localhost:3003/art/", {
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
        setData(data.reverse());
        console.log("data:", typeof data);
      });

    return response;
  };

  useEffect(async () => {
    if (data.length < 1) {
      const myResults = await fetchPosts();
    }
  }, [data]);

  const renderCard = (card, index) => {
    return (
      <Card
        style={{ width: "300px", height: "100%", margin: "25px" }}
        key={index}
        className="box"
        id="card"
      >
        <CardImg
          variant="top"
          src={data[index].url}
          style={{ maxHeight: "200px", minHeight: "200px" }}
          id="card-img"
        />
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <h5><b>Artist</b>:</h5> {data[index].artist_name}
          </ListGroupItem>
          <ListGroupItem>
            <b>Description:</b> <br /> {data[index].description} <br />{" "}
            <b>Style:</b> {data[index].style} <br /> <b>Era</b>:{" "}
            {data[index].era}
          </ListGroupItem>
          <ListGroupItem>
            <b>For Sale:</b> {!!data[index].for_sale ? "Yes" : "No"} <br />{" "}
            {data[index].price ? <b>Price:</b> : null}  {data[index].price ? <b>$</b> : null }{data[index].price} 
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  };

  return (
    <div>
      <ImageSlider slides={SliderData} />
      <div className="grid">{data.map(renderCard)}</div>
    </div>
  );
};

export default PostIndex;
