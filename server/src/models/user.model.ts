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
interface ITweetCreate {
  tweet: string;
  time: Date;
}

export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  password: string;
  bio: string;
  website: string;
  followers: IUserWithTime[];
  followings: IUserWithTime[];
  reports: IReport[];
  list: [];
  tweetLiked: IUserWithTime[];
  tweetBookmarked: IUserWithTime[];
  tweetCreated: ITweetCreate[];
  notifications: [];
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
    password: {
      type: String,
      required: true,
    },
    bio: String,
    website: String,
    avatar:{
      type:String,
      default: 
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
