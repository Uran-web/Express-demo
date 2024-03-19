import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import userModel, { IUser } from '../models/user.model.ts';

interface IOptions {
  message: string;
}

type Done = (
  error: any,
  user?: Express.User | false,
  options?: IOptions,
) => void;

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (username: string, password: string, done: Done) => {
      try {
        const user = await userModel
          .findOne({ email: username })
          .select('+password');

        if (!user) done(null, false, { message: 'Incorrect email' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user: IUser, done: Done) => {
  done(null, user.id);
});

passport.deserializeUser(async (email: string, done: Done) => {
  try {
    const user = userModel.findOne({ email });
    done(null, user);
  } catch (err) {
    if (err) {
      done(null, err);
    }
  }
});

export const authenticate = passport.authenticate('local', {
  successRedirect: '/posts',
  failureRedirect: '/login',
});
