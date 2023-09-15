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
interface IMedia {
  url: string;
  secure_url: string;
  public_id: string;
  index: number;
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
  replies: IReplies[];
  media: IMedia[];
  reports: IReport[];
  likes: IUserWithTime[];
  bookmarks: IUserWithTime[];
  views: number;
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
