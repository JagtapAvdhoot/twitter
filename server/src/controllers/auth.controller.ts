import { RequestHandler } from "express";
import { z } from "zod";

import User from "../models/user.model";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateUsername,
} from "../validators/user.validator";
import createError from "../middleware/createError";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { signJWT } from "../utils/jwt";
import { sendSuccessResponse } from "../utils/response";
import { createUser, findUser } from "../services/user.service";
import { tryEach } from "async";

const signInSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
  remember: z.boolean().optional(),
});

interface ISignInBody {
  usernameOrEmail: string;
  password: string;
  remember: boolean;
}

export const signIn: RequestHandler<{}, any, ISignInBody> = async (
  req,
  res,
  next
) => {
  const { usernameOrEmail, password, remember } = await signInSchema.parseAsync(
    req.body
  );

  if (!usernameOrEmail || !password) return next(new createError(400, ""));

  try {
    const user = await findUser({
      filter: {
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
      select: "password _id",
    });

    if (!user[0]) return next(new createError(404, "not found"));

    const matchPassword = comparePassword(password, user[0].password);

    if (!matchPassword) return next(new createError(400, ""));

    const token = signJWT({ _id: user[0]._id });

    if (!token) return next(new createError());

    sendSuccessResponse({ res, data: { token } });
  } catch (error) {
    next(error);
  }
};

const signUpSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
  fullName: z.string(),
  remember: z.boolean().optional(),
});

interface IRegister {
  username: string;
  email: string;
  fullName: string;
  password: string;
  remember?: boolean;
}

export const register: RequestHandler<{}, {}, IRegister> = async (
  req,
  res,
  next
) => {
  const { email, fullName, password, username, remember } =
    await signUpSchema.parseAsync(req.body);

  if (!username || !password || !fullName || !email)
    return next(new createError(400, ""));

  const _password = hashPassword(password);

  // validations

  try {
    const newUser = await createUser({
      username,
      email,
      fullName,
      password: _password,
    });

    const token = signJWT({ _id: newUser._id });

    if (!token) return next(new createError());

    sendSuccessResponse({ res, data: { token } });
  } catch (error) {
    next(error);
  }
};

export const forgetPassword: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

// TODO: create two routes of google, twitter, github sign in and sign up

export const signUpWithGoogle: RequestHandler = async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
};

export const signUpWithTwitter: RequestHandler = async (req, res, next) => {};
export const signUpWithGithub: RequestHandler = async (req, res, next) => {};
