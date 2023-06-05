import { Center, Wrap, WrapItem, Spinner, Stack, Alert, AlertIcon, AlertDescription, AlertTitle } from "@chakra-ui/react";
import BookCard from "../components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../redux/actions/bookActions";
import { useEffect } from "react";
import CaptionCarousel from "../components/CaptionCarousel";

const BooksScreen = () => {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.books);
  const { loading, error, books } = bookList;

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <>
      <CaptionCarousel />
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
        <Wrap spacing='30px' justify='center' minHeight='100vh'>
          {books.map((book) => (
            <WrapItem key={book._id}>
              <Center w='250px' h='550px'>
                <BookCard book={book} isBooks={false} />
              </Center>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
};

export default BooksScreen;
