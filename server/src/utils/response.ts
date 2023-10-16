import { Response } from "express";

interface ISuccessResponse {
  res: any;
  status?: number;
  data?: Record<any, any>;
}

export const sendSuccessResponse = ({
  res,
  status = 200,
  data = {},
}: ISuccessResponse) => {
  return res.status(status).json({
    success: true,
    data,
  });
};

interface IErrorResponse {
  res: any;
  status?: number;
  message?: string;
}

export const sendErrorResponse = ({
  res,
  status = 500,
  message = "internal server error",
}: IErrorResponse) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
