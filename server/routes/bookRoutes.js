import express from "express";
import Book from "../models/books.js";
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

bookRoutes.route("/").get(getBooks);
bookRoutes.route("/:id").get(getBook);

export default bookRoutes;
