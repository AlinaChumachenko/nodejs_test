// import { Types } from 'mongoose';
import { catchAsync, HttpError } from '../utils/index.js';
import { createUserDataValidator, updateUserDataValidator } from '../utils/userValidators.js';
// import { User } from '../models/userModel.js';
import { userService } from '../serveces/index.js';

export const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { value, error } = createUserDataValidator(req.body);

  if (error) throw new HttpError(400, 'Invalid user data..', error);
  await userService.checkUserExists({ email: value.email });
  req.body = value;

  next();
});

export const checkUpdateUserData = catchAsync(async (req, res, next) => {
  const { value, error } = updateUserDataValidator(req.body);
  // console.log(req.body);
  // console.log(error);

  if (error) throw new HttpError(400, 'Invalid user data..', error);
  await userService.checkUserExists({ email: value.email, _id: { $ne: req.params.id } });

  req.body = value;

  next();
});

export const checkUserId = catchAsync(async (req, res, next) => {
  await userService.checkUserId(req.params.id);

  next();
});
