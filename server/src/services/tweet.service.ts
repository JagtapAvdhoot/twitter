import { FilterQuery, SortOrder } from "mongoose";
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

export const updateTweet = async () => { };
