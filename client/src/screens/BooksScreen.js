import React from "react";
import { Center, Wrap, WrapItem } from "@chakra-ui/react";
import { books } from "../books";
import BookCard from "../components/BookCard";

const BooksScreen = () => {
  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {books.map((book) => (
        <WrapItem key={book._id}>
          <Center w='250px' h='550px'>
            <BookCard book={book} />
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default BooksScreen;
