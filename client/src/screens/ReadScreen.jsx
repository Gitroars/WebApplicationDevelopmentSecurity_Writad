import { useState } from "react";
import { Box, Text, Heading, VStack, HStack, Button, Select } from "@chakra-ui/react";

const ReadScreen = () => {
  const [selectedChapter, setSelectedChapter] = useState("Chapter 1");
  const chapters = ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"]; // Replace with actual chapter list

  const handlePreviousChapter = () => {
    // Logic for navigating to previous chapter
  };

  const handleNextChapter = () => {
    // Logic for navigating to next chapter
  };

  const handleChapterSelect = (event) => {
    setSelectedChapter(event.target.value);
    // Logic for navigating to selected chapter
  };

  return (
    <Box py={8}>
      <VStack spacing={4} align='center'>
        <Heading as='h1' size='xl'>
          Web Novel Title
        </Heading>
        <Text fontSize='lg' textAlign='center'>
          {selectedChapter}
        </Text>
        <Text fontSize='md'>Once upon a time, in a land far, far away...</Text>
        <Text fontSize='md'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lacus libero. Sed vel iaculis velit. Maecenas
          rhoncus eleifend libero ut tincidunt. Proin nec mauris in odio malesuada viverra. Integer vel facilisis metus,
          vel dictum felis. Aliquam erat volutpat. Nulla non mollis tortor. Nulla faucibus mauris ut neque gravida
          placerat.
        </Text>
        <Text fontSize='md'>
          Phasellus vitae lacus tellus. Etiam volutpat risus in sollicitudin iaculis. Duis ultrices lacinia turpis vitae
          vehicula. Sed in nunc ante. Nam vestibulum scelerisque mi, id condimentum dui tincidunt non. Vestibulum cursus
          sapien at eleifend condimentum. Sed consectetur leo et arcu facilisis fringilla. Curabitur consequat erat sit
          amet tortor aliquam mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          Curae; Proin id luctus lectus.
        </Text>
        <Box>
          <HStack spacing={4}>
            <Button onClick={handlePreviousChapter}>Previous </Button>
            <Select value={selectedChapter} onChange={handleChapterSelect}>
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>
                  {chapter}
                </option>
              ))}
            </Select>
            <Button onClick={handleNextChapter}>Next </Button>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ReadScreen;
