import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Signup = (props) => {
  const [email, setEmail] = useState(""); //2
  const [password, setPassword] = useState(""); //2

  let handleSubmit = (event) => {
    console.log(email, password);
    event.preventDefault();

    fetch("https://lam-art-gallery-server.herokuapp.com/user/register", {
      method: "POST",
      body: JSON.stringify({
        user: { email: email, password: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.updateToken(data.sessionToken);
      });
  };

  return (
    <div>
      <h1 className="signup-h1">Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label id="email-label" htmlFor="email">Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            id="signup-email"
          />
        </FormGroup>
        <FormGroup>
          <Label id="pass-label" htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            id="signup-pass"
          />
        </FormGroup>
        <Button id="signup-btn" type="submit">Signup</Button>
      </Form>
    </div>
  );
};

export default Signup;
