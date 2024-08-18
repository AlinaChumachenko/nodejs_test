import { v4 } from 'uuid'; // Для генерації унікального ідентифікатора
import { promises as fs } from 'fs'; // для роботи з файлами , наприклад збереження у файл

import HttpError from '../utils/httpError.js';
import catchAsync from '../utils/catchAsync.js';
import createUserDataValidator from '../utils/userValidators.js';

const createUser = catchAsync(async (req, res) => {
  const { value, error } = createUserDataValidator(req.body);
  if (error) throw new HttpError(400, 'Invalid user data!');
  // console.log({ user: req.body })
  // const { name, year } = req.body;
  const { name, year } = value;
  // TODO req.body validation- обов'язково треба перевіряти те що нам приходить від користувача
  const newUser = {
    id: v4(),
    name,
    year
  };
  // Save user to the 'db'
  const usersDB = await fs.readFile('data.json'); // поверне buffer
  const users = JSON.parse(usersDB); // поверне обєкт

  console.log({ users });

  users.push(newUser);// додавання нового обєкту в масив
  await fs.writeFile('data.json', JSON.stringify((users)));// перезаписуємо файл та перетворюємо обєкт в json

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
