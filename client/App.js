// In App.js in a new project

import React from "react";
import { View, Button, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  DefaultTheme,
  Divider,
  IconButton,
  Colors,
  Provider as PaperProvider
} from "react-native-paper";
import ChatWindow from "./components/ChatWindow";
import Signup from "./components/Signup";
import Chats from "./components/Chats";
import Login from "./components/Login";

//import { Icon } from "react-native-vector-icons";
//import HomeSreen from "./components/HomeScreen";

import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyCsD4q5lhY7eBz7EQjGSyyyJmEMlhJX_UE",
      authDomain: "alfredo-7e763.firebaseapp.com",
      databaseURL: "https://alfredo-7e763.firebaseio.com",
      projectId: "alfredo-7e763",
      storageBucket: "alfredo-7e763.appspot.com",
      messagingSenderId: "1067069442983"
    };

    firebase.initializeApp(config);

    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Sign Up"
          onPress={() => {
            console.log(this.auth);
            this.props.navigation.navigate("Signup", {
              db: this.db,
              auth: this.auth
            });
          }}
        />
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            width: "80%"
          }}
        />
        <Button
          title="Chat"
          onPress={() => this.props.navigation.navigate("ChatWindow")}
        />
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            width: "80%"
          }}
        />
        <IconButton
          icon="chat"
          color={Colors.red500}
          size={20}
          onPress={() => this.props.navigation.navigate("Chats")}
        />
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </View>
    );
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f"
  }
};

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    ChatWindow: ChatWindow,
    Chats: Chats,
    Signup: Signup,
    Login: Login
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <AppContainer />
      </PaperProvider>
    );
  }
}
