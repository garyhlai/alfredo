import React from "react";
import { GiftedChat } from "react-native-gifted-chat";

class ChatWindow extends React.Component {
  state = {
    messages: [], //an array of msg objects pulled from database
    //userNumber: "17746413021"  <-- Julian
    userNumber: "19783023187"
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: "afsdpj129340",
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(message = []) {
    console.log(this.state.messages);
    // shows up on the chat window
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message)
    }));

    // actually sends the sms msg
    fetch("http://192.168.1.10:3001/", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        number: this.state.userNumber,
        text: message[0].text
      })
    })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => this.onSend(message)}
        user={{
          _id: 1
        }}
      />
    );
  }
}
export default ChatWindow;
