import express from "express";
import asyncHandler from "express-async-handler";
import { protectRoute } from "../middleware/authMiddleware.js";
import Book from "../models/books.js";
import mongoose from "mongoose";
const authorRoutes = express.Router();

const getBooksByAuthor = asyncHandler(async (req, res) => {
  try {
    const authorId = req.params.id;
    console.log("authorId type: " + typeof authorId);
    console.log("author Id:" + authorId);
    const books = await Book.find({ authorId: new mongoose.Types.ObjectId(authorId) });
    res.json(books);
  } catch (err) {
    res.status(404);
    throw new Error(err);
  }
});

const createBook = asyncHandler(async (req, res) => {
  const { name, image, author, authorId, category, description, price, stock, chapters } = req.body;
  const book = new Book({
    name,
    image,
    author,
    authorId,
    category,
    description,
    price,
    stock,
    chapters,
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

const updateBookChapter = asyncHandler(async (req, res) => {\
  
  const book = await Book.findById(req.params.id);
  if (book) {
    book.chapters = req.body.chapters;
  }
});

authorRoutes.route("/:id").get(protectRoute, getBooksByAuthor);
authorRoutes.route("/submit/:id").post(protectRoute, createBook);
authorRoutes.route("/update/:id").put(protectRoute, updateBookChapter);

export default authorRoutes;
