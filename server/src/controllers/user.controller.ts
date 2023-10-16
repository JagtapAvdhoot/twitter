import { RequestHandler } from "express";
import { Types } from "mongoose";
import { findUser, updateUser } from "../services/user.service";
import { sendSuccessResponse } from "../utils/response";
import createError from "../middleware/createError";
import httpStatus from "http-status";
import { findTweet } from "../services/tweet.service";

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
      filter: { _id: user._id },
      select: "followers",
    });
    const followingUser = await findUser({
      filter: { _id: uid },
      select: "followings",
    });

    const isFollowed = signedUser[0].followers.findIndex(
      (flw) => flw.user === uid
    );
    const isFollowing = followingUser[0].followings.findIndex(
      (flw) => flw.user === user._id
    );

    if (isFollowed !== -1 || isFollowing !== -1) {
      await updateUser({
        filter: { _id: user._id },
        update: { $pull: { followers: { user: uid } } },
      });
      await updateUser({
        filter: { _id: uid },
        update: { $pull: { followings: { user: user._id } } },
      });
    } else if (isFollowed === -1 || isFollowing === -1) {
      await updateUser({
        filter: { _id: user._id },
        update: { $push: { followers: { user: uid } } },
      });
      await updateUser({
        filter: { _id: uid },
        update: { $push: { followings: { user: user._id } } },
      });
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
      filter: { _id: uid },
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
  const searchRegex = new RegExp(search);
  try {
    const user = await findUser({
      filter: {
        $or: [{ username: searchRegex }, { fullName: searchRegex }],
      },
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
    const avatar = await findUser({
      filter: { _id: uid },
      select: "avatar",
    });

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
    await updateUser({
      filter: { _id: user._id },
      update: { $set: { avatar: _avatar } },
    });

    sendSuccessResponse({ res });
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
    const follower = await findUser({
      filter: { _id: uid },
      select: "followers",
    });

    if (!follower) return next(new createError(httpStatus.NO_CONTENT, ""));

    sendSuccessResponse({ res, data: { follower: follower[0].followers } });
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
  if (!uid) return next(new createError(httpStatus.BAD_REQUEST, ""));

  try {
    const following = await findUser({
      filter: { _id: uid },
      select: "followings",
    });

    if (!following) return next(new createError(httpStatus.NO_CONTENT, ""));

    sendSuccessResponse({ res, data: { following: following[0].followings } });
  } catch (error) {
    next(error);
  }
};
export const getUserLiked: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const user = req.user;

  if (!user) return next(new createError(httpStatus.UNAUTHORIZED, ""));

  try {
    const signedUser = await findUser({
      filter: { _id: user._id },
      select: "tweetLiked",
    });

    const tweetIds = signedUser[0].tweetLiked.map(
      (likes) => new Types.ObjectId(likes.user)
    );

    const tweet = await findTweet({
      filter: {
        _id: {
          $in: tweetIds,
        },
      },
      limit: 20,
      select: "desc media location _id",
    });

    sendSuccessResponse({ res, data: { tweet } });
  } catch (error) {
    next(error);
  }
};
export const getUserBookmarked: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const { uid } = req.query;
  const user = req.user;

  try {
    const signedUser = await findUser({
      filter: { _id: user._id },
      select: "tweetBookmarked",
    });

    const tweetIds = signedUser[0].tweetBookmarked.map(
      (bookmark) => new Types.ObjectId(bookmark.user)
    );

    const tweet = await findTweet({
      filter: {
        _id: {
          $in: tweetIds,
        },
      },
      limit: 20,
      select: "desc media location _id",
    });

    sendSuccessResponse({ res, data: { tweet } });
  } catch (error) {
    next(error);
  }
};
export const getSuggestedUser: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
  next
) => {
  const user = req.user;
  let recentFollowers = [];

  try {
    const followers = await findUser({
      filter: {
        _id: user._id,
      },
      select: "followers",
    });

    recentFollowers = followers[0].followers.map((item, index) => {
      if (index > 3) return;
      return item.user;
    });

    // const
  } catch (error) {
    next(error);
  }
};
