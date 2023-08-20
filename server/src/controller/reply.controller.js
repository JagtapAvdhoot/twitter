const async = require("async");

const { sendErrorResponse, sendSuccessResponse } = require("../util/response");
const models = require("../model");
const asyncHandler = require("../middleware/asyncHandler");
const createUUID = require("../util/uuid");

const { Tweet, User, Reply } = models;

exports.addReply = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, cid } = req.query;
    const { message, replyTo = "", tweet } = req.body;

    const newReply = {
        id: createUUID(),
        user: signedUser.id,
        message,
        likes: [],
        replies: [],
        tweet,
        replyTo,
    };

    const twt = await Tweet.findByPk(pid);
    const twtReplies = twt.tweetReplies.push({ tweet: newReply.id });
    const usr = await User.findByPk(signedUser.id);
    const usrReplies = usr.tweetReplied.push({ tweet: newReply.id });

    const replyCreate = Reply.create(newReply);
    const tweetUpdate = Tweet.update(
        {
            tweetReplies: twtReplies,
        },
        {
            where: {
                id: pid,
            },
        }
    );
    const userUpdate = User.update(
        {
            tweetReplied: usrReplies,
        },
        {
            where: {
                id: signedUser.id,
            },
        }
    );

    await Promise.all([replyCreate, tweetUpdate, userUpdate]).catch((err) => {
        sendErrorResponse({ res });
    });

    sendSuccessResponse({ res });
});

exports.deleteReply = asyncHandler(async (req, res) => {});

exports.updateReply = asyncHandler(async (req, res) => {});

exports.likeReply = asyncHandler(async (req, res) => {});
