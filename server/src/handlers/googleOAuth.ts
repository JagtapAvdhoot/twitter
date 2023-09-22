import passport from "passport";

import googlePassport from "passport-google-oauth20";
import { createUser, findUser } from "../services/user.service";

const AuthStrategy = googlePassport.Strategy;

passport.use(
  new AuthStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ["profile"],
      state: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await findUser({
          identifier: {
            accountId: profile.id,
            provider: "github",
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
