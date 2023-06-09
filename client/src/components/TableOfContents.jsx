import React from "react";
import { Link } from "react-router-dom";

const TableOfContents = ({ id, chapters }) => {
  return (
    <div>
      <h2>Table of Contents</h2>
      <ul>
        {chapters.map((chapter, index) => (
          <li key={index}>
            <Link to={`/book/${id}/${index}`}>{chapter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
