import { Response } from "express";

export const sendSuccessResponse = (
  // res: Response<{}, Record<string, any>>,
  res: any,
  status: number = 200,
  data: Record<any, any> = {}
) => {
  return res.status(status).json({
    success: true,
    data,
  });
};

export const sendErrorResponse = (
  res: any,
  status: number = 500,
  message: string = "internal server error"
) => {
  return res.status(status).json({
    success: false,
    message,
  });
};
