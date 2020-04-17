import * as React from "react";
import styled from "styled-components";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import logo from "./logo.svg";

// TODO replace custom state with Formik
// TODO use formik for validation
// TODO use validation with material-ui to show HelperText
const useForm = () => {
  const [state, setState] = React.useState({});
  const handleChange = (key) => (evt) => {
    setState({
      ...state,
      [key]: evt.target.value,
    });
  };

  const handleSubmit = async () => {
    // const user = await client.login({email, password});
    console.log("REGISTER USER", state);
  };

  return {
    state,
    handleChange,
    handleSubmit,
  };
};

const RegisterForm = () => {
  const { state, handleChange, handleSubmit } = useForm();
  return (
    <Container maxWidth="sm">
      <Logo src={logo} />
      <Typography variant="h5">
        Welcome to our platform, please register!
      </Typography>
      <br />
      <form noValidate autoComplete="off">
        <FormContainer>
          <TextField
            variant="filled"
            id="fullname"
            label="Fullname"
            value={state.fullname}
            onChange={handleChange("fullname")}
          />
          <br />
          <TextField
            variant="filled"
            id="age"
            label="Age"
            value={state.age}
            onChange={handleChange("age")}
          />
          <br />
          <TextField
            variant="filled"
            id="email"
            label="Email"
            value={state.email}
            onChange={handleChange("email")}
          />
          <br />
          <TextField
            variant="filled"
            id="password"
            label="Password"
            type="password"
            value={state.password}
            onChange={handleChange("password")}
          />
          <br />
          <TextField
            variant="filled"
            id="repeatPassword"
            label="Repeat pas"
            type="repeatPassword"
            value={state.repeatPassword}
            onChange={handleChange("repeatPassword")}
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

export default RegisterForm;
