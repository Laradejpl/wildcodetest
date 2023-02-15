const express = require("express");
const app = express();
const mysql = require("promise-mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("listening port " + PORT + " all is ok");
});
