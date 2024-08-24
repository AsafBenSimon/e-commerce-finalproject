import express from "express";
import Order from "../models/orders.js";
import Product from "../models/products.js";
import User from "../models/users.js";
import { authenticateUser } from "../middleware/auth.js";
import mongoose from "mongoose"; // Make sure this line is at the top

const router = express.Router();

// Get all orders (admin only)
router.get("/", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await Order.find().populate("user", "email userName");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders
router.get("/my-orders", authenticateUser, async (req, res) => {
  try {
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

    const newOrder = new Order({
      user: req.user.id,
      products,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Place order (checkout)
router.post("/checkout", authenticateUser, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;
    const userId = req.user.id;

    const newOrder = new Order({
      user: userId,
      products,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    await User.findByIdAndUpdate(userId, { $push: { orders: savedOrder._id } });
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST endpoint to add items to the cart
router.post("/cart", authenticateUser, async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { productId, quantity, img, productName, price } = req.body;

    // Validate the request payload
    if (!productId || !quantity || !img || !productName || !price) {
      return res.status(400).json({
        message:
          "All fields (productId, quantity, img, productName, price) are required",
      });
    }

    // Fetch the user from the token
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the product from the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the item already exists in the user's cart
    const existingCartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingCartItem) {
      // Update the quantity if the item exists
      existingCartItem.quantity += quantity;
    } else {
      // Add the new item to the user's cart
      user.cart.push({
        productId,
        productName,
        price,
        img,
        quantity,
      });
    }

    // Save the updated user document
    await user.save();

    // Log the updated cart for debugging
    console.log("Updated Cart:", user.cart);

    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Delete item from cart by productId
router.delete("/remove/:productId", authenticateUser, async (req, res) => {
  try {
    const { productId } = req.params;

    console.log("Received productId:", productId);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const initialCartLength = user.cart.length;
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    if (user.cart.length === initialCartLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});

// Update item quantity in the cart
router.put("/update/:productId", authenticateUser, async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("Received productId:", productId); // This should log to the console

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      user.cart = user.cart.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    await user.save();

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error); // This should log to the console
    res.status(500).json({ message: "Failed to update item in cart" });
  }
});

export default router;
