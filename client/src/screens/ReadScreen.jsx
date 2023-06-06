import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBook } from "../redux/actions/bookActions";
import { Box, Text, Button } from "@chakra-ui/react";

const ReadingScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id]);

  const books = useSelector((state) => state.books);
  const { loading, error, book } = books;

  const handleNextChapter = () => {
    if (!isLastChapter) {
      setCurrentChapter((prevChapter) => prevChapter + 1);
    }
  };

  const handlePreviousChapter = () => {
    if (!isFirstChapter) {
      setCurrentChapter((prevChapter) => prevChapter - 1);
    }
  };

  if (!book || !book.chapters || book.chapters.length === 0) {
    return <Text>No chapters available.</Text>;
  }

  const { chapters } = book;

  const isLastChapter = currentChapter === chapters.length - 1;
  const isFirstChapter = currentChapter === 0;

  const currentChapterContent = chapters[currentChapter].content;

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
        <Button onClick={handlePreviousChapter} disabled={isFirstChapter}>
          Previous Chapter
        </Button>
        <Button onClick={handleNextChapter} disabled={isLastChapter}>
          Next Chapter
        </Button>
      </Box>
    </Box>
  );
};

export default ReadingScreen;
