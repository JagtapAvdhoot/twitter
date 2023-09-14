import { FilterQuery, SortOrder } from "mongoose";
import Tweet from "../models/tweet.model";
import { IUser } from "../models/user.model";

interface IFindTweet {
  identifier: FilterQuery<IUser>; // this is not working
  select: string;
  offset: number;
  limit: number;
  sort: string | { [key: string]: SortOrder } | null | undefined;
};

export const findTweet = async ({ identifier, select = "-__v -updatedAt", sort = "asc", offset = 0, limit = 1 }: IFindTweet) => {
  return await Tweet
    .find(identifier)
    .skip(offset)
    .sort(sort)
    .limit(limit)
    .select(select);
}

export const updateTweet = async () => { };
