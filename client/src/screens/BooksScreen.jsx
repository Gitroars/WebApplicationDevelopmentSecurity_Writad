import React from "react";
import {
  Center,
  Wrap,
  WrapItem,
  Spinner,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";
import BookCard from "../components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../redux/actions/bookActions";
import { useEffect } from "react";

const BooksScreen = () => {
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        books.map((book) => (
          <WrapItem key={book._id}>
            <Center w='250px' h='550px'>
              <BookCard book={book} />
            </Center>
          </WrapItem>
        ))
      )}
    </Wrap>
  );
};

export default BooksScreen;