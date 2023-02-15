const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mysql = require("promise-mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//pour SOCKETIO

const chat = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected!");
    console.log("Socket ID: ", socket.id);
    socket.on("message", (message) => {
      console.log(message);
      let messageAnId = {
        message: message,
        idsocket: socket.id,
      };
      io.emit("ecoutemessage", messageAnId);
      //io.emit("envoiId", socket.id);
    });
  });
};

const io = require("socket.io")(http, {
  path: "/socket.io",
  cors: {
    origin: ["http://projetdigital.alwaysdata.net/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
    optionsSuccessStatus: 204,
  },
});
//let config;
console.log(process.env.HOST_DB);
if (!process.env.HOST_DB) {
  var config = require("./config");
} else {
  var config = require("./config_exemple");
}
// Mes routes api
const argonautesRoutes = require("./routes/argonautesRoutes.js");

const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;

console.log(host);
console.log(database);
console.log(user);
console.log(password);

mysql
  .createConnection({
    host: host,
    database: database,
    user: user,
    password: password,
  })
  .then((db) => {
    console.log("connecté bdd");
    setInterval(async function () {
      let res = await db.query("SELECT 1");
      //console.log(res);
    }, 5000);

    app.get("/", (req, res, next) => {
      res.json({ status: 200, results: "Bienvenue sur votre Api" });
    });

    //appel de ma route

    argonautesRoutes(app, db);
  })
  .catch((err) => console.log(err));
chat(io);
const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
  console.log("listening port " + PORT + " all is ok");
});
