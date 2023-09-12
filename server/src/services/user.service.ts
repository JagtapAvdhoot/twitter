import {
  FilterQuery,
  QueryOptions,
  SortOrder,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from "mongoose";

import User, { IUser } from "../models/user.model";

export const createUser = async (
  username: string,
  email: string,
  fullName: string,
  password: string
) => {
  const newUser = new User({ username, email, fullName, password });

  return await newUser.save();
};

interface IFindUser {
  identifier: string;
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

export const findUser = async ({
  identifier,
  select = "-__v -updatedAt",
  limit = 1,
  sort = "asc",
  skip = 0,
}: IFindUser) => {
  return await User.find({
    $or: [{ username: identifier }, { email: identifier }, { _id: identifier }],
  })
    .select(select)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

export const updateUser = async (
  filter: FilterQuery<IUser>,
  update: UpdateQuery<IUser> | UpdateWithAggregationPipeline,
  options: QueryOptions<IUser> | null | undefined = {}
) => {
  return await User.updateOne(filter, update, options);
};
