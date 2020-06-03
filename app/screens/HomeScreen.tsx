import React from "react";
import styled from "styled-components/native";
import { Title, Text } from "react-native-paper";

const HomeScreen = ({ route }) => {
  return (
    <Container>
      <Title>Home</Title>
      <Text>{JSON.stringify(route.params)}</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default HomeScreen;
