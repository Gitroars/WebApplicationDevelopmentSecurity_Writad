import { useParams } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Wrap,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { MinusIcon, StarIcon, SmallAddIcon } from "@chakra-ui/icons";
import { BiPackage, BiCheckShield, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../redux/actions/bookActions";
import { addBasketItem } from "../redux/actions/basketActions";
import { useEffect, useState } from "react";
const BookScreen = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const toast = useToast();
  const books = useSelector((state) => state.books);
  const { loading, error, book } = books;

  const basketContent = useSelector((state) => state.basket);
  const { basket } = basketContent;

  useEffect(() => {
    dispatch(getBook(id));
  }, [dispatch, id, basket]);

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
        book && (
          <Box
            maxW={{ base: "3x1", lg: "5x1" }}
            mx='auto'
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "6", md: "8", lg: "12" }}
          >
            <Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
              <Stack
                pr={{ base: "0", md: "12" }}
                spacing={{ base: "8", md: "4" }}
                flex='1.5'
                mb={{ base: "12", md: "none" }}
              >
                {book.productIsNew && (
                  <Badge rounded='full' w='40px' colorScheme='green'>
                    New
                  </Badge>
                )}
                <Heading fontSize='2x1' fontWeight='extrabold'>
                  {book.name}
                </Heading>
                <Stack spacing='5'>
                  <Box>
                    <Text fontSize='x1'>${book.price}</Text>
                    <Flex>
                      <HStack spacing='2px'>
                        <StarIcon color='orange.500'></StarIcon>
                        <StarIcon color={book.rating >= 2 ? "orange.500" : "gray.200"}></StarIcon>
                        <StarIcon color={book.rating >= 3 ? "orange.500" : "gray.200"}></StarIcon>
                        <StarIcon color={book.rating >= 4 ? "orange.500" : "gray.200"}></StarIcon>
                        <StarIcon color={book.rating >= 5 ? "orange.500" : "gray.200"}></StarIcon>
                      </HStack>
                      <Text fontSize='md' fontWeight='bold' ml='4px'>
                        {book.numberOfReviews} Reviews
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{book.description}</Text>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default BookScreen;
