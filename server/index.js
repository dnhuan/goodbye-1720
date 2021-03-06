const fs = require('fs');
const credentials = {
  key: fs.readFileSync('../sslcert/wilsonle.me.key', 'utf8'),
  cert: fs.readFileSync('../sslcert/wilsonle.me.chained.crt', 'utf8')
}
require('dotenv').config()
const express = require("express");
const app = express();
const httpsServer = require("https").createServer(credentials, app);
const io = require("socket.io")(httpsServer);
const path = require("path");
const cors = require("cors");

const initTimer = process.env.SEC || 31;
var countdownTimer = initTimer;
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
  socket.emit("hello", countdownTimer);
  //
  socket.on("start", (pass) => {
    if ((pass == process.env.PASS)) {
      if(intervalIDs.length == 0){
      console.log("START TIMER");
      countdownTimer = initTimer - 1;
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
    }
  });
  //
  socket.on("cancel", (pass) => {
    if (pass == process.env.PASS) {
      console.log("CANCEL TIMER");
      intervalIDs.forEach((intervalID) => {
        clearInterval(intervalID);
      });
      intervalIDs = []
      countdownTimer = initTimer;
      io.emit("countdownTimer", countdownTimer);
    }
  });
  //
  socket.on('emoSend', emo => {
    socket.broadcast.emit('emoReceive', emo);
  })
});

httpsServer.listen(process.env.PORT || 3000, () => {
  console.log("listening on port", process.env.PORT || 3000);
});
