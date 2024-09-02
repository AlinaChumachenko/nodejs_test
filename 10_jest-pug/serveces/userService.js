// import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Types } from 'mongoose';
import { User } from '../models/userModel.js';
import { HttpError, userNameHandler } from '../utils/index.js';
import { userRoles } from '../constants/userRoles.js';
import * as jwtService from './jwtService.js';
import { ImageService } from './imageService.js';

export const createUser = async (userData) => {
  const newUser = await User.create(userData);

  newUser.password = undefined;
  return newUser;
};

export const getAllUsers = () => User.find();

export const getUserById = (id) => User.findById(id);

export const updateUser = async (id, userData) => {
// User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  const user = await User.findById(id);

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};
export const hideUser = (id) => User.findByIdAndDelete(id);

export const checkUserExists = async (filter) => {
  const userExists = await User.exists(filter);

  if (userExists) throw new HttpError(409, 'User already exists..');
};

export const checkUserId = async (id) => {
  const isIdValid = Types.ObjectId.isValid(id);

  if (!isIdValid) throw new HttpError(404, 'User not found..');

  const userExists = await User.exists({ _id: id });

  if (!userExists) throw new HttpError(404, 'User not found..');
};

export const signup = async (userData) => {
  const { name, ...restUserData } = userData;
  const newUser = await User.create({
    ...restUserData,
    name: userNameHandler(name),
    role: userRoles.USER
  });
  newUser.password = undefined;
  const token = jwtService.signToken(newUser.id);
  return { user: newUser, token };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new HttpError(401, 'Not authorized..');
  const isPasswordValid = await user.checkPassword(password, user.password);
  if (!isPasswordValid) throw new HttpError(401, 'Not authorized..');
  user.password = undefined;
  const token = jwtService.signToken(user.id);
  return { user, token };
};

export const updateMe = async (userData, user, file) => {
  if (file) {
    // userData.avatar = file.path.replace('public', '');
    user.avatar = await ImageService.saveImage(
      file,
      {
        maxFileSize: 2,
        width: 400,
        height: 400,
      },
      'images',
      'users',
      user.id
    );
  }
  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });
};

export const getUserByEmail = (email) => User.findOne({ email });

export const restorePassword = async (otp, newPassword) => {
  const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

  const user = await User.findOne({
    passwordResetToken: otpHash,
    passwordResetTokenExp: { $gt: Date.now() },

  });

  if (!user) throw new HttpError(400, 'Token is invalid..');

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExp = undefined;

  await user.save();
};
