let server = require("ws").Server;
let fs = require("fs");
let s = new server({ port: 5001 });
let clients;
s.on("connection", function(ws) {
  ws.on("message", function(message) {
    console.log("Received: " + message);
    clients = s.clients;
  });

  ws.on("close", function() {
    console.log("I lost a client");
  });
});

fs.watch("sample.txt", function(event, filename) {
  let whatHappen = event + " to " + filename;
  console.log(whatHappen);
  let text = fs.readFileSync("sample.txt", "utf-8");
  console.log(text);
  if (clients !== undefined) {
    clients.forEach(function(client) {
      client.send(text);
    });
  }
});
