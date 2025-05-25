import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import Product from "../model/product.model.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

router.get("/", getProducts);

// update the data
router.put("/:id", updateProduct);
// creating a new product  and endpoints any my post end point /api/productadd
router.post("/", createProduct);

router.delete("/:id", deleteProduct);

export default router;
