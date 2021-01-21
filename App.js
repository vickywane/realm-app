import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloClient, ApolloProvider} from '@apollo/client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import Realm from 'realm';

import Login from './src/screens/login';
import CreateAccount from './src/screens/create-account';
import Home from './src/screens/Home';
import CreatePost from './src/screens/CreatePost';

const Stack = createStackNavigator();
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:
    'https://realm.mongodb.com/api/client/v2.0/app/first-realm-application-xurco/graphql',
});

export default function App() {
  const app = new Realm.App({id: 'first-realm-application-xurco'});

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
              title: 'All posts',
              headerStyle: {
                backgroundColor: '#282c34',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            name="Home"
            component={Home}
          />

          <Stack.Screen
            options={{
              title: 'Create New Post',
              headerStyle: {
                backgroundColor: '#282c34',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
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
