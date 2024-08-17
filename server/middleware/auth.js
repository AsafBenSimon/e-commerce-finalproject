import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.headers?.cookie?.split("=")[1];
  console.log("authenticateUser ~ token", token);
  if (!token) {
    return res.status(401).send({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ msg: "Unauthorized" });
    }

    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).send({ msg: "Unauthorized" });
    }

    req.user = {
      ...decoded.user,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const isAdmin = (req, res, next) => {
  try {
    // Check if req.user exists and has the role property
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Check if the user's role is "admin"
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
