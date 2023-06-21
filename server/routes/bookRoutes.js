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
  const user = await User.findById(req.body._id);
  const { image, title, description, price, category, chapterTitle, chapterContent } = req.body;
  console.log("new title" + title);
  console.log(typeof title);

  console.log(user);

  const book = new Book({
    name: title,
    image,
    author: user.name,
    authorId: new mongoose.Types.ObjectId(user._id),
    category,
    description,
    numberOfReviews: 0,
    price,
    chapters: [
      {
        number: 1,
        title: chapterTitle,
        content: chapterContent,
      },
    ],
    productIsNew: true,
  });
  console.log(user.name);
  console.log(new mongoose.Types.ObjectId(user._id));

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

const updateBookDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  const { bookId, image, title, description, price, category } = req.body;
  const book = await Book.findById(bookId);
  if (book && book.authorId === user._id) {
    book.image = image;
    book.title = title;
    book.description = description;
    book.price = price;
    book.category = category;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

const addBookChapter = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  const { bookId, chapterNumber, chapterTitle, chapterContent } = req.body;
  const book = await Book.findById(bookId);
  if (book && book.authorId === user._id) {
    book.chapters.push(chapterNumber, chapterTitle, chapterContent);
    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error(`Book not found`);
  }
});

const updateBookChapter = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  const { bookId, chapterNumber, chapterTitle, chapterContent } = req.body;
  const book = await Book.findById(bookId);
  if (book && book.authorId === user._id) {
    book.chapters[chapterNumber] = new Array(chapterNumber, chapterTitle, chapterContent);
    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error(`Book not found`);
  }
});

bookRoutes.route("/").get(getBooks);
bookRoutes.route("/:id").get(getBook);
bookRoutes.route("/:id/:ch").get(getBook);
bookRoutes.route("/reviews/chapter:id").post(protectRoute, createBookReview);
bookRoutes.route("/create").post(protectRoute, createBook);
bookRoutes.route("/updateDetail").put(protectRoute, updateBookDetails);
bookRoutes.route("/addChapter").post(protectRoute, addBookChapter);
bookRoutes.route("/updateChapter").post(protectRoute, updateBookChapter);
export default bookRoutes;
