require("dotenv").config();
import express from "express";
import helmet from 'helmet';
import cors from 'cors';
// import csrf from 'csrf';
import morgan from 'morgan';
import compression from 'compression';
import sessions from 'express-session';

import ConnectToDatabase from "./configs/db";
import routes from "./routes";
import notFoundHandler from "./handlers/notFound";
import errorHandler from "./handlers/errorHandler";

ConnectToDatabase();

const app = express();
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(compression());
app.use(morgan("common"));
app.use(sessions({
  secret: process.env.SESSION_SECRET!,
  saveUninitialized: false,
  resave: false
}))

app.use("/api", routes);

app.get("/", (_req, res) => {
  res.json({
    message: "Hello from api",
    success: true
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀🚀http://localhost:${port}`));
