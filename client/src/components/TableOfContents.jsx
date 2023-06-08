import { Box, Text, VStack, Link } from "@chakra-ui/react";

const TableOfContents = ({ chapters, onChapterClick }) => {
  return (
    <Box p='4'>
      <Text fontSize='2xl' fontWeight='bold' mb='4'>
        Table of Contents
      </Text>
      <VStack spacing='2' align='stretch'>
        {chapters.map((chapter) => (
          <Link key={chapter.number} onClick={() => onChapterClick(chapter.number)}>
            {chapter.title}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default TableOfContents;
