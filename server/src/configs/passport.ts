import passport from "passport";

import githubPassport from "passport-github";
import googlePassport from "passport-google-oauth20";

import { createUser, findUser } from "../services/user.service";
import User from "../models/user.model";

const GitHubStrategy = githubPassport.Strategy;
const GoogleStrategy = googlePassport.Strategy;

passport.serializeUser(function (user, done) {
  console.log(user, "from serialize user");
  done(null, user);
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  console.log(user, id, "from serialize user");
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      // scope: ["profile", "email"],
      // state: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await findUser({
          identifier: {
            accountId: profile.id,
            provider: profile.provider,
          },
          select: "_id",
        });

        if (!user) {
          await createUser({
            accountId: profile.id,
            username: profile.username,
            fullName: profile.displayName,
            provider: profile.provider,
          });

          return cb(null, profile);
        } else {
          return cb(null, profile);
        }
      } catch (error: any) {
        return cb(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await findUser({
          identifier: {
            accountId: profile.id,
            provider: profile.provider,
          },
          select: "_id",
        });

        if (!user[0]) {
          await createUser({
            accountId: profile.id,
            username: profile.username,
            fullName: profile.displayName,
            provider: profile.provider,
          });

          return cb(null, profile);
        } else {
          return cb(null, profile);
        }
      } catch (error: any) {
        return cb(error);
      }
    }
  )
);
