import React, { useState, useEffect } from "react";
import Auth from "./auth/Auth";
import Sitebar from "./home/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import PostIndex from "./posts/PostIndex";
import {
  BrowserRouter as Router
} from 'react-router-dom';

function App(props) {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <PostIndex token={sessionToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <div className="App">
      <Router>
        <Sitebar clickLogout={clearToken} />
      </Router>
      {protectedViews()}
    </div>
  );
}

export default App;
