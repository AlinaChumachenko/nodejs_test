import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
// import { promises as fs } from 'fs'; // для роботи з файлами , наприклад збереження у файл
import mongoose from 'mongoose';

import { userRouter } from './routes/index.js';
// import { serverConfig } from './configs/serverConfig.js';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? './envs/production.env' : './envs/development.env' });

const app = express(); // створюємо екземпляр express

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// MIDDLEWARE-----------------------------------------------------------------
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// app.use(morgan('dev'));
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

// global custom MIDDLEWARE відпрацьовує на всьому-----------------------------

// app.use((req, res, next) => {
//   console.log('Custom middleware');

//   req.time = new Date().toLocaleString('uk-UA');

//   next();// викликати наступний middleware якщо вони є
// });

// CONTROLLERS-------------------------------------------------------------------
// ROUTES-------------------------------------------------------------------
const pathPrefix = '/api/v1';

app.use(`${pathPrefix}/users`, userRouter);

// Handle not found error
app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Oops!Route not found',
  });
});
// Global error handler
app.use((err, req, res, next) => {
  console.log(`Error: ${err.message}`);

  res.status(err.status ?? 500).json({
    msg: err.message,
  });
});

// SERVER INITIALIZATION----------------------------------------------------------
// const port = process.env.PORT ?? 3000;
const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
