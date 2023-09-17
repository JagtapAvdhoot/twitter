import { FilterQuery, QueryOptions, SortOrder, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
import Tweet, { ITweet } from "../models/tweet.model";

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
