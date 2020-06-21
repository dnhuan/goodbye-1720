require('dotenv').config()
const express = require("express");
const app = express();
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer);
const path = require("path");
const cors = require("cors");

var countdownTimer = 30;
var intervalIDs = [];

app.use(cors());
app.use(express.static("../public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "admin.html"));
});

io.on("connection", (socket) => {
  socket.emit("hello", "Hi user!");
  //
  socket.on("start", (pass) => {
    if ((pass == process.env.PASS)) {
      console.log("START TIMER");
      intervalIDs.push(
        setInterval(() => {
          if (countdownTimer < 0) {
            intervalIDs.forEach((intervalID) => {
              clearInterval(intervalID);
            });
          } else {
            io.emit("countdownTimer", countdownTimer);
            countdownTimer--;
          }
        }, 1000)
      );
    }
  });
  //
  socket.on("cancel", (pass) => {
    if (pass == process.env.PASS) {
      console.log("CANCEL TIMER");
      intervalIDs.forEach((intervalID) => {
        clearInterval(intervalID);
      });
      countdownTimer = 30;
      io.emit("countdownTimer", countdownTimer);
    }
  });
});

httpServer.listen(3000, () => {
  console.log("listening on port 3000");
});
