// import { v4 } from 'uuid'; // Для генерації унікального ідентифікатора
import { promises as fs } from 'fs'; // для роботи з файлами , наприклад збереження у файл

// import HttpError from '../utils/httpError.js';
import catchAsync from '../utils/catchAsync.js';
// import createUserDataValidator from '../utils/userValidators.js';
import { User } from '../models/userModel.js';

const createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  newUser.password = undefined; // щоб не повертати в респонсі пароль.секретні данні.
  res.status(201).json({
    msg: 'Success!',
    user: newUser,
  });
});

const getUsersList = catchAsync(async (req, res) => {
  const usersDB = await fs.readFile('data.json'); // поверне buffer
  const users = JSON.parse(usersDB); // поверне обєкт
  res.status(201).json({
    msg: 'Success!',
    users,
  });
});

const getOneUser = (req, res) => {
// console.log(req.params);
  res.status(201).json({
    msg: 'Success!',
    // user: users.find(user => user.id === req.params.id),
    user: req.user,
    time: req.time
  });
};

export { createUser, getUsersList, getOneUser };
