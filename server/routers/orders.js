import express from "express";
import { Order, CartItem } from "../models/orders.js"; // Import both Order and CartItem
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

// Add item to cart (create a new 'order' as an 'in-progress' cart)
// Add item to cart
// Add item to cart
router.post("/addToCart", authenticateUser, async (req, res) => {
  try {
    const { productId, name, price, quantity, image } = req.body;

    // Validate the request body
    if (!productId || !name || !price || !quantity || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new cart item
    const newCartItem = new CartItem({
      user: req.user.id, // Assuming `req.user.id` is the authenticated user
      productId,
      name,
      price,
      quantity,
      image,
    });

    await newCartItem.save();

    res.status(201).json(newCartItem);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// src/routers/orders.js
router.get("/my-cart", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await CartItem.findOne({ user: userId }).populate({
      path: "products.productId",
      select: "name price image", // Adjust fields as needed
    });

    if (!cartItems) return res.status(404).json({ message: "Cart not found" });

    // Map cart items to include product details
    const detailedCartItems = cartItems.products.map((product) => ({
      productId: product.productId._id,
      name: product.productId.name,
      price: product.productId.price,
      image: product.productId.image,
      quantity: product.quantity,
      total: product.price * product.quantity, // Calculate total price for the product
    }));

    res.status(200).json(detailedCartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
