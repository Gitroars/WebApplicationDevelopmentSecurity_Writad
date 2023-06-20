import express from "express";
import Book from "../models/books.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";
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

const getBookChapter = async (req, res) => {
  const book = await Book.findById(req.params.id);
  const user = req.user;
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  const order = await Order.findOne({ user: user._id, "orderItems.id": book._id });
  const hasPurchased = order !== null;
  if (!hasPurchased) {
    res.status(403);
    throw new Error("Access denied. You need to purchase the book to access the chapters.");
  }

  // Retrieve the chapter number from the request parameters
  const chapterNumber = req.params.chapterNumber;

  // Validate the chapter number to ensure it's within the valid range
  if (chapterNumber < 1 || chapterNumber > book.chapters.length) {
    res.status(404);
    throw new Error("Invalid chapter number");
  }

  // Retrieve the specified chapter
  const chapter = book.chapters[chapterNumber - 1];
  res.json(chapter);
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

const createBook = asyncHandler(async (req, res) => {
  const { image, title, description, genre, chapterName, chapterContent } = req.body;
  const user = req.params.id;
  const book = new Book({
    name: title,
    image,
    author: user.name,
    authorId: new mongoose.Types.ObjectId(req.user_id),
    category: genre,
    description,
    price,
    chapters: [
      {
        number: 1,
        name: chapterName,
        content: chapterContent,
      },
    ],
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

bookRoutes.route("/").get(getBooks);
bookRoutes.route("/:id").get(getBook);
bookRoutes.route("/:id/:ch").get(getBook);
bookRoutes.route("/reviews/chapter:id").post(protectRoute, createBookReview);
bookRoutes.route("/create").post(protectRoute, createBook);

export default bookRoutes;
