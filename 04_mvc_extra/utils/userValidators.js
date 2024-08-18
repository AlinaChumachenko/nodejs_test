import Joi from 'joi';

const createUserDataValidator = (data) =>
  Joi.object().options({ abortEarly: false }) // Аналізуй до кінця
    .keys({
      name: Joi.string().min(2).max(10).required(),
      year: Joi.number().min(1900).max(new Date().getFullYear() - 18).required()
    }).validate(data);

export { createUserDataValidator };
