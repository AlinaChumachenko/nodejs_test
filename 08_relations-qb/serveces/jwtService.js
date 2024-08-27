import jwt from 'jsonwebtoken';
import { serverConfig } from '../configs/index.js';
import { HttpError } from '../utils/index.js';

const signToken = (id) => // на етапі aутентіфікації підпиши мені токен
  jwt.sign({ id }, serverConfig.jwtSecret, {
    expiresIn: serverConfig.jwtExpiresIn,
  });

const checkToken = (token) => { // перевір мені токен на етапі авторизації
  if (!token) throw new HttpError(401, 'Not logged in..');
  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret);
    return id;
  } catch (error) {
    throw new HttpError(401, 'Not logged in..');
  }
};

export { signToken, checkToken };
