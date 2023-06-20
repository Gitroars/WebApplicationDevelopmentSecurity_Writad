import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../redux/actions/authorActions";
import { Box, Heading, Stack, Text, VStack, WrapItem, Link, Button } from "@chakra-ui/react";
import BookCard from "../components/BookCard";
import { Link as ReactLink } from "react-router-dom";
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
        <Link as={ReactLink} to={`/create`} style={{ paddingTop: "2", cursor: "pointer" }}>
          <Button colorScheme='purple'>Write New Book</Button>
        </Link>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <WrapItem spacing='4' align='start'>
            {books.map((book) => (
              <BookCard key={book.id} book={book} isBooks={false} showRating={false} isAuthor={true} />
            ))}
          </WrapItem>
        )}
      </Stack>
    </Box>
  );
};

export default AuthorDashboard;
