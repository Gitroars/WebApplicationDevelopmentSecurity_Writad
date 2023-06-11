import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBook } from "../redux/actions/bookActions";
import { Box, Text, Button, Flex, Select } from "@chakra-ui/react";
import ChapterBar from "../components/ChapterBar";

const ReadingScreen = () => {
  const { id, ch } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentChapter, setCurrentChapter] = useState(parseInt(ch, 10) || 0);

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id]);

  const books = useSelector((state) => state.books);
  const { loading, error, book } = books;

  const handleNextChapter = () => {
    if (!isLastChapter) {
      const nextChapter = currentChapter + 1;
      setCurrentChapter(nextChapter);

      navigate(`/book/${id}/${nextChapter}`);
    }
  };

  const handlePreviousChapter = () => {
    if (!isFirstChapter) {
      const previousChapter = currentChapter - 1;
      setCurrentChapter(previousChapter);

      navigate(`/book/${id}/${previousChapter}`);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!book || !book.chapters || book.chapters.length === 0) {
    return <Text>No chapters available.</Text>;
  }

  const { chapters } = book;

  const isLastChapter = currentChapter === chapters.length - 1;
  const isFirstChapter = currentChapter === 0;

  const currentChapterContent = chapters[currentChapter].content;

  const chapterOptions = chapters.map((chapter, index) => ({
    value: index,
    label: `Chapter ${index + 1}`,
  }));

  const handleChapterSelection = (e) => {
    const currentChapter = parseInt(e.target.value, 10);
    setCurrentChapter(currentChapter);
    navigate(`/book/${id}/${currentChapter}`);
  };

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
        <Button onClick={handlePreviousChapter} disabled={isFirstChapter} m={2}>
          Previous Chapter
        </Button>
        <Select value={currentChapter} onChange={handleChapterSelection} maxWidth='200px' mt={2}>
          {chapterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Button onClick={handleNextChapter} disabled={isLastChapter} m={2}>
          Next Chapter
        </Button>
      </Flex>

      <Box mb={4}>
        <Flex direction='column' align='center' px='10%'>
          <Text whitespace='pre-wrap'>{currentChapterContent}</Text>
        </Flex>
      </Box>

      <Flex direction='row' align='center' justify='center'>
        <Button onClick={handlePreviousChapter} disabled={isFirstChapter} m={2}>
          Previous Chapter
        </Button>
        <Button onClick={handleNextChapter} disabled={isLastChapter} m={2}>
          Next Chapter
        </Button>
      </Flex>
    </Box>
  );
};

export default ReadingScreen;
