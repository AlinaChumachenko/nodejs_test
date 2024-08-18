import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs'; // для роботи з файлами , наприклад збереження у файл

import userRouter from './routes/userRouter.js';

const app = express(); // створюємо екземпляр express

// MIDDLEWARE
app.use(express.json());
// додаємо cors для коректного відображення відповіді на браузері, налащтування за замовчуванням дозвіл до будь якого домкну
app.use(cors());

// Або можна налаштувати більш детально:
// app.use(cors({
//     origin: 'https://example.com', // Дозволити доступ лише з цього домену
//     methods: 'GET,POST', // Дозволити тільки ці методи
//     allowedHeaders: 'Content-Type,Authorization', // Дозволити тільки ці заголовки
//     credentials: true // Дозволити надсилання облікових даних
//   }));

// global custom MIDDLEWARE відпрацьовує на всьому

app.use((req, res, next) => {
  console.log('Custom middleware');

  req.time = new Date().toLocaleString('uk-UA');

  next();// викликати наступний middleware якщо вони є
});
// MIDDLEWARE відпрацьовує на конкретному.зазначеному ендпоінті
app.use('/users/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id.length < 10) {
      return res.status(400).json({
        msg: 'Id is too short id!'
      });
    }

    const usersDB = await fs.readFile('data.json'); // поверне buffer
    const users = JSON.parse(usersDB); // поверне обєкт
    const user = users.find((item) => item.id === req.params.id);

    if (!user) {
      return res.status(404).json({
        msg: 'User not found!',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});

// CONTROLLERS-------------------------------------------------------------------
// ROUTES-------------------------------------------------------------------
const pathPrefix = '/api/v1';

app.use(`${pathPrefix}/users`, userRouter);

// SERVER INITIALIZATION----------------------------------------------------------
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
