import * as React from "react";
import styled from "styled-components/native";
// import logo from "../assets/logo.svg";
import { TextInput, Button, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useRegister from "../core/useRegister";

const RegisterForm = () => {
  const navigation = useNavigation();
  const { state, handleChange, handleSubmit } = useRegister();

  const handlePressSubmit = async () => {
    try {
      const user = await handleSubmit();
      navigation.replace("Home", { user });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container>
      {/* <Logo source={logo} /> */}
      <Title>Welcome to our platform, please register!</Title>
      <FormContainer>
        <TextInput
          mode="flat"
          // id="email"
          label="Fullname"
          value={state.fullname}
          onChangeText={(text) => handleChange("fullname")(text)}
        />
        <TextInput
          mode="flat"
          // id="email"
          label="Age"
          value={state.age}
          onChangeText={(text) => handleChange("age")(text)}
        />
        <TextInput
          mode="flat"
          // id="email"
          label="Email"
          value={state.email}
          onChangeText={(text) => handleChange("email")(text)}
        />
        <TextInput
          mode="flat"
          // id="password"
          label="Password"
          // type="password"
          value={state.password}
          onChangeText={(text) => handleChange("password")(text)}
        />
        <Button mode="contained" onPress={handlePressSubmit}>
          REGISTER
        </Button>
        <Button onPress={() => navigation.replace("Login")}>Go To login</Button>
      </FormContainer>
    </Container>
  );
};

const Container = styled.View``;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const FormContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

export default RegisterForm;
