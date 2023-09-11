import { RequestHandler, ErrorRequestHandler } from "express";
import { sendErrorResponse } from "../utils/response";

const notFoundHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  return sendErrorResponse({
    res,
    status: 404,
    message: "not a registered route",
  });
};

export default notFoundHandler;
