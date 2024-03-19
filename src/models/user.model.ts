import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import { emailValidation } from '../helpers/emailValidation.ts';
import { passwordValidation } from '../helpers/passwordValidation.ts';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'Name is required field!'],
    maxLength: [100, 'Length should be less than 100 characters'],
  },
  email: {
    type: String,
    require: [true, 'Email is required field'],
    unique: true,
    validate: {
      validator: function (value: string) {
        return emailValidation(value);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Your password should be longer then 7 char'],
    select: false,
    validate: {
      validator: function (value: string) {
        return passwordValidation(value);
      },
      message:
        'Password should contain 8 characters,\n at least 1 lower case and 1 upper case letter,\n at lease one number and "_" symbol',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'owner'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.models.User ||
  mongoose.model<IUser>('User', userSchema);
