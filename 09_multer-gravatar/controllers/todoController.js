import { todoService } from '../serveces/index.js';
import { catchAsync } from '../utils/index.js';

export const cresteTodo = catchAsync(async (req, res) => {
  const newTodo = await todoService.createTodo(req.body, req.user);

  res.status(201).json({
    msg: 'Success!',
    todo: newTodo
  });
});

export const getTodos = catchAsync(async (req, res) => {
  const { todos, total } = await todoService.getTodos(req.query, req.user);

  res.status(201).json({
    msg: 'Success!',
    total,
    todos,
  });
});
