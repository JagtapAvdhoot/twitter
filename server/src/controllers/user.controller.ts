import { RequestHandler } from "express";
import { findUser, updateUser } from "../services/user.service";
import { sendSuccessResponse } from "../utils/response";
import createError from "../middleware/createError";

interface IReqQuery {
  uid?: string;
  search?: string;
}

export const followUser: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  const user = req.user;

  if (!uid) return next(new createError(400, ""));
  if (!user) return next(new createError(401, ""));

  try {
    const signedUser = await findUser({
      identifier: user._id,
      select: "followers",
    });
    const followingUser = await findUser({
      identifier: uid,
      select: "followings",
    });

    const isFollowed = signedUser[0].followers.findIndex(
      (flw) => flw.user === uid
    );
    const isFollowing = followingUser[0].followings.findIndex(
      (flw) => flw.user === user._id
    );

    if (isFollowed !== -1 || isFollowing !== -1) {
      await updateUser(user._id, { $pull: { followers: { user: uid } } });
      await updateUser(uid, { $pull: { followings: { user: user._id } } });
    } else if (isFollowed === -1 || isFollowing === -1) {
      await updateUser(user._id, { $push: { followers: { user: uid } } });
      await updateUser(uid, { $push: { followings: { user: user._id } } });
    } else {
      // throw error
    }

    sendSuccessResponse({ res });
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  if (!uid) return next(new createError(400, ""));

  try {
    const user = await findUser({
      identifier: uid,
      select: "username fullName email _id",
    });

    if (!user) return next(new createError(404, ""));

    sendSuccessResponse({ res, data: { user: user[0] } });
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { search } = req.query;
  if (!search) return next(new createError(400, ""));

  try {
    const user = await findUser({
      identifier: search,
      select: "username fullName email _id",
    });

    if (!user) return next(new createError(404, ""));

    sendSuccessResponse({ res, data: { user: user[0] } });
  } catch (error) {
    next(error);
  }
};

export const getUserAvatar: RequestHandler = async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new createError(401, ""));

  try {
    const avatar = await findUser({ identifier: user._id, select: "avatar" });

    sendSuccessResponse({ res, data: { avatar: avatar[0].avatar } });
  } catch (error) {
    next(error);
  }
};

export const getFollower: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  if (!uid) return next(new createError(401, ""));

  try {
    // just here
  } catch (error) {
    next(error);
  }
};
export const getFollowing: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  const user = req.user;

  try {
  } catch (error) {
    next(error);
  }
};
export const getUserLiked: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  const user = req.user;

  try {
  } catch (error) {
    next(error);
  }
};
export const getUserSaved: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  const user = req.user;

  try {
  } catch (error) {
    next(error);
  }
};
export const getSuggestedUser: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  const user = req.user;

  try {
  } catch (error) {
    next(error);
  }
};
