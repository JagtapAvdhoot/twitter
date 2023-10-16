import passport from "passport";

import githubPassport from "passport-github";
import { createUser, findUser } from "../services/user.service";

const AuthStrategy = githubPassport.Strategy;

passport.use(
  new AuthStrategy(
    {
      clientID: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      callbackURL: process.env.TWITTER_CALLBACK_URL!,
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

export default passport;
