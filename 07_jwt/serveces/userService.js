// import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { User } from '../models/userModel.js';
import { HttpError } from '../utils/httpError.js';

export const createUser = async (userData) => {
  const newUser = await User.create(userData);
  // const newUser = User(userData); // створили обєкт з даними з форми
  // await newUser.save(); // зберегли обєкт в базу даних
  newUser.password = undefined;
  return newUser;
};

export const getAllUsers = () => User.find();
// export const getAllUsers = async () => {
//   const users = await User.find();
//   // const users = await User.find().select('+password');
//   // const users = await User.find().select('-email');
//   // const users = await User.find().select('name email');

//   return users;
// };

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
  // const userExists = await User.findById(id).select('_id');

  if (!userExists) throw new HttpError(404, 'User not found..');
};
