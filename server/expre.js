const fs = require("fs");
const https = require("https");
const express = require("express");
let app = express();

let options = {
  key: fs.readFileSync("/etc/letsencrypt/******/********/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/******/********/cert.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/******/********/chain.pem"),
};

let server = https.createServer(options, app);
app.get("/url/:url", function(req, res) {
  let params = req.params;
  let url = params["url"];
  url = url.replace(/\$/g, "/");
  fs.writeFileSync("./sample.txt", url);
  res.send(url);
});

app.get("/img", function(req, res) {
  let imgPath = req.query.img;
  //url = url.replace(/\$/g, "/");
  fs.writeFileSync("./sample.txt", imgPath);
  res.send(imgPath);
});
server.listen(8005);
