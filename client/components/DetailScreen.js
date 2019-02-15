import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  Alert,
  Button
} from "react-native";

export default class App extends Component {
  state = {
    number: 0,
    msg: "default msg"
  };

  handlePress() {
    console.log("I'm pressed");
    fetch("http://192.168.1.13:3001/", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ number: this.state.number, text: this.state.msg })
    })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });

    /*
    Alert.alert(
      "You tapped the button!" +
        " Phone number: " +
        this.state.number +
        " Text: " +
        this.state.msg
    );*/

    /*
() => {
            Alert.alert(
              "You tapped the button!" +
                " Phone number: " +
                this.state.number +
                " Text: " +
                this.state.msg
            );
          }

    fetch("https://data.advance88.hasura-app.io/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "select",
        args: {
          table: "author",
          columns: ["name"],
          limit: "1"
        }
      })
     })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert("Author name at 0th index:  " + responseJson[0].name);
      })
      .catch(error => {
        console.error(error);
      });*/
  }
  render() {
    return (
      <View style={{ paddingTop: 50, paddingLeft: 50 }}>
        <TextInput
          style={{ height: 40 }}
          placeholder="The phone number.."
          onChangeText={number => this.setState({ number })}
        />

        <TextInput
          style={{ height: 40 }}
          placeholder="Your msg"
          onChangeText={msg => this.setState({ msg })}
        />

        <Button onPress={this.handlePress.bind(this)} title="Press Me" />
      </View>
    );
  }
}
