import { promises as fs } from 'fs'; // для роботи з файлами , наприклад збереження у файл
import HttpError from '../utils/httpError.js';
import catchAsync from '../utils/catchAsync.js';
import createUserDataValidator from '../utils/userValidators.js';
import { User } from '../models/userModel.js';

// MIDDLEWARE відпрацьовують на конкретному.зазначеному ендпоінті

const checkCreateUserData = catchAsync(async (req, res, next) => {
  const { value, error } = createUserDataValidator(req.body);
  if (error) throw new HttpError(400, 'Invalid user data!');
  const userExist = await User.exists({ email: value.email });// перевірка наявності юзера
  if (userExist) throw new HttpError(409, 'User already exist!');
  req.body = value;
  next();
});

const chekUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // if (id.length < 10) {
  //   return res.status(400).json({
  //     msg: 'Id is too short id!'
  //   });
  // }
  if (id.length < 10) throw new HttpError(400, 'Id is too short id!');

  const usersDB = await fs.readFile('data.json'); // поверне buffer
  const users = JSON.parse(usersDB); // поверне обєкт
  const user = users.find((item) => item.id === req.params.id);

  // if (!user) {
  //   return res.status(404).json({
  //     msg: 'User not found!',
  //   });
  // }
  if (!user) throw new HttpError(404, 'User not found!');

  req.user = user;
  next();
});

export {
  chekUserId,
  checkCreateUserData
};
