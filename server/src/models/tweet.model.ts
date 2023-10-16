import { Schema, model, Document } from "mongoose";

interface IUserWithTime {
  user: string;
  time: Date;
}
interface IReport {
  user: string;
  time: Date;
  message: string;
}
export interface IMedia {
  url: string;
  secure_url: string;
  public_id: string;
  index: number;
  type: string;
}
interface IReplies {
  tweetId: string;
  time: Date;
}
export interface ITweet extends Document {
  _id: string;
  desc: string;
  author: string;
  location: string;
  replyingTo: string;
  audience: "everyone" | "circle";
  whoCanReply: "everyone" | "peopleFollowed" | "peopleMentioned";
  schedule: Date;
  replies: IReplies[];
  media: IMedia[];
  reports: IReport[];
  likes: IUserWithTime[];
  bookmarks: IUserWithTime[];
  views: number;
  isDraft: Boolean;
}

const tweetSchema = new Schema<ITweet>(
  {
    desc: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    location: String,
    isDraft: {
      type: Boolean,
      default: false,
    },
    schedule: {
      type: Date,
      default: Date.now(),
    },
    audience: String,
    whoCanReply: String,

    replyingTo: String,
    replies: [],

    media: [],
    reports: [],
    likes: [],
    bookmarks: [],
    views: Number,
  },
  {
    timestamps: true,
  }
);

const Tweet = model<ITweet>("Tweet", tweetSchema, "tweets");

export default Tweet;
