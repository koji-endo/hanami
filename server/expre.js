const fs = require("fs");
const express = require("express");
let app = express();
let listener = app.listen(8005, function() {
  console.log(listener.address().port);
});

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
