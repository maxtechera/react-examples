import React from "react";
import styled from "styled-components/native";
import { Title, Text, Button } from "react-native-paper";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { AsyncStorage } from "react-native";
import { AuthContext } from "../App";

const HomeScreen = ({ navigation }) => {
  const { setToken } = React.useContext(AuthContext);
  const { data } = useQuery(gql`
    {
      me {
        fullname
        email
      }
    }
  `);

  const handleLogout = async () => {
    setToken("");
  };
  return (
    <Container>
      <Title>Home</Title>
      <Text>{JSON.stringify(data)}</Text>
      <Button onPress={handleLogout}>LOGOUT</Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default HomeScreen;
