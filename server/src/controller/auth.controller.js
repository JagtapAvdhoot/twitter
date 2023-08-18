const { hashSync, compareSync } = require("bcrypt");
const { series } = require("async");
const { randomUUID } = require("crypto");
const { Op } = require("sequelize");

const models = require("../model");
const asyncHandler = require("../middleware/asyncHandler");
const {
    validateEmail,
    validateFullName,
    validatePassword,
    validateUsername,
} = require("../validator/user.validator");
const { sendErrorResponse, sendSuccessResponse } = require("../util/response");
const { signToken } = require("../util/jwt");

const { User } = models;

exports.register = asyncHandler(async (req, res) => {
    const { username, fullName, password, email } = req.body;

    // const isValidUsername = validateUsername(username);
    // const isValidEmail = validateEmail(email);
    // const isValidFullName = validateFullName(fullName);
    // const isValidPassword = validatePassword(password);
    // if (!isValidUsername || !isValidEmail || !isValidFullName || !isValidPassword) {
    //     return sendErrorResponse({ res, status: 400 })
    // }
    const newPassword = hashSync(password, 13);

    const createUser = await User.create({
        id: randomUUID(),
        username,
        email,
        fullName,
        password: newPassword,
    });

    await createUser.save();

    const token = signToken({ id: createUser.id });

    sendSuccessResponse({ res, data: { token } });
});
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return sendErrorResponse({ res, status: 400 });

    const requestedUser = await User.findOne({
        where: {
            email,
        },
    });

    if (!requestedUser) return sendErrorResponse({ res, status: 404 });

    const isPasswords = compareSync(password, requestedUser.password);

    if (!isPasswords) return sendErrorResponse({ res, status: 400 });

    const token = signToken({ id: requestedUser.id });

    sendSuccessResponse({ res, data: { token } });
});
exports.logout = asyncHandler(async (req, res) => {});
