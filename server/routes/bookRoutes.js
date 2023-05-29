import express from 'express'
import Book from '../models/books.js';
const bookRoutes =express.Router();

const getBooks =async(req,res)=>{
    const books = await Book.find({});
    res.json(books)
}

bookRoutes.route('/').get(getBooks);

export default bookRoutes;