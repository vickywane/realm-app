import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import Realm from "realm";
import { setContext } from "@apollo/client/link/context";

import Login from "./src/screens/login";
import CreateAccount from "./src/screens/create-account";
import Home from "./src/screens/Home";
import CreatePost from "./src/screens/CreatePost";
import { REALM_GRAPHQL_ENDPOINT } from "./src/credentials";

const Stack = createStackNavigator();
const app = new Realm.App({ id: "first-realm-application-xurco" });

const link = createHttpLink({
  uri: REALM_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = app.currentUser.accessToken;
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="login"
            component={Login}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="create-account"
            component={CreateAccount}
          />

          <Stack.Screen
            options={{
              headerLeft: null,
              title: "Splash Images",
              headerStyle: {
                backgroundColor: "#282c34",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontSize: 17,
                fontWeight: "600",
              },
            }}
            name="Home"
            component={Home}
          />

          <Stack.Screen
            options={{
              title: "Create New Post",
              headerStyle: {
                backgroundColor: "#282c34",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
            name="CreatePost"
            component={CreatePost}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
