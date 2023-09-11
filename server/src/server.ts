require("dotenv").config();
import express from "express";

import ConnectToDatabase from "./configs/db";

import routes from "./routes";
import notFoundHandler from "./handlers/notFound";
import errorHandler from "./handlers/errorHandler";

ConnectToDatabase();

const app = express();

app.use("/api", routes);

app.get("/", (_req, res) => {
  res.json({
    message: "Hello from api",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀🚀http://localhost:${port}`));
