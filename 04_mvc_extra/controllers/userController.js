import { v4 } from 'uuid'; // Для генерації унікального ідентифікатора
import { promises as fs } from 'fs'; // для роботи з файлами , наприклад збереження у файл

const createUser = async (req, res) => {
  try {
    // console.log({ user: req.body })
    const { name, year } = req.body;
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
  } catch (error) {
    console.log(error);
  }
};

const getUsersList = async (req, res) => {
  try {
    const usersDB = await fs.readFile('data.json'); // поверне buffer
    const users = JSON.parse(usersDB); // поверне обєкт
    res.status(201).json({
      msg: 'Success!',
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneUser = async (req, res) => {
// console.log(req.params);
  try {
    await res.status(201).json({
      msg: 'Success!',
      // user: users.find(user => user.id === req.params.id),
      user: req.user,
      time: req.time
    });
  } catch (error) {
    console.log(error);
  }
};

export { createUser, getUsersList, getOneUser };
