import { Schema, model } from "mongoose";

const tweetSchema = new Schema(
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
    replies:[],

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

const Tweet = model("Tweet", tweetSchema, "tweets");

export default Tweet;
