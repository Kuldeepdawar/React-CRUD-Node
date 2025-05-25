// server.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";

dotenv.config();

const app = express();

// allow json data in req.body
app.use(express.json());

app.use("/api/products", productRouter);

// get all products

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("http://localhost:" + 5000);
});
