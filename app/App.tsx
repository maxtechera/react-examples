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

export const AuthContext = React.createContext({
  token: "",
  setToken: (x: string) => {
    console.log("X", x);
  },
});

export default function App() {
  const [isReady, setReady] = React.useState(false);
  const [token, setToken] = React.useState<string>("");

  React.useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        console.log("Token", token);
        if (token) setToken(token);
      })
      .finally(() => setReady(true));
  }, []);

  React.useEffect(() => {
    AsyncStorage.getItem("token").then((storedToken) => {
      if (storedToken != token) {
        AsyncStorage.setItem("token", token);
      }
    });
  }, [token]);

  console.log("App", { isReady, token });
  if (!isReady) return null;
  const initialRouteName = token ? "Home" : "Login";
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: (x) => {
          setToken(x);
        },
      }}
    >
      <ApolloProvider client={client}>
        <PaperProvider>
          <NavigationContainer>
            <RootStack.Navigator initialRouteName={initialRouteName}>
              {!token ? (
                <>
                  <RootStack.Screen name="Login" component={LoginScreen} />
                  <RootStack.Screen
                    name="Register"
                    component={RegisterScreen}
                  />
                </>
              ) : (
                <>
                  <RootStack.Screen name="Home" component={HomeScreen} />
                </>
              )}
            </RootStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </AuthContext.Provider>
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
