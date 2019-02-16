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
import { RkAvoidKeyboard, RkCard } from "react-native-ui-kitten";
import { Constants } from "expo";
import GradientButton from "react-native-gradient-buttons";
import { scale, scaleVertical } from "../utilities/scale";

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

class Login extends React.PureComponent {
  render() {
    return (
      <View style={styles.all}>
        <TextInput
          textContentType="username"
          placeholder="EMAIL OR USERNAME"
          placeholderTextColor="#707070"
          style={styles.input}
        />
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          placeholder="PASSWORD"
          placeholderTextColor="#707070"
          style={styles.input}
        />
        <GradientButton
          style={{ marginTop: 8 }}
          textStyle={{ fontSize: 20 }}
          text="LOGIN"
          height={50}
          violetPink
          impact
        />
      </View>
    );
  }
}

export default Login;
