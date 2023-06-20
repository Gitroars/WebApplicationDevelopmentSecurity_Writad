import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../redux/actions/authorActions";
import { Box, Heading, Stack, Text, VStack, WrapItem } from "@chakra-ui/react";
import BookCard from "../components/BookCard";
const AuthorDashboard = () => {
  const dispatch = useDispatch();
  const author = useSelector((state) => state.author);
  const { loading, error, books } = author;

  useEffect(() => {
    console.log("Dispatching author books...");
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <Box py='8'>
      <Stack spacing='4'>
        <Heading as='h2' size='lg'>
          Author Dashboard
        </Heading>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <WrapItem spacing='4' align='start'>
            {books.map((book) => (
              <BookCard key={book.id} book={book} isBooks={false} showRating={false} />
            ))}
          </WrapItem>
        )}
      </Stack>
    </Box>
  );
};

export default AuthorDashboard;
