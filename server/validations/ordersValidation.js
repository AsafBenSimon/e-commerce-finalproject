import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const orderValidation = (data) => {
  const schema = Joi.object({
    user: Joi.objectId().required(),
    products: Joi.array()
      .items(
        Joi.object({
          productId: Joi.objectId().required(),
          quantity: Joi.number().min(1).required(),
        })
      )
      .required(),
    totalPrice: Joi.number().required(),
  });

  return schema.validate(data);
};

export { orderValidation };
