import { ErrorRequestHandler } from "express";
import { sendErrorResponse } from "../utils/response";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);

  return sendErrorResponse({
    res,
    status: error.status,
    message: error.message,
  });
};

export default errorHandler;
