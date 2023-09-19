import { Router } from "express";
import {
  forgetPassword,
  register,
  resetPassword,
  signIn,
} from "../controllers/auth.controller";
import { requireSignIn } from "../middleware/requireSignIn";

const authRouter = Router();

authRouter.get(
  "/forget-password",
  requireSignIn,
  forgetPassword
);

authRouter.post("/sign-in", signIn);
authRouter.post("/register", register);
authRouter.post("/reset-password", requireSignIn, resetPassword);

// authRouter.post("/oauth/github");
// authRouter.post("/oauth/twitter");
// authRouter.post("/oauth/google");


export default authRouter;
