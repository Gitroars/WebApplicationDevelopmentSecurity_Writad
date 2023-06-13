import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthorBooks } from "../redux/actions/authorActions";

const AuthorDashboard = () => {
  const dispatch = useDispatch();
  const author = useSelector((state) => state.author);
  const { books } = author;

  useEffect(() => {
    fetchAuthorBooks();
  }, [dispatch]);

  return (
    <div>
      <h1>Author Dashboard</h1>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          {/* Render other book details */}
        </div>
      ))}
    </div>
  );
};

export default AuthorDashboard;
