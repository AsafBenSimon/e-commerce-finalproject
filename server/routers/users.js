import express from "express";
import User from "../models/users.js"; // Ensure the path is correct
import { authenticateUser, isAdmin } from "../middleware/auth.js";
const router = express.Router();

// Delete a user
router.delete("/:userId", [authenticateUser], isAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Perform additional checks if needed...

    // Delete the user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Route to get user profile
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    // Fetch user information and associated orders
    const userId = req.user.id; // Assuming you store user ID in req.user after authentication

    const user = await User.findById(userId).populate("orders"); // Populate orders associated with the user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract relevant user data
    const { _id, email, userName, orders } = user;

    // Format orders if needed
    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      products: order.products,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
    }));

    // Prepare user profile response
    const userProfile = {
      id: _id,
      email,
      userName,
      orders: formattedOrders,
    };

    res.status(200).json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update user profile (assuming you want to add this functionality)
router.put("/profile", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, userName } = req.body;

    // Validate input (if needed)

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, userName },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return updated user profile
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
