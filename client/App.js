// In App.js in a new project

import React from "react";
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
//import { RkAvoidKeyboard, RkCard } from "react-native-ui-kitten";
import { Constants } from "expo";
import GradientButton from "react-native-gradient-buttons";
import { scale, scaleVertical } from "./utilities/scale";
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
//import Login from "./components/Login";

//import { Icon } from "react-native-vector-icons";
//import HomeSreen from "./components/HomeScreen";

import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: scaleVertical(1),
    paddingHorizontal: scale(16),
    flex: 1
    //backgroundColor: "rgb(245, 245, 245)"
  },
  all: {
    marginTop: scaleVertical(24),
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#D3D3D3",
    borderRadius: 50,
    padding: 18,
    marginVertical: scaleVertical(6),
    fontWeight: "bold"
  }
});

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
    this.state = {
      email: null,
      password: null
    };
  }
  handlePress() {
    const email = this.state.email;
    const password = this.state.password;

    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("user has signed in");
      })
      .then(() => {
        this.props.navigation.navigate("Chats", {
          db: this.db,
          auth: this.auth
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <View style={styles.all}>
        <TextInput
          textContentType="username"
          placeholder="EMAIL OR USERNAME"
          placeholderTextColor="#707070"
          onChangeText={email => this.setState({ email })}
          style={styles.input}
        />
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          placeholder="PASSWORD"
          placeholderTextColor="#707070"
          onChangeText={password => this.setState({ password })}
          style={styles.input}
        />
        <IconButton
          icon="chat"
          title="Log In"
          color={Colors.red500}
          size={20}
          onPress={this.handlePress.bind(this)}
        />
      </View>
    );
    /*
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
      </View>*/
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
    Signup: Signup
    //Login: Login
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
