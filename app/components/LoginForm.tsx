import * as React from "react";
import styled from "styled-components/native";
// import logo from "../assets/logo.svg";
import { TextInput, Button, Title } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LoginForm = () => {
  const navigation = useNavigation();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const handleSubmit = async () => {
    // const user = await client.login({email, password});
    console.log("LOGIN USER", { email, password });
  };

  return (
    <Container>
      {/* <Logo source={logo} /> */}
      <Title>Welcome to our platform, please login!</Title>
      <FormContainer>
        <TextInput
          mode="flat"
          // id="email"
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          mode="flat"
          // id="password"
          label="Password"
          // type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button mode="contained" onPress={() => handleSubmit()}>
          LOGIN
        </Button>
        <Button onPress={() => navigation.replace("Register")}>
          Go To register
        </Button>
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

export default LoginForm;
