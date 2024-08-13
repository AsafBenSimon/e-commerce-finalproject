import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routers/users.js";
import authRouter from "./routers/auth.js";
import productsRouter from "./routers/products.js";
import ordersRouter from "./routers/orders.js";
// import commentsRouter from "./routers/comments.js"; // Import the comments router
const app = express();
app.use(
  cors({
    origin: "http://localhost:3001", // Allow requests from your frontend URL
    credentials: true, // Allow cookies and other credentials
  })
);
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Connection failed", error);
  });

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
// app.use("/api/comments", commentsRouter); // Using the posts router

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
