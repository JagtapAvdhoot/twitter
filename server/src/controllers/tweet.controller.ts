import { RequestHandler } from "express";
import { sendSuccessResponse } from "../utils/response";
import { findTweet } from "../services/tweet.service";
import { findUser } from "../services/user.service";
import createError from "../middleware/createError";
import httpStatus from "http-status";
import { Types } from "mongoose";
import { z } from "zod";

interface IOffsetAndLimit {
  offset: number;
  limit: number;
}

export const globalFeed: RequestHandler<{}, {}, {}, IOffsetAndLimit> = async (req, res, next) => {
  const { offset, limit } = req.query;
  const _limit = Number(limit) || 0;
  const _offset = Number(offset) * _limit || 0;

  try {
    const tweet = await findTweet({ identifier: {}, select: "_id", limit: _limit, skip: _offset, sort: { "createdAt": -1 } });

    sendSuccessResponse({ res, data: { tweet } });
  } catch (error) {
    next(error)
  }
}

export const userFeed: RequestHandler = async (req, res, next) => {
  const signedUser = req.user;
  const { offset, limit } = req.query;
  const _limit = Number(limit) || 0;
  const _offset = Number(offset) * _limit || 0;

  if (!signedUser) return next(new createError(httpStatus.UNAUTHORIZED, ""));
  try {

    const user = await findUser({ identifier: { _id: signedUser._id }, select: "followers" });

    if (!user) return next(new createError(httpStatus.NOT_FOUND, ""));

    const followers = user[0].followers.map((follower) => new Types.ObjectId(follower.user));

    const tweet = await findTweet({ identifier: { _id: { $in: followers } }, select: "_id", limit: _limit, skip: _offset, sort: { "createdAt": -1 } });

    sendSuccessResponse({ res, data: { tweet } });
  } catch (error) {
    next(error)
  }
}

interface ICreateTweet {
  media: Record<string, string>[];
  desc: string;
  audiance: string;
  whoCanReply: string;
  location: string;
}

const createTweetSchema = z.object({
  media: z.array(z.string()),
  desc:z.string(),
  audiance:z.string(),
  whoCanReply: z.string(),
  location: z.string()
})

export const createTweet: RequestHandler<{}, {}, ICreateTweet> = async (req, res, next) => {
  const { media, desc, audiance, whoCanReply, location } = await createTweetSchema.parseAsync(req.body);

  const options = {};

  if (Array.isArray(media) && media?.length > 1) {
    try {
      for (let _file of media) {
        await uploadFile(_file, options)
      }
    } catch (error) {
      next(error);
    }
  }
}
