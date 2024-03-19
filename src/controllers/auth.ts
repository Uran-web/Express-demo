import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import userModel from '../models/user.model.ts';
import { errorHandler } from '../helpers/errorHandler.ts';

const postSignInHandler = (req: Request, res: Response) => {
  // NOTE: Data was handled in middleware
  if (process.env.NODE_ENV === 'development') {
    console.log('req', req);
  }
  res.send('Login was successful');
};

const postSignUpHandler = async (req: Request, res: Response) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
    }

    await userModel.create(req.body);

    res.status(201).json({ message: 'User was created' });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const simplifyErrorObject = errorHandler(err.errors);
      res
        .status(400)
        .send({ error: 'Validation failed', details: simplifyErrorObject });
    } else {
      res.status(500).send('Server error occur');
    }
  }
};

const postSignOutHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.json({ message: 'Signed out' });
};

export { postSignInHandler, postSignUpHandler, postSignOutHandler };
