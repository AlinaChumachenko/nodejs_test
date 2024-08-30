import { jwtService, userService } from '../serveces/index.js';
import { catchAsync, HttpError } from '../utils/index.js';
import { loginValidator, signupUserDataValidator } from '../utils/userValidators.js';

export const checkSignupData = catchAsync(async (req, res, next) => {
  const { value, error } = signupUserDataValidator(req.body);

  if (error) throw new HttpError(400, 'Invalid user data..', error);

  await userService.checkUserExists({ email: value.email });

  req.body = value;

  next();
});

export const checkLoginData = (req, res, next) => {
  const { value, error } = loginValidator(req.body);

  if (error) throw new HttpError(401, 'Not authortized..', error); // 401 бо це не тавторизовано

  req.body = value;

  next();
};

export const protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1];
  const userId = jwtService.checkToken(token);

  if (!userId) throw new HttpError(401, 'Not logged in..');

  const currentUser = await userService.getUserById(userId);

  if (!currentUser) throw new HttpError(401, 'Not logged in..');

  req.user = currentUser;

  next();
});
// allowFor('admin', 'moderator', 'user')
export const allowFor = (...roles) => (req, res, next) => {
  // roles = ['admin', 'moderator', 'user'];

  if (!roles.includes(req.user.role)) return next();

  next(new HttpError(403, 'You are not allowed to perform this action..'));
};
