import {
  FilterQuery,
  QueryOptions,
  SortOrder,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from "mongoose";

import User, { IUser } from "../models/user.model";

export const createUser = async (
  // username: string,
  // email: string,
  // fullName: string,
  // password: string
  body: Partial<IUser>
) => {
  const newUser = new User({
    username: body.username,
    email: body.email,
    fullName: body.fullName,
    password: body.password,
  });

  return await newUser.save();
};

interface IFindUser {
  filter: FilterQuery<IUser>;
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
  filter,
  select = "-__v -updatedAt",
  limit = 1,
  sort = "asc",
  skip = 0,
}: IFindUser) => {
  return await User.find(filter)
    .select(select)
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

interface IUpdateUser {
  filter: FilterQuery<IUser>;
  update: UpdateQuery<IUser> | UpdateWithAggregationPipeline;
  options?: QueryOptions<IUser> | null | undefined;
}

export const updateUser = async ({
  filter,
  update,
  options = {},
}: IUpdateUser) => {
  return await User.updateOne(filter, update, options);
};
