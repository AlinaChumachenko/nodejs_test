import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

// import './envs/env.js';
import './configs/dotenvConfig.js';
import { userRouter, authRouter } from './routes/index.js';
import { serverConfig } from './configs/serverConfig.js';
import { globalErrorHandler } from './controllers/errorController.js';

const app = express();

mongoose
  .connect(serverConfig.mongoUrl)
  .then(() => {
    console.log('Mongo DB connected..');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// MIDDLEWARES ===========================
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// app.use(morgan('dev'));

app.use(express.json());
app.use(cors());

// global custom middleware
// app.use((req, res, next) => {
//   console.log('Hello from middleware!!!!');

//   req.time = new Date().toLocaleString('uk-UA');

//   next();
// });

// ROUTES ====================
const pathPrefix = '/api/v1';

app.use(`${pathPrefix}/users`, userRouter);
app.use(`${pathPrefix}/auth`, authRouter);

// Handle not found error
app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Oops! Resource not found!',
  });
});

// Global error handler
app.use(globalErrorHandler);

// SERVER INIT ===============================
const { port } = serverConfig;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
