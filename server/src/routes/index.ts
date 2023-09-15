import { Router } from "express";

import authRouter from "./auth.route";
import userRouter from "./user.route";

const router = Router();

router.use("/authentication", authRouter);
router.use("/user", userRouter);

export default router;
