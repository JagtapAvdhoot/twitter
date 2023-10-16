import { RequestHandler } from "express";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { z } from "zod";

import { sendSuccessResponse } from "../utils/response";
import {
  findTweet,
  newTweet,
  removeTweet,
  updateTweet,
} from "../services/tweet.service";
import { findUser, updateUser } from "../services/user.service";
import createError from "../middleware/createError";
import { uploadFile } from "../utils/cloudinary";
import { IMedia } from "../models/tweet.model";

interface IOffsetAndLimit {
  offset: number;
  limit: number;
}

export const globalFeed: RequestHandler<{}, {}, {}, IOffsetAndLimit> = async (
  req,
  res,
  next
) => {
  const { offset, limit } = req.query;
  const _limit = Number(limit) || 10;
  const _offset = Number(offset) * _limit || 0;

  try {
    const tweet = await findTweet({
      filter: {},
      select: "_id",
      limit: _limit,
      skip: _offset,
      sort: { createdAt: -1 },
    });

    sendSuccessResponse({ res, data: { tweet } });
  } catch (error) {
    next(error);
  }
};

export const userFeed: RequestHandler = async (req, res, next) => {
  const signedUser = req.user;
  const { offset, limit } = req.query;
  const _limit = Number(limit) || 0;
  const _offset = Number(offset) * _limit || 0;

  if (!signedUser) return next(new createError(httpStatus.UNAUTHORIZED, ""));
  try {
    const user = await findUser({
      filter: { _id: signedUser._id },
      select: "followers",
    });

    if (!user) return next(new createError(httpStatus.NOT_FOUND, ""));

    const followers = user[0].followers.map(
      (follower) => new Types.ObjectId(follower.user)
    );

    const tweet = await findTweet({
      filter: { author: { $in: followers } },
      select: "_id",
      limit: _limit,
      skip: _offset,
      sort: { createdAt: -1 },
    });

    sendSuccessResponse({ res, data: { tweet } });
  } catch (error) {
    next(error);
  }
};

interface ICreateTweet {
  media: Record<string, string>[];
  desc: string;
  audience: string;
  whoCanReply: string;
  location: string;
}

const createTweetSchema = z.object({
  media: z.array(z.string()).optional(),
  desc: z.string().optional(),
  audience: z.string().optional(),
  whoCanReply: z.string().optional(),
  location: z.string().optional(),
});

export const createTweet: RequestHandler<{}, {}, ICreateTweet> = async (
  req,
  res,
  next
) => {
  const { media, desc, audience, whoCanReply, location } =
    await createTweetSchema.parseAsync(req.body);

  let _media: IMedia[] | [] = [];
  const signedUser = req.user;

  if (!signedUser) return next(new createError(httpStatus.UNAUTHORIZED, ""));

  const options = {
    folder: "twitter_clone",
  };

  if (Array.isArray(media) && media?.length > 1) {
    try {
      const [error, response] = await uploadFile(media, options);
      _media = response ?? [];
    } catch (error) {
      next(error);
    }
  }

  try {
    const tweet = await newTweet({
      media: _media,
      desc,
      audience,
      whoCanReply,
      location,
      author: signedUser._id,
    });
  } catch (error) {
    next(error);
  }
};

interface ITweetIdInQuery {
  tid: string;
}

export const deleteTweet: RequestHandler<{}, {}, {}, ITweetIdInQuery> = async (
  req,
  res,
  next
) => {
  const { tid } = req.query;
  const signedUser = req.user;

  try {
    const user = await findUser({
      filter: { _id: signedUser._id },
      select: "tweetCreated _id",
    });

    const tweet = await findTweet({
      filter: { _id: tid },
      select: "author _id",
    });

    if (tweet[0].author.toString() !== user[0]._id.toString())
      return next(
        new createError(httpStatus.FORBIDDEN, "you are not the author")
      );

    if (
      user[0].tweetCreated.findIndex((tweets) => tweets.tweet === tweet[0]._id)
    )
      return next(new createError(httpStatus.FORBIDDEN, "not the author"));

    await removeTweet(tweet[0]._id);

    sendSuccessResponse({ res });
  } catch (error) {
    next(error);
  }
};

export const pinTweet: RequestHandler<{}, {}, {}, ITweetIdInQuery> = async (
  req,
  res,
  next
) => {
  const { tid } = req.query;
  const signedUser = req.user;
  try {
    const pinnedArray = await findUser({
      filter: { _id: signedUser._id },
      select: "tweetPinned",
    });

    const isPinned = pinnedArray[0].tweetPinned.findIndex(
      (item) => item.tweet.toString() === tid.toString()
    );

    if (isPinned !== -1) {
      await updateUser({
        filter: { _id: signedUser._id },
        update: {
          $pull: {
            tweetPinned: {
              tweet: tid,
            },
          },
        },
      });
    } else {
      await updateUser({
        filter: { _id: signedUser._id },
        update: {
          $push: {
            tweetPinned: {
              tweet: tid,
              time: Date.now(),
            },
          },
        },
      });
    }

    sendSuccessResponse({ res });
  } catch (error) {
    next(error);
  }
};

interface IMessageInBody {
  message: string;
}

export const reportTweet: RequestHandler<{}, {}, IMessageInBody, ITweetIdInQuery> = async (req, res, next) => {
  const {tid} = req.query;
  const {message} = req.body;
  const signedUser = req.user;

  try {
    const update = await updateTweet({
      filter:{
        _id:tid
      },
      update:{
        $addToSet:{
          reports: {

          }
        }
      }
    })
  } catch (error) {
    next(error);
  }
};
