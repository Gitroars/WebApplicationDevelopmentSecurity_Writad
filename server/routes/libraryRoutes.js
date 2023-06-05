import express from "express";
import asyncHandler from "express-async-handler";
import { protectRoute } from "../middleware/authMiddleware.js";
import Book from "../models/books.js";
import Order from "../models/Order.js";

const libraryRoutes = express.Router();

const getLibrary = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const library = await Order.find({ user: user._id });
    const bookIds = orders.flatMap((order) => order.orderItems.map((item) => item.id));
    const purchasedBooks = await Book.find({ _id: { $in: bookIds } });
    res.json(purchasedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

libraryRoutes.route("/").get(protectRoute, getLibrary);

export default libraryRoutes;
