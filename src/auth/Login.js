import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Login = (props) => {
  const [email, setEmail] = useState(""); //2
  const [password, setPassword] = useState(""); //2

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://lam-art-gallery-server.herokuapp.com/user/login", {
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
        props.updateToken(data.sessionToken);
      });
  };

  return (
    <div>
      <h1 className="login-h1">Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label id="email-label" htmlFor="email">Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            id="signup-email"
            required={true}
            />
        </FormGroup>
        <FormGroup>
          <Label id="pass-label" htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            id="signup-pass"
            required={true}
          />
        </FormGroup>
        <Button id="login-btn" variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
