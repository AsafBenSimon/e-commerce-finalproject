import express from "express";
import Product from "../models/products.js"; // Ensure the path and casing are correct
import { authenticateUser, isAdmin } from "../middleware/auth.js";
import { reviewSchema } from "../validations/productsValidation.js";

const router = express.Router();

// Route to add a new product
router.post("/", [authenticateUser, isAdmin], async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /products/:productId/reviews - Add a review to a product
router.post(
  "/products/:productId/reviews",
  authenticateUser,
  async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const { productId } = req.params;
      const userId = req.user.id; // Assuming req.user is set by authentication middleware

      // Validate input
      const { error } = reviewSchema.validate({ rating, comment });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      // Find the product by ID
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Construct the new review
      const newReview = {
        user: userId,
        rating,
        comment,
      };

      // Add the review to the product's reviews array
      product.reviews.push(newReview);

      // Save the updated product document
      await product.save();

      res.status(201).json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// Route to get reviews for a specific product
router.get("/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the product by ID and populate its reviews
    const product = await Product.findById(productId).populate(
      "reviews.user",
      "userName"
    ); // Assuming reviews are stored with user references

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract reviews from the product object
    const reviews = product.reviews;

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a review
router.put(
  "/products/:productId/reviews/:reviewId",
  authenticateUser,
  async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const { productId, reviewId } = req.params;

      // Validate input (if needed)

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Find the review within the product's reviews array
      const reviewToUpdate = product.reviews.find(
        (review) => review._id.toString() === reviewId
      );

      if (!reviewToUpdate) {
        return res.status(404).json({ message: "Review not found" });
      }

      // Check if the user owns the review (optional, depending on your requirements)

      // Update the review
      reviewToUpdate.rating = rating;
      reviewToUpdate.comment = comment;

      // Save the updated product document
      await product.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// Delete a review
router.delete(
  "/products/:productId/reviews/:reviewId",
  authenticateUser,
  async (req, res) => {
    try {
      const { productId, reviewId } = req.params;

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Remove the  from the product's reviews array
      product.reviews = product.reviews.filter(
        (review) => review._id.toString() !== reviewId
      );

      // Save the updated product document
      await product.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

export default router;
