import express from "express";
import asyncHandler from "express-async-handler";
import { protectRoute } from "../middleware/authMiddleware.js";
import Book from "../models/books.js";
import Order from "../models/Order.js";

const libraryRoutes = express.Router();

const getLibrary = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  if (orders) {
    const bookIds = orders.flatMap((order) => order.orderItems.map((item) => item.id));
    const purchasedBooks = await Book.find({ _id: { $in: bookIds } });
    res.json(purchasedBooks);
  } else {
    throw new Error("No purchased books found");
  }
});

libraryRoutes.route("/").get(protectRoute, getLibrary);

export default libraryRoutes;
