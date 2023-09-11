import {
  FilterQuery,
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
}

export const findUser = async ({
  identifier,
  select = "-__v -updatedAt",
  limit = 1,
  sort = "asc",
}: IFindUser) => {
  return await User.find({
    $or: [{ username: identifier }, { email: identifier }, { _id: identifier }],
  })
    .select(select)
    .limit(limit)
    .sort(sort);
};

export const updateUser = async (
  _id: string,
  what: UpdateQuery<IUser> | UpdateWithAggregationPipeline
) => {
  return await User.updateOne(
    {
      _id,
    },
    {
      what,
    }
  );
};
