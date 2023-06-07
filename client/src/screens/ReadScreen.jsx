import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBook } from "../redux/actions/bookActions";
import { Box, Text, Button, Flex } from "@chakra-ui/react";

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
      <Flex direction='column' align='center' mb={4}>
        <Text fontSize='2xl' fontWeight='bold'>
          {book.name}
        </Text>
        <Text fontSize='lg'>Author: {book.author}</Text>
        <Text fontSize='xl' fontWeight='bold'>
          Chapter {currentChapter + 1}
        </Text>
      </Flex>

      <Flex direction='row' align='center' justify='center'>
        <Button onClick={handlePreviousChapter} disabled={isFirstChapter} m='30'>
          Previous Chapter
        </Button>
        <Button onClick={handleNextChapter} disabled={isLastChapter} m='30'>
          Next Chapter
        </Button>
      </Flex>

      <Box mb={4}>
        <Flex direction='column' align='center' px='10%'>
          <Text whitespace='pre-wrap'>{currentChapterContent}</Text>
        </Flex>
      </Box>

      <Flex direction='row' align='center' justify='center'>
        <Button onClick={handlePreviousChapter} disabled={isFirstChapter} m='30'>
          Previous Chapter
        </Button>
        <Button onClick={handleNextChapter} disabled={isLastChapter} m='30'>
          Next Chapter
        </Button>
      </Flex>
    </Box>
  );
};

export default ReadingScreen;
