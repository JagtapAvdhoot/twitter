const status = require("http-status");
const { sendErrorResponse } = require("../util/response");
const { decodeToken } = require("../util/jwt");

const optionalSignIn = (req, res, next) => {
    const authorization = req.headers.authorization || req.headers['authorization'];
    try {
        const payload = decodeToken(authorization);

        req.local.user = payload;

        next();
    } catch (error) {
        sendErrorResponse({ res, status: status.FORBIDDEN })
    }
};

module.exports= optionalSignIn;