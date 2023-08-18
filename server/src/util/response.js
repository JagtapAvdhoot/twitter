exports.sendErrorResponse = ({ res, status = 500, message = 'Internal server error' }) => {
    res.status(status).json({ error: message });
};

exports.sendSuccessResponse = ({ res, status = 200, data = { message: "success" } }) => {
    res.status(status).json(data);
};