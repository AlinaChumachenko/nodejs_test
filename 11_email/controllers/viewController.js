import { Todo } from '../models/todoModel.js';
import { catchAsync } from '../utils/index.js';

export const home = (req, res) => {
  res.status(200).render('home', {
    title: 'Todos app home page!',
    active: 'home',
  });
};

export const todosPage = catchAsync(async (req, res) => {
  const todos = await Todo.find().populate('owner');

  res.status(200).render('todos', {
    todos,
    title: 'Todos',
  });
});
