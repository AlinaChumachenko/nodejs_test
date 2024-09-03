import { catchAsync, HttpError } from '../utils/index.js';
import { createUserDataValidator, updateUserDataValidator } from '../utils/userValidators.js';
import { userService } from '../serveces/index.js';
import { ImageService } from '../serveces/imageService.js';

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

export const checkAndUpdateMyPassword = catchAsync(async (req, res, next) => {
  // current passwd, new passwd
  const { currentPassword, newPassword } = req.body;

  // VALIDATE!!
  await userService.checkAndUpdateUserPassword(req.user.id, currentPassword, newPassword);

  next();
});

// BASIC MULTER USAGE
// config storage

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cbk) => { // де ми зберігаємо файл
//     cbk(null, path.join('public', 'images'));
//   },
//   filename: (req, file, cbk) => {
//     const extension = file.mimetype.split('/')[1]; // 'image/png'
//     // <userId>-<randomId>.<extension>
//     cbk(null, `${req.user.id}-${v4()}.${extension}`); // побудова назви\ім'я файлу
//   },
// });

// config filter
// const multerFilter = (req, file, cbk) => {
//   if (file.mimetype.startsWith('image/')) {
//     cbk(null, true);
//   } else {
//     cbk(new HttpError(400, 'Please, upload only images..'), false);
// }
// };

// export const uploadAvatar = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024,
//   }
// }).single('avatar');

export const uploadAvatar = ImageService.initUploadImageMiddleware('avatar');
