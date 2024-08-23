import { catchAsync } from '../utils/index.js';
import { userService } from '../serveces/index.js';

export const createUser = catchAsync(async (req, res) => {
  const newUser = await userService.createUser(req.body);
  newUser.password = undefined;

  res.status(201).json({
    msg: 'Success!',
    user: newUser,
  });
});

export const getUsersList = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(201).json({
    msg: 'Success!',
    users,
  });
});

export const getOneUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(201).json({
    msg: 'Success!',
    user,
  });
});

export const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);

  res.status(200).json({
    msg: 'Success!',
    user: updatedUser,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  await userService.hideUser(req.params.id);

  res.sendStatus(204);
});
