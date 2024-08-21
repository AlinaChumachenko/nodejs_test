import { catchAsync } from '../utils/index.js';
import { User } from '../models/userModel.js';

export const createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  newUser.password = undefined;

  res.status(201).json({
    msg: 'Success!',
    user: newUser,
  });
});

export const getUsersList = catchAsync(async (req, res) => {
  const users = await User.find();
  // const users = await User.find().select('+password');
  // const users = await User.find().select('-email');
  // const users = await User.find().select('name email');

  res.status(201).json({
    msg: 'Success!',
    users,
  });
});

export const getOneUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(201).json({
    msg: 'Success!',
    user,
  });
});

export const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({
    msg: 'Success!',
    user: updatedUser,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});
