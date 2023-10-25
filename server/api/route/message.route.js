const { Router } = require("express");

const messageRouter = Router();

messageRouter.get("/send", () => null);

module.exports = messageRouter;
