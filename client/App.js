// In App.js in a new project

import React from "react";
import { View, Button, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import DetailsScreen from "./components/DetailScreen";
import ChatWindow from "./components/ChatWindow";
import Signup from "./components/Signup";

/*
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="SMS"
          onPress={() => this.props.navigation.navigate("Details")}
        />
        <Button
          title="Chat Window"
          onPress={() => this.props.navigation.navigate("ChatWindow")}
        />
      </View>
    );
  }
}*/

const AppNavigator = createStackNavigator(
  {
    //Home: HomeScreen,
    Details: DetailsScreen,
    ChatWindow: ChatWindow,
    Signup: Signup
  },
  {
    initialRouteName: "Signup"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
