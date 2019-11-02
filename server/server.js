const http = require("http");
const HttpDispatcher = require("httpdispatcher");
const { Session } = require("./Session");
const { sendTransaction } = require("./snapy");

const dispatcher = new HttpDispatcher();

const server = http.createServer(function(req, res) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000 // 30 days
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (["GET", "POST"].indexOf(req.method) > -1) {
    res.writeHead(200, headers);
    dispatcher.dispatch(req, res);
    return;
  }

  res.writeHead(405, headers);
  res.end(`${req.method} is not allowed for the request.`);

  dispatcher.dispatch(req, res);
});

dispatcher.onPost("/send", function(req, res) {
  res.end("success");

  sendTransaction();
});

dispatcher.onPost("/callbacks", function(req, res) {
  res.end("success");
  console.log("Callback Webhook called");

  Session.mainWindow.webContents.send(
    "message",
    JSON.stringify({
      isConfirmed: true
    })
  );
});

const wsServerHostname = "localhost";
const wsServerPort = "8080";

server.listen(wsServerPort, wsServerHostname, () => {
  console.log(`Server running at http://${wsServerHostname}:${wsServerPort}/`);
});
