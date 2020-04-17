import * as React from "react";
import styled from "styled-components";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import logo from "./logo.svg";

const LoginForm = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const handleSubmit = async () => {
    // const user = await client.login({email, password});
    console.log("LOGIN USER", { email, password });
  };

  return (
    <Container maxWidth="sm">
      <Logo src={logo} />
      <Typography variant="h5">
        Welcome to our platform, please login!
      </Typography>
      <br />
      <form noValidate autoComplete="off">
        <FormContainer>
          <TextField
            variant="filled"
            id="email"
            label="Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <br />
          <TextField
            variant="filled"
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            LOGIN
          </Button>
        </FormContainer>
      </form>
    </Container>
  );
};

const Logo = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default LoginForm;
