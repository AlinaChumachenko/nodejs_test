import { userService } from '../serveces/index.js';
import { catchAsync } from '../utils/index.js';

export const signup = catchAsync(async (req, res) => {
  const { user, token } = await userService.signup(req.body);
  res.status(201).json({
    msg: 'Success!',
    user,
    token
  });
});

export const login = catchAsync(async (req, res) => {
  const { user, token } = await userService.login(req.body);
  res.status(200).json({
    msg: 'Success!',
    user,
    token
});
});
