import * as React from "react";
import { Drawer } from "react-native-paper";

export default class MyComponent extends React.Component {
  state = {
    active: "first"
  };

  render() {
    const { active } = this.state;

    return (
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="Patient 1"
          active={active === "first"}
          onPress={() => {
            this.setState({ active: "first" });
            this.props.navigation.navigate("ChatWindow");
          }}
        />
        <Drawer.Item
          label="Patient 2"
          active={active === "second"}
          onPress={() => {
            this.setState({ active: "second" });
            this.props.navigation.navigate("ChatWindow");
          }}
        />
      </Drawer.Section>
    );
  }
}
