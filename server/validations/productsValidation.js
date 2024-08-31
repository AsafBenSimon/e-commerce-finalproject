import Joi from "joi";

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    productName: Joi.string().required(), // Added validation for productName
    description: Joi.string().optional(), // Marked as optional if not always required
    price: Joi.number().min(0).required(),
    img: Joi.string().uri().optional(), // Marked as optional if not always required
    rating: Joi.number().min(1).max(5).default(1), // Added validation for rating with default value
    sale: Joi.number().min(0).max(100).default(0), // Added validation for sale percentage with default value
    status: Joi.string().valid("NEW", "SALE").default("NEW"), // Added validation for status with default value
    showStatus: Joi.boolean().default(false), // Added validation for showStatus with default value
    showSale: Joi.boolean().default(false), // Added validation for showSale with default value
  });

  return schema.validate(data);
};

const reviewSchema = Joi.object({
  Username: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().required(),
});

export { productValidation, reviewSchema };
