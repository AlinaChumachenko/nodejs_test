import { userRoles } from '../constants/index.js';
import { Todo } from '../models/todoModel.js';
import { HttpError } from '../utils/httpError.js';

export const createTodo = (todoDate, owner) => {
  const { title, description, due } = todoDate;

  return Todo.create({
    title,
    description,
    due,
    owner
  });
};

export const getTodos = async (query, currentUser) => {
  // const todos = await Todo.find().populate('owner');
  // const todos = await Todo.find().populate({ path: 'owner', select: '-_id' });
  // const todos = await Todo.find().populate({ path: 'owner', select: 'name role email' });
  // const todos = await Todo.find({ title: { $regex: ' search', $options: 'i' } });

  // const filter = {
  //   $or: [
  //     { title: { $regex: 'search', $options: 'i' } },
  //     { description: { $regex: 'search', $options: 'i' } },
  //   ],
  // };

  // const todos = await Todo
  //   .find(filter)
  //   .populate({ path: 'owner', select: 'name role email' })
  //   .sort('title');
  // .skip(2) // яку кількість документів ми хочемо пропустити
  // .limit(3); // яку кількість документів ми хочемо отримати

  // SEARCH FEATURE =================================================================
  const findOptions = query.search ? {
    $or: [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
    ],
  } : {};

  if (query.search && currentUser.role === userRoles.USER) {
    if (query.search) {
      for (const findOption of findOptions.$or) {
        findOption.owner = currentUser;
      }
    }

    if (!query.search) findOptions.owner = currentUser;
  }

  // INIT DB QUERY =================================================================
  const todoQuery = Todo.find(findOptions).populate({ path: 'owner', select: 'name role' });

  // SORT FEATURE =================================================================
  // order = 'DESC' or 'ASC'
  // todoQuery.sort('title' or '-title');
  todoQuery.sort(`${query.order === 'DESC' ? '-' : ''}${query.sort ?? 'title'}`);

  // PAGINATION FEATURE ===========================================================
  // page 1 = limit 5, skip 0
  // page 2 = limit 5, skip 5
  // page 3 = limit 5, skip 10

  const page = query.page ? query.page : 1;
  const limit = query.limit ? +query.limit : 5;
  const docsToSkip = (page - 1) * limit;

  todoQuery.skip(docsToSkip).limit(limit);

  const todos = await todoQuery;
  const total = await Todo.countDocuments(findOptions);

  return { todos, total };
};

export const getTodo = async (id, owner) => {
  const todo = await Todo.findById(id);

  if (!todo) throw new HttpError(404, 'Todo not found..');

  if (owner.role === userRoles.USER && todo.owner.toString() !== owner.id) {
    throw new HttpError(404, 'Not found..');
  }

  return todo;
};
