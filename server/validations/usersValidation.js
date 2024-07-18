import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    userName: Joi.string().min(3).required(),
    role: Joi.string().valid("user", "admin"),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const updateUserValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(6),
    userName: Joi.string().min(3),
    role: Joi.string().valid("user", "admin"),
  });

  return schema.validate(data);
};

export { registerValidation, loginValidation, updateUserValidation };
