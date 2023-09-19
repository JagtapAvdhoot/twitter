import passport from 'passport';

import googlePassport from 'passport-google-oauth';
import { createUser, findUser } from '../services/user.service';

const authStrategy = googlePassport.Strategy;

passport.use(new authStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: "http://127.0.0.1:5000/api/authentication/oauth/github"
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const user = await findUser({
      identifier: {
        accountId: profile.id,
        provider: "github"
      },
      select: "_id"
    })

    if (!user) {
      await createUser({ accountId: profile.id, username: profile.username, fullName: profile.displayName, provider: profile.provider });

      return cb(null, profile)
    } else {
      return cb(null, profile)
    }
  } catch (error: any) {
    return cb(error)
  }
}))

export default passport;
