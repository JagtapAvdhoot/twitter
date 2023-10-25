const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullname: String,
    number: String,
    sessions: [],
    chats: [],
    groupJoined: [],
    channelJoined: [],
    channelCreated: [],
    groupCreated: [],
    status: [],
    activeHidden: false,
  },
  {
    timestamps: true,
  },
);

const User = model("User", userSchema);

module.exports = User;
