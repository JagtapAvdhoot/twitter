const httpStatus = require("http-status");
const { randomUUID } = require("crypto");

const asyncHandler = require("../middleware/asyncHandler");
const models = require("../model");
const { sendErrorResponse, sendSuccessResponse } = require("../util/response");
const { Op } = require("sequelize");
const { uploadFilesToCloudinary } = require("../util/cloudinary");
const { audience } = require("../util/audience");

const { User, Tweet } = models;

exports.createTweet = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const {
        desc,
        replyingTo = "",
        audience = "everyone",
        whoCanReply = "everyone",
        media = [],
        location,
    } = req.body;
    let uploads = [];

    if (media) {
        const [err, results] = await uploadFilesToCloudinary(media, {
            folder: "twt_clone",
        });

        if (err) {
            return sendErrorResponse({ res });
        }

        if (results) {
            uploads = results;
        }
    }

    const newTweet = await Tweet.create({
        id: randomUUID(),
        desc,
        replyingTo,
        audience,
        author: signedUser.id,
        whoCanReply,
        media: uploads,
    });

    sendSuccessResponse({ res, data: { tweet: newTweet } });
});

exports.getUserTweetFeed = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { ofs, lmt } = req.query;
    const limit = Number(lmt) || 10;
    const offset = Number(ofs) * limit || 0;

    const usersFollowing = await User.findByPk(signedUser.id);

    const following = usersFollowing.following.map((item) => item.user);

    const tweets = await Tweet.findAll({
        offset,
        limit,
        where: {
            author: {
                [Op.in]: following,
            },
        },
        order: [["createdAt", "DESC"]],
    });

    sendSuccessResponse({ res, data: { tweets } });
});
exports.getGlobalTweetFeed = asyncHandler(async (req, res) => {
    const { ofs, lmt } = req.query;
    const limit = Number(lmt) || 10;
    const offset = Number(ofs) * limit || 0;

    const tweets = await Tweet.findAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]],
    });

    sendSuccessResponse({ res, data: { tweets } });
});

exports.likeTweet = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid } = req.query;

    const requestedTweet = await Tweet.findByPk(pid);

    const isLiked = requestedTweet.tweetLikes.findIndex(
        (item) => item.user === signedUser.id
    );

    if (isLiked !== -1) {
        // exists
        const likesArray = requestedTweet.tweetLikes.filter(
            (item) => item.user !== signedUser.id
        );
        await Tweet.update(
            {
                tweetLikes: likesArray,
            },
            {
                where: {
                    id: pid,
                },
            }
        );
    } else {
        // do not exists
        const likesArray = requestedTweet.tweetLikes.push({
            user: signedUser.id,
            time: Date.now(),
        });
        await Tweet.update(
            {
                tweetLikes: likesArray,
            },
            {
                where: {
                    id: pid,
                },
            }
        );
    }

    sendSuccessResponse({ res });
});

exports.saveTweet = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid } = req.query;

    const requestedTweet = await Tweet.findByPk(pid);

    const isSaved = requestedTweet.tweetSaves.findIndex(
        (item) => item.user === signedUser.id
    );

    if (isSaved !== -1) {
        // exists
        const savesArray = requestedTweet.tweetSaves.filter(
            (item) => item.user !== signedUser.id
        );
        await Tweet.update(
            {
                tweetSaves: savesArray,
            },
            {
                where: {
                    id: pid,
                },
            }
        );
    } else {
        // do not exists
        const savesArray = requestedTweet.tweetSaves.push({
            user: signedUser.id,
            time: Date.now(),
        });
        await Tweet.update(
            {
                tweetSaves: savesArray,
            },
            {
                where: {
                    id: pid,
                },
            }
        );
    }

    sendSuccessResponse({ res });
});

exports.reportTweet = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid } = req.query;
    const { message } = req.body;

    const requestedTweet = await Tweet.findByPk(pid);

    const isReported = requestedTweet.tweetReports.findIndex(
        (item) => item.user === signedUser.id
    );

    if (isReported !== -1) {
        return sendErrorResponse({ res, status: httpStatus.CONFLICT });
    } else {
        // do not exists
        const savesArray = requestedTweet.tweetReports.push({
            user: signedUser.id,
            message,
            time: Date.now(),
        });
        await Tweet.update(
            {
                tweetReports: savesArray,
            },
            {
                where: {
                    id: pid,
                },
            }
        );
    }

    sendSuccessResponse({ res });
});

exports.addView = asyncHandler(async (req, res) => {
    const { pid } = req.query;

    const requestedTweet = await Tweet.findByPk(pid);

    const count = Number(requestedTweet.tweetViews) + 1;

    await Tweet.update(
        {
            tweetViews: count,
        },
        {
            where: {
                id: pid,
            },
        }
    );

    sendSuccessResponse({ res });
});

exports.changeAudience = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid } = req.query;
    const { changeTo } = req.body;

    const isValidChangeTo = audience.includes(changeTo);

    if (!isValidChangeTo)
        return sendErrorResponse({ res, status: httpStatus.CONFLICT });

    await Tweet.update(
        {
            audience: changeTo,
        },
        {
            where: {
                id: pid,
            },
        }
    );

    sendSuccessResponse({ res });
});

exports.updateTweet = asyncHandler(async (req, res) => {
    const { pid } = req.query;
    const { desc } = req.body;

    await Tweet.update(
        {
            desc,
        },
        {
            where: {
                id: pid,
            },
        }
    );

    sendSuccessResponse({ res });
});
