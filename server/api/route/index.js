const { Router } = require("express");

const authRouter = require("./auth.route");
const messageRouter = require("./message.route");

const router = Router();

router.use("/message", messageRouter);
router.use("/auth", authRouter);

module.exports = router;
