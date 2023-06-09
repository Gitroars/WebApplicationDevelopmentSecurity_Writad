import { Box, Text, VStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TableOfContents = ({ id, chapters }) => {
  const navigate = useNavigate();

  const handleChapterClick = (chapterNumber) => {
    navigate(`/book/${id}/${chapterNumber}`);
  };

  return (
    <Box p='4'>
      <Text fontSize='2xl' fontWeight='bold' mb='4'>
        Table of Contents
      </Text>
      <VStack spacing='2' align='stretch'>
        {chapters.map((chapter) => (
          <Link
            key={chapter.number}
            onClick={() => handleChapterClick(chapter.number)}
            to={`/book/${id}/${chapter.number}`}
          >
            {chapter.title}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default TableOfContents;
