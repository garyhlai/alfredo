const express = require("express");
const bodyParser = require("body-parser");
var firebase = require("firebase");
const Nexmo = require("nexmo");
const socketio = require("socket.io");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCsD4q5lhY7eBz7EQjGSyyyJmEMlhJX_UE",
  authDomain: "alfredo-7e763.firebaseapp.com",
  databaseURL: "https://alfredo-7e763.firebaseio.com",
  projectId: "alfredo-7e763",
  storageBucket: "alfredo-7e763.appspot.com",
  messagingSenderId: "1067069442983"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

//get all data
/*
db.collection("chats")
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
    });
  });*/
/*
//get a particular document
var userNumber = "19783023187"; // or from, as inputted

db.collection("chats")
  .where("from", "==", userNumber)
  .get()
  .then(snapshot => {
    snapshot.docs.forEach(doc => {
      console.log(`Here's for ${userNumber}`);
      console.log(doc.data());
    });
  });

*/

// init Nexmo
const nexmo = new Nexmo(
  {
    apiKey: "cf4d8992",
    apiSecret: "J01tI4TVSd04mT7G"
  },
  { debug: true }
);

// init app
const app = express();

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.collection("doctor_1")
  .doc("patient_1")
  .collection("messages")
  .add({
    name: "ho ho ho ho ho ho",
    time: "later"
  });

db.collection("doctor_1")
  .doc("patient_1")
  .collection("messages2")
  .add({
    name: "ho ho ho ho ho ho",
    time: "later"
  });

// index route
//app.get("/", (req, res) => {
// res.render("index");
//});

// post route
app.post("/inbound", (req, res) => {
  handleParams(req.body, res);
});

// define handleParams
function handleParams(params, res) {
  if (!params.to || !params.msisdn) {
    console.log("This is not a valid inbound SMS message!");
  } else {
    // will need to store the params (such as the params.text) to the real-time database so that it can be sent to the frontend
    console.log("text : " + params.text);
    console.log("messageId: " + params.messageId);
    console.log("from: " + params.msisdn);
    console.log("type: " + params.type);
    console.log("timestamp: " + params.type);

    let incomingData = {
      messageId: params.messageId,
      from: params.msisdn,
      text: params.text,
      type: params.type,
      timestamp: params["message-timestamp"]
    };

    // save data to firebase
    db.collection("messages").add(incomingData);

    res.send(incomingData);
  }
  res.status(200).end();
}

// form submission
app.post("/", (req, res) => {
  // res.send(req.body);
  // console.log(req.body);
  console.log("there's a post request");
  const number = req.body.number;
  const text = req.body.text;

  const from = "12025582533";
  //const to = "573193157672";

  nexmo.message.sendSms(
    from,
    number,
    text,
    //{ type: "unicode" },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // Get data from the response
        const data = {
          id: responseData.messages[0]["message-id"],
          number: responseData.messages[0]["to"]
        };
        // emit to client
        io.emit("smsStatus", data);
      }
    }
  );
});

// define port
const port = 3001;

// start server
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

const io = socketio(server);
io.on("connection", socket => {
  console.log("Connected..");
  io.on("disconnect", () => {
    console.log("disconnected");
  });
});
