import Joi from "joi";

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required(),
    imageUrl: Joi.string().uri().required(),
  });

  return schema.validate(data);
};

const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().required(),
});

export { productValidation, reviewSchema };
