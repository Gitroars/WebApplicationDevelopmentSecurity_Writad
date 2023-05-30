import express from "express";
import Book from "../models/books.js";
import Chapter from "../models/chapters.js";

const bookRoutes = express.Router();

// Fetch all books with titles only
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}, "title");
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// Fetch the chapters of a specific book
const getBookChapters = async (req, res) => {
  try {
    const bookId = req.params.id;
    const chapters = await Chapter.find({ book: bookId });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book chapters" });
  }
};

bookRoutes.route("/").get(getBooks);
bookRoutes.route("/:id/chapters").get(getBookChapters);

export default bookRoutes;
