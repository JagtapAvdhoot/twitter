import { RequestHandler } from "express";
import { findUser, updateUser } from "../services/user.service";
import { sendSuccessResponse } from "../utils/response";
import createError from "../middleware/createError";
import httpStatus from "http-status";

interface IReqQuery {
  uid?: string;
  search?: string;
  offset?: number;
  // search?: string;
}

export const followUser: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  const user = req.user;

  if (!uid) return next(new createError(httpStatus.BAD_REQUEST, ""));
  if (!user) return next(new createError(httpStatus.UNAUTHORIZED, ""));

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
      await updateUser(
        { _id: user._id },
        { $pull: { followers: { user: uid } } }
      );
      await updateUser(
        { _id: uid },
        { $pull: { followings: { user: user._id } } }
      );
    } else if (isFollowed === -1 || isFollowing === -1) {
      await updateUser(
        { _id: user._id },
        { $push: { followers: { user: uid } } }
      );
      await updateUser(
        { _id: uid },
        { $push: { followings: { user: user._id } } }
      );
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
  if (!uid) return next(new createError(httpStatus.BAD_REQUEST, ""));

  try {
    const user = await findUser({
      identifier: uid,
      select: "username fullName email _id",
    });

    if (!user) return next(new createError(httpStatus.NOT_FOUND, ""));

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
  const { search, offset } = req.query;
  if (!search) return next(new createError(httpStatus.BAD_REQUEST, ""));

  try {
    const user = await findUser({
      identifier: search,
      select: "username fullName email _id",
      limit: 10,
      skip: Number(offset) ?? 0,
    });

    if (!user) return next(new createError(httpStatus.NOT_FOUND, ""));

    sendSuccessResponse({ res, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const getUserAvatar: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  if (!uid) return next(new createError(httpStatus.BAD_REQUEST, ""));

  try {
    const avatar = await findUser({ identifier: uid, select: "avatar" });

    sendSuccessResponse({ res, data: { avatar: avatar[0].avatar } });
  } catch (error) {
    next(error);
  }
};

interface ISetUserAvatar {
  uploadedImage: string | null;
}

export const setUserAvatar: RequestHandler<{}, {}, ISetUserAvatar> = async (
  req,
  res,
  next
) => {
  const user = req.user;
  let _avatar = req.body.uploadedImage;
  if (!user) return next(new createError(httpStatus.UNAUTHORIZED, ""));

  try {
    await updateUser({ _id: user._id }, { $set: { avatar:_avatar } });

    sendSuccessResponse({res})
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
