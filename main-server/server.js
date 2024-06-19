const { kafka } = require("./client");
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const textToAudioRoutes = require("./routes/textToAudio");
const SpeechToText = require("./routes/speechToText");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const port = 8080;
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Conneted");
  console.log(socket.id);

  // socket.on("message", (message) => {
  //   io.emit("receive-message" , message)
  // })
});

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("database connected"));

app.use(cors());
app.use(bodyParser.json());

app.use("/audio", textToAudioRoutes);
app.use("/text", SpeechToText);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// async function init() {
//   const admin = kafka.admin();
//   console.log("Admin connecting...");
//   admin.connect();
//   console.log("Adming Connection Success...");

//   console.log("Creating Topic [rider-updates]");
//   await admin.createTopics({
//     topics: [
//       {
//         topic: "rider-updates",
//         numPartitions: 2,
//       },
//     ],
//   });
//   console.log("Topic Created Success [rider-updates]");

//   console.log("Disconnecting Admin..");
//   await admin.disconnect();
// }

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});

const AudioUpdate = async () => {
  const consumer = kafka.consumer({ groupId: "user-3" });
  await consumer.connect();

  await consumer.subscribe({
    topics: ["textToSpeech-response"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const Message = JSON.parse(message.value.toString());
      io.emit("audio-response", Message);
      // console.log(JSON.parse(message.value.toString()), "Consume67")  // from Created Category
      // io.emit("buffer-audio" , JSON.parse(message.value.toString()))
    },
  });
};

const SpeechToTextUpdate = async () => {
  const consumer = kafka.consumer({ groupId: "user-6" });
  await consumer.connect();

  await consumer.subscribe({
    topics: ["speechToText-response"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const Message = JSON.parse(message.value.toString());
      io.emit("text-response", Message);
      // console.log(JSON.parse(message.value.toString()), "Consume67")  // from Created Category
      // io.emit("buffer-audio" , JSON.parse(message.value.toString()))
    },
  });
};

AudioUpdate();
SpeechToTextUpdate();
