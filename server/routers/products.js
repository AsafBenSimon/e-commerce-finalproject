import express from "express";
import Product from "../models/products.js"; // Ensure the path and casing are correct
import { authenticateUser, isAdmin } from "../middleware/auth.js";
import { reviewSchema } from "../validations/productsValidation.js";

const router = express.Router();

// Route to add a new product
router.post("/", [authenticateUser, isAdmin], async (req, res) => {
  const {
    name,
    price,
    description,
    img,
    rating,
    sale,
    status,
    showStatus,
    showSale,
  } = req.body;

  try {
    // Validate and normalize the rating
    let finalRating = rating;
    if (typeof rating === "number") {
      finalRating = Math.max(1, Math.min(5, rating));
    } else {
      finalRating = 3; // Default rating if not provided or invalid
    }

    // Create a new product with the provided details
    const newProduct = new Product({
      name,
      price,
      description,
      img,
      rating: finalRating,
      sale: sale || 0, // Default sale to 0 if not provided
      status: status || "", // Default status to empty string if not provided
      showStatus: showStatus || false, // Default showStatus to false if not provided
      showSale: showSale || false, // Default showSale to false if not provided
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/products
// GET /api/products/list
router.get("/list", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
  }
});

// Route to add a review
router.post("/:productId/reviews", authenticateUser, async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Extract Username from the authenticated user
    const { username } = req.user;

    // Logic to add the review
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { reviews: { rating, comment, username } } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Route to get reviews for a specific product
router.get("/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10, sort = "createdAt" } = req.query; // Pagination and sorting parameters

    // Find the product by ID and populate its reviews
    const product = await Product.findById(productId)
      .populate({
        path: "reviews.user",
        select: "userName", // Assuming userName is a field in your user schema
      })
      .sort({ [sort]: -1 }) // Sorting reviews (e.g., by date)
      .skip((page - 1) * limit) // Pagination
      .limit(parseInt(limit)); // Limit the number of reviews

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

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get products with showSale set to true
router.get("/sales", async (req, res) => {
  try {
    // Find products where the `sale` field is greater than 0
    const saleProducts = await Product.find({ sale: { $gt: 0 } });
    res.status(200).json(saleProducts);
  } catch (error) {
    console.error("Error fetching sale products:", error); // Log the full error
    res.status(500).json({
      message: "Server Error",
      error: error.message || "An unknown error occurred",
    });
  }
});

export default router;
