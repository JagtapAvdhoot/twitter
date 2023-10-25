if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const csrf = require("csrf");

const router = require("./route");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.set("emit", wss.emit);

app.use(express.json());
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(morgan("dev"));
app.use(compression());

app.use("/api", router);

app.get("/", (_req, res) => {
  res.json({
    message: "hi from server",
  });
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Server received: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
