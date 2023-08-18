const httpStatus = require("http-status");

const asyncHandler = require("../middleware/asyncHandler");
const models = require("../model");
const { sendErrorResponse, sendSuccessResponse } = require("../util/response");
const { Op } = require("sequelize");

const { User } = models;

// working
exports.follow = asyncHandler(async (req, res) => {
    const { uid } = req.query;
    const user = req.user;

    if (uid === user.id) return sendErrorResponse({ res, status: 400 });

    const userOne = await User.findByPk(uid);
    const userTwo = await User.findByPk(user.id);

    if (!userOne || !userTwo)
        return sendErrorResponse({ res, status: httpStatus.BAD_REQUEST });

    const { following } = userOne;
    const { follower } = userTwo;

    const isFollowing = following.findIndex((item) => item.user === user.id);
    const isFollower = follower.findIndex((item) => item.user === uid);

    if (isFollower === -1 && isFollowing === -1) {
        following.push({ user: user.id });
        follower.push({ user: uid });
    } else {
        following.splice(isFollowing, 1);
        follower.splice(isFollower, 1);
    }

    // following update user two
    const followingUpdatePromise = User.update(
        {
            following,
        },
        {
            where: {
                id: uid,
            },
        }
    );
    // follower update user one
    const followerUpdatePromise = User.update(
        {
            follower,
        },
        {
            where: {
                id: user.id,
            },
        }
    );

    const settledPromise = await Promise.allSettled([
        followerUpdatePromise,
        followingUpdatePromise,
    ]);

    console.log("user.controller.js:47", settledPromise);

    sendSuccessResponse({ res });
});

exports.remove = asyncHandler(async (req, res) => {
    const user = req.user;

    await User.destroy({
        where: {
            id: user.id,
        },
    });

    sendSuccessResponse({ res });
});

exports.report = asyncHandler(async (req, res) => {});

exports.update = asyncHandler(async (req, res) => {});

exports.search = asyncHandler(async (req, res) => {
    const { str } = req.query;

    const users = await User.findAll({
        where: {
            username: {
                [Op.like]: str,
            },
        },
    });

    if (!users) return sendSuccessResponse({ res, data: { users: [] } });

    sendSuccessResponse({ res, data: { users } });
});

exports.me = asyncHandler(async (req, res) => {
    const signedUser = req.user;

    const user = await User.findOne({
        where: {
            id: signedUser.id,
        },
    });

    if (!user) return sendErrorResponse({ res, status: 404 });

    sendSuccessResponse({ res, data: { user } });
});

exports.profile = asyncHandler(async (req, res) => {});

exports.follower = asyncHandler(async (req, res) => {});

exports.following = asyncHandler(async (req, res) => {});

exports.liked = asyncHandler(async (req, res) => {});

exports.commented = asyncHandler(async (req, res) => {});
