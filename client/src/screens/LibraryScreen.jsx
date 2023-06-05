import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks } from "../redux/actions/libraryActions";
import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import BookCard from "../components/BookCard";

const LibraryScreen = () => {
  const dispatch = useDispatch();
  const library = useSelector((state) => state.library);
  const { loading, error, books } = library;
  useEffect(() => {
    console.log("Dispatching getBooks action");
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <Box py='8'>
      <Stack spacing='4'>
        <Heading as='h2' size='lg'>
          Your Library
        </Heading>
        {library.loading ? (
          <Text>Loading...</Text>
        ) : library.error ? (
          <Text>Error: {library.error}</Text>
        ) : (
          <VStack spacing='4' align='start'>
            {library.books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </VStack>
        )}
      </Stack>
    </Box>
  );
};

export default LibraryScreen;
