import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import logo from "./logo.svg";
// import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import client from "./client";

import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <RegisterForm />
    </ApolloProvider>
  );
}

export default App;
