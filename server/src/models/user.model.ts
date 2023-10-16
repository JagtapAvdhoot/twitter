import { Document, Schema, model } from "mongoose";

interface IUserWithTime {
  user: string;
  time: Date;
}
interface IReport {
  user: string;
  time: Date;
  message: string;
}
interface ITweetWithTime {
  tweet: string;
  time: Date;
}

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  password: string;
  bio: string;
  website: string;
  avatar: string;
  followers: IUserWithTime[];
  followings: IUserWithTime[];
  reports: IReport[];
  list: {
    user: string[];
  }[];
  tweetLiked: IUserWithTime[];
  tweetBookmarked: IUserWithTime[];
  tweetCreated: ITweetWithTime[];
  tweetPinned: ITweetWithTime[];
  notifications: [];
  accountId: string;
  provider: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    bio: String,
    website: String,
    avatar: {
      type: String,
      default: "",
    },
    // oauth
    provider: String,
    accountId: {
      type: String,
      unique: true,
    },

    followers: [],
    followings: [],
    reports: [],
    tweetLiked: [],
    tweetBookmarked: [],
    tweetCreated: [],
    list: [],

    // messages: String,
    notifications: [],
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", userSchema, "users");

export default User;
