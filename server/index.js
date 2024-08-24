import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routers/users.js";
import authRouter from "./routers/auth.js";
import productsRouter from "./routers/products.js";
import ordersRouter from "./routers/orders.js";

dotenv.config();

const app = express();
app.use(cors({}));

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Connection failed", error);
  });

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
