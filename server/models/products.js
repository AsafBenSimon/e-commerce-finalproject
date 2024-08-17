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
    image: { type: String },
    rating: { type: Number, default: 1, min: 1, max: 5 }, // Rating should be between 1 and 5
    sale: { type: Number, default: 0 }, // Sale percentage
    status: { type: String, default: "NEW" }, // Status like "NEW", "SALE"
    showStatus: { type: Boolean, default: false }, // Whether to show status
    showSale: { type: Boolean, default: false }, // Whether to show sale
    reviews: [reviewSchema], // Use the review schema here
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
