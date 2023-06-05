import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBook } from "../redux/actions/bookActions";
import { Box, Text, Button } from "@chakra-ui/react";

const ReadingScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books);
  const { loading, error, book } = books;

  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id]);

  const handleNextChapter = () => {
    setCurrentChapter((prevChapter) => prevChapter + 1);
  };

  const handlePreviousChapter = () => {
    setCurrentChapter((prevChapter) => prevChapter - 1);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!book) {
    return <Text>Book not found.</Text>;
  }

  const { chapters } = book;

  if (!chapters || chapters.length === 0) {
    return <Text>No chapters available.</Text>;
  }

  const currentChapterContent = chapters[currentChapter];

  return (
    <Box>
      <Box mb={4}>
        <Text fontSize='2xl' fontWeight='bold'>
          {book.title}
        </Text>
        <Text fontSize='lg'>Author: {book.author}</Text>
      </Box>
      <Box mb={4}>
        <Text fontSize='xl' fontWeight='bold'>
          Chapter {currentChapter + 1}
        </Text>
        <Text>{currentChapterContent}</Text>
      </Box>
      <Box>
        <Button onClick={handlePreviousChapter} disabled={currentChapter === 0}>
          Previous Chapter
        </Button>
        <Button onClick={handleNextChapter} disabled={currentChapter === chapters.length - 1}>
          Next Chapter
        </Button>
      </Box>
    </Box>
  );
};

export default ReadingScreen;
