const { Router } = require("express");

const authRouter = Router();

authRouter.get("/send", () => null);

module.exports = authRouter;
