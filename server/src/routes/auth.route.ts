import { Router } from "express";
import passport from "passport";

import {
  forgetPassword,
  register,
  resetPassword,
  signIn,
} from "../controllers/auth.controller";
import { requireSignIn } from "../middleware/requireSignIn";

const authRouter = Router();

authRouter.get("/forget-password", requireSignIn, forgetPassword);

authRouter.post("/sign-in", signIn);
authRouter.post("/register", register);
authRouter.post("/reset-password", requireSignIn, resetPassword);

authRouter.get("/sign-in/oauth/github", passport.authenticate("github"));
authRouter.get(
  "/sign-in/oauth/github/callback",
  passport.authenticate("github", {
    failureMessage: "Github OAuth login failed!",
    session: true,
  })
);

authRouter.get("/sign-in/oauth/google", passport.authenticate("google"));
authRouter.get(
  "/sign-in/oauth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Google OAuth login failed!",
    session: true,
  })
);

authRouter.get("/sign-out", (req, res) => {
  req.logout({ keepSessionInfo: false }, (error) => {
    console.log(error, "from sign out auth router");
  });
  req.session.destroy((error) => {
    console.log(error, "from sign out session auth router");
  });
});

export default authRouter;
