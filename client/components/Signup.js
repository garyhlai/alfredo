import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };

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
    //}
  }

  //componentWillMount() {

  handlePress() {
    const email = this.state.email;
    const password = this.state.password;

    this.auth.createUserWithEmailAndPassword(email, password).then(() => {
      console.log("user has been created");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.signupForm}>
          <Text style={styles.header}> Sign up </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
          />
          <TextInput
            style={styles.textinput}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={this.handlePress.bind(this)}
            style={styles.button}
          >
            <Text style={styles.btntext}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#36485f",
    paddingLeft: 60,
    paddingRight: 60
  },
  signupForm: {
    alignSelf: "stretch"
  },
  header: {
    fontSize: 24,
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "#199187",
    borderBottomWidth: 1
  },
  textinput: {
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    color: "#fff",
    borderBottomColor: "#f8f8f8",
    borderBottomWidth: 1
  },
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#59cbbd",
    marginTop: 30
  },
  btntext: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default Signup;
