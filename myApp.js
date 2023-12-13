let express = require("express");
let app = express();
const absolutePath = __dirname;
app.get("/", (req, res) => {
  res.sendFile(absolutePath + "/views/index.html");
});

console.log("Hello World");

module.exports = app;
