import mongoose from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
