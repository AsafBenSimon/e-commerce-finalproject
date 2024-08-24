import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    productName: { type: String, required: true },
    img: { type: String },
    rating: { type: Number, default: 1, min: 1, max: 5 },
    sale: { type: Number, default: 0 },
    status: { type: String, default: "NEW" },
    showStatus: { type: Boolean, default: false },
    reviews: [reviewSchema], // Ensure reviewSchema is correctly imported/defined
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
