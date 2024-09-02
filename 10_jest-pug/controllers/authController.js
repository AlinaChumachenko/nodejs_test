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

export const forgotPassword = catchAsync(async (req, res) => {
  // validate req.body (email?)
  const user = await userService.getUserByEmail(req.body.email);
  if (!user) return res.status(200).json({ msg: 'Password reset send to email' });

  const otp = user.createPasswordResetToken();

  await user.save();

  console.log({ otp });

  user.passwordResetToken = undefined;
  user.passwordResetTokenExp = undefined;

  res.status(200).json({ msg: 'Password reset send to email' });
});

export const restorePassword = catchAsync(async (req, res) => {
  // must validate password with regexp
  await userService.restorePassword(req.params.otp, req.body.password);
  res.status(200).json({
    msg: 'Success!',
  });
});
