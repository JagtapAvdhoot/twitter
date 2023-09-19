import { FilterQuery, QueryOptions, SortOrder, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
import Tweet, { IMedia, ITweet } from "../models/tweet.model";
import { IUser } from "../models/user.model";

interface IFindTweet {
  identifier: FilterQuery<ITweet>;
  select?: string | string[] | Record<string, number | boolean | object>;
  limit?: number;
  sort?:
  | string
  | {
    [key: string]:
    | SortOrder
    | {
      $meta: any;
    };
  }
  | [string, SortOrder][]
  | null
  | undefined;
  skip?: number;
};

export const findTweet = async ({ identifier, select = "-__v -updatedAt", sort = "asc", skip = 0, limit = 1 }: IFindTweet) => {
  return await Tweet
    .find(identifier)
    .skip(skip)
    .sort(sort)
    .limit(limit)
    .select(select);
}

interface ITweetUpdate {
  filter: FilterQuery<ITweet>;
  update: UpdateWithAggregationPipeline | UpdateQuery<ITweet> | undefined;
  options?: QueryOptions<ITweet>;
}

export const updateTweet = async ({ filter, update, options = {} }: ITweetUpdate) => {
  return await Tweet.updateOne(filter, update, options)
};

interface ICreateTweet {
  media: IMedia | [];
  replyingTo: string;
  author: IUser["_id"];
  isDraft: boolean;
  audiance: string;
  whoCanReply: string;
  desc: string;
  location: string
}

export const newTweet = async ({ media = [], replyingTo = "", author, isDraft = false, audiance = "everyone", whoCanReply = "everyone", desc, location = "" }: ICreateTweet) => {
  const newTweet = new Tweet({ media, desc, location, author, isDraft, replyingTo, audiance, whoCanReply })

  return await newTweet.save();
};
