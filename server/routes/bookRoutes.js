import express from "express";
import Book from "../models/books.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const bookRoutes = express.Router();

const getBooks = async (req, res) => {
  const books = await Book.find({});
  res.json(books);
};

const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
};

const createBookReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, title } = req.body;
  const book = await Book.findById(req.params.id);
  const user = await User.findById(userId);
  if (book) {
    const alreadyReviewed = book.reviews.find((review) => review.user.toString() === user._id.toString());
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Book already reviewed");
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    };
    book.reviews.push(review);
    book.numberOfReviews = book.reviews.length;
    book.rating = book.reviews.reduce((acc, book) => book.rating + acc, 0) / book.reviews.length;
    await book.save();
    res.status(201).json({ message: "Review uploaded" });
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

bookRoutes.route("/").get(getBooks);
bookRoutes.route("/:id").get(getBook);
bookRoutes.route("/reviews/:id").post(protectRoute, createBookReview);

export default bookRoutes;
