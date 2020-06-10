import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomeScreen from "./screens/HomeScreen";
import { Provider as PaperProvider, Button } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./client";

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
    <LoginForm />
  </View>
);

const RegisterScreen = ({ navigation }) => (
  <View style={styles.container}>
    <RegisterForm />
  </View>
);

const RootStack = createStackNavigator();
export default function App() {
  const [isReady, setReady] = React.useState(false);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        console.log("Token", token);
        setIsSignedIn(!!token);
      })
      .finally(() => setReady(true));
  }, []);
  console.log("root", { isReady, isSignedIn });
  if (!isReady) return null;
  const initialRouteName = isSignedIn ? "Home" : "Login";
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName={initialRouteName}>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} />
            <RootStack.Screen name="Home" component={HomeScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
