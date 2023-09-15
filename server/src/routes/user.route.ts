import { Router } from "express";

import { getUser, getUsers, followUser, getFollower, getFollowing, getUserLiked, getUserSaved, getUserAvatar, setUserAvatar, getSuggestedUser } from "../controllers/user.controller";
import { requireSignIn } from "../middleware/requireSignIn";

const userRouter = Router();

userRouter.get("/user", getUser);
userRouter.get("/users", getUsers);
userRouter.get("/follow", requireSignIn, followUser);
userRouter.get("/follower", getFollower);
userRouter.get("/following", getFollowing);
userRouter.get("/liked", requireSignIn, getUserLiked);
userRouter.get("/saved", requireSignIn, getUserSaved);
userRouter.get("/avatar", getUserAvatar);
userRouter.get("/suggestion", getSuggestedUser);

userRouter.post("/avatar", requireSignIn, setUserAvatar);

export default userRouter;
