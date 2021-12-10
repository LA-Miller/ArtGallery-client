import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Carousel } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import Sitebar from "../home/Navbar";
import PostCreate from "./PostCreate";
import ImageSlider from "../home/ImageSlider";
import { SliderData } from "../home/SliderData";

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
    <div>
      <ImageSlider slides={SliderData} />;
    </div>
  );
};

export default PostIndex;
