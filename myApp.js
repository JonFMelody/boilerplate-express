let express = require("express");
let app = express();
let bodyParser = require("body-parser");
require("dotenv").config();

const simpleLogger = (res, req, next) => {
  console.log(res.method + " " + res.path + " - " + res.ip);
  next();
};

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => simpleLogger(req, res, next));

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/name", (req, res) => {
  const firstname = req.body.first;
  const lastname = req.body.last;
  res.json({ name: firstname + " " + lastname });
});

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
  const firstname = req.query.first;
  const lastname = req.query.last;
  res.json({ name: firstname + " " + lastname });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

console.log("Hello World");

module.exports = app;
