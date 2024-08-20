import express from "express";
import Order from "../models/orders.js";
import { authenticateUser } from "../middleware/auth.js";
import User from "../models/users.js";

const router = express.Router();

// Get all orders (admin only)
router.get("/", authenticateUser, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Fetch all orders
    const orders = await Order.find().populate("user", "email userName");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders
router.get("/my-orders", authenticateUser, async (req, res) => {
  try {
    // Fetch orders for the authenticated user
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;

    // Create new order
    const newOrder = new Order({
      user: req.user.id,
      products,
      totalPrice,
    });

    // Save order to database
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Place order (checkout)
router.post("/checkout", authenticateUser, async (req, res) => {
  try {
    const { products, totalPrice } = req.body; // Assuming products and totalPrice are sent in the request body
    const userId = req.user.id; // Get user ID from authenticated request

    // Create new order
    const newOrder = new Order({
      user: userId,
      products,
      totalPrice,
    });

    // Save order to database
    const savedOrder = await newOrder.save();

    // Update user's orders
    await User.findByIdAndUpdate(userId, { $push: { orders: savedOrder._id } });

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Add an item to the cart
router.post("/cart", authenticateUser, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize cart if it doesn't exist
    if (!user.cart) {
      user.cart = [];
    }

    // Find if the item already exists in the cart
    const existingCartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingCartItem) {
      // Update the quantity if the item already exists
      existingCartItem.quantity += quantity;
    } else {
      // Add new item to the cart
      user.cart.push({ productId, quantity });
    }

    // Save the user with the updated cart
    await user.save();

    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
