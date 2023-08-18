const status = require("http-status");
const { sendErrorResponse } = require("../util/response");
const { verifyToken } = require("../util/jwt");

const requireSignIn = (req, res, next) => {
    const authorization = req.headers.authorization || req.headers['authorization'];

    if (!authorization) return sendErrorResponse({ res, status: status.UNAUTHORIZED });

    try {
        const payload = verifyToken(authorization);

        if (!payload) return sendErrorResponse({ res, status: status.FORBIDDEN })

        req.user = payload;

        next();
    } catch (error) {
        console.log('requireSignIn.js:19', error);
        sendErrorResponse({ res, status: status.FORBIDDEN })
    }
};

module.exports = requireSignIn;