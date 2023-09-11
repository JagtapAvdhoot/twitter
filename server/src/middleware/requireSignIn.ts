import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "./createError";
import { verifyJWT } from "../utils/jwt";

export const requireSignIn = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) return next(new createError(403, "no token"));

  const token = authorization.split("9ouDHlE_")[1];

  try {
    const payload = verifyJWT(token);

    if (!payload) return next(new createError(401, ""));

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};

export const optionalSignIn = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  const token = authorization?.split("9ouDHlE_")[1];

  try {
    if (token) {
      const payload = verifyJWT(token);

      req.user = payload;
    }

    next();
  } catch (error) {
    next(error);
  }
};
