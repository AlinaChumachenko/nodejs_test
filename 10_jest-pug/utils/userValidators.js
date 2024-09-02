import Joi from 'joi';
import { PASSWD_REGEX, userRoles } from '../constants/index.js';
import { joiValidator } from './joiValidator.js';

const createUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).required(),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
      role: Joi.string().valid(...Object.values(userRoles)),
    })
    .validate(data));

const signupUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(30).required(),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data));

const loginValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data));

const updateUserDataValidator = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      email: Joi.string().email(),
      role: Joi.string().valid(...Object.values(userRoles)),
    })
    .validate(data));

export {
  createUserDataValidator,
  updateUserDataValidator,
  signupUserDataValidator,
  loginValidator
};
