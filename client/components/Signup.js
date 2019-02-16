import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };

    this.db = this.props.navigation.getParam("db", "default_db");
    this.auth = this.props.navigation.getParam("auth", "default_auth");
  }

  handlePress() {
    const email = this.state.email;
    const password = this.state.password;

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("user has been created");
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
