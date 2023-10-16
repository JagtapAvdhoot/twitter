import {
  FilterQuery,
  QueryOptions,
  SortOrder,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from "mongoose";
import Tweet, { IMedia, ITweet } from "../models/tweet.model";
import { IUser } from "../models/user.model";

interface IFindTweet {
  filter: FilterQuery<ITweet>;
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
}

export const findTweet = async ({
  filter,
  select = "-__v -updatedAt",
  sort = "asc",
  skip = 0,
  limit = 1,
}: IFindTweet): Promise<ITweet[]> => {
  return await Tweet.find(filter)
    .skip(skip)
    .sort(sort)
    .limit(limit)
    .select(select);
};

interface ITweetUpdate {
  filter: FilterQuery<ITweet>;
  update: UpdateWithAggregationPipeline | UpdateQuery<ITweet> | undefined;
  options?: QueryOptions<ITweet>;
}

export const updateTweet = async ({
  filter,
  update,
  options = {},
}: ITweetUpdate) => {
  return await Tweet.updateOne(filter, update, options);
};

interface ICreateTweet {
  desc?: string;
  author: IUser["_id"];
  media?: IMedia[] | [];
  replyingTo?: string;
  isDraft?: boolean;
  audience?: string;
  whoCanReply?: string;
  location?: string;
}

export const newTweet = async ({
  media = [],
  replyingTo = "",
  author,
  isDraft = false,
  audience = "everyone",
  whoCanReply = "everyone",
  desc,
  location = "",
}: ICreateTweet) => {
  const newTweet = new Tweet({
    media,
    desc,
    location,
    author,
    isDraft,
    replyingTo,
    audience,
    whoCanReply,
  });

  return await newTweet.save();
};

export const removeTweet = async (
  id: string,
  options?: QueryOptions<ITweet> & { lean: true }
) => {
  return await Tweet.findByIdAndDelete(id, options);
};