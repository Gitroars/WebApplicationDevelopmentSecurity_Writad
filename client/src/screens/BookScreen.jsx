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
  Tooltip,
  Input,
  Textarea,
  Link,
} from "@chakra-ui/react";
import { MinusIcon, StarIcon, SmallAddIcon } from "@chakra-ui/icons";
import { BiCheckShield } from "react-icons/bi";
import { FaInfinity } from "react-icons/fa";
import { FiAward } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { createBookReview, getBook, resetBookError } from "../redux/actions/bookActions";
import { addBasketItem } from "../redux/actions/basketActions";
import { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { getBooks } from "../redux/actions/libraryActions";

const BookScreen = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const [isOwned, setIsOwned] = useState(false);

  const library = useSelector((state) => state.library);
  const { loading: libraryLoading, error: libraryError, books: libraryBooks } = library;
  let { id } = useParams();
  const dispatch = useDispatch();

  const toast = useToast();
  const books = useSelector((state) => state.books);
  const { loading, error, book, reviewSend } = books;

  const basketContent = useSelector((state) => state.basket);
  const { basket } = basketContent;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    dispatch(getBooks); // for library
    dispatch(getBook(id));
    if (reviewSend) {
      toast({ description: "Book review uploaded", status: "success", isClosable: true });
      dispatch(resetBookError());
      setReviewBoxOpen(false);
    }
    const checkUserOwnership = async () => {
      const result = await hasUserPurchased();
      setIsOwned(true);
    };
    checkUserOwnership();
  }, [dispatch, id, basket, reviewSend]);

  const hasUserReviewed = () => book.reviews.some((book) => book.user === userInfo._id);
  const hasUserPurchased = () => {
    return libraryBooks.some((book) => book._id === id);
  };
  const onSubmit = () => {
    dispatch(createBookReview(book._id, userInfo._id, comment, rating, title));
  };

  const addBook = () => {
    dispatch(addBasketItem(book._id, 1));
    toast({ description: "Book added successfully", status: "success", isClosable: true });
  };

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
            <Stack Stack direction={{ base: "column", lg: "row" }} align={{ lg: "flex-start" }}>
              <Flex direction='column' align='center' flex='1' _dark={{ bg: "gray.900" }}>
                <Image mb='30px' src={book.image} alt={book.name} />
              </Flex>
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
                <Heading fontSize='3x2' fontWeight='extrabold'>
                  {book.name}
                </Heading>
                <Text>Author: {book.author}</Text>

                <Stack spacing='5'>
                  <Flex direction='column' align='center' flex='1' _dark={{ bg: "gray.900" }}></Flex>
                  <Box>
                    {!hasUserPurchased() && (
                      <>
                        <Text fontSize='x1'>${book.price}</Text>
                      </>
                    )}

                    <Flex>
                      <HStack spacing='2px'>
                        <StarIcon color={book.rating >= 1 ? "orange.500" : "gray.200"}></StarIcon>
                        <StarIcon color={book.rating >= 2 ? "orange.500" : "gray.200"}></StarIcon>
                        <StarIcon color={book.rating >= 3 ? "orange.500" : "gray.200"}></StarIcon>
                        <StarIcon color={book.rating >= 4 ? "orange.500" : "gray.200"}></StarIcon>
                        <StarIcon color={book.rating >= 5 ? "orange.500" : "gray.200"}></StarIcon>
                      </HStack>
                      <Text fontSize='lg' ml='4px'>
                        {book.rating}
                      </Text>
                      <Text fontSize='md' ml='4px'>
                        ({book.numberOfReviews} Reviews)
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{book.description}</Text>
                  {!hasUserPurchased() && (
                    <>
                      <Button colorScheme='orange' onClick={() => addBook()}>
                        Add to basket
                      </Button>
                    </>
                  )}
                  {hasUserPurchased() && (
                    <Link to={`/read/${id}`} style={{ paddingTop: "2", cursor: "pointer" }}>
                      <Button colorScheme='orange'>Read</Button>
                    </Link>
                  )}

                  <Stack width='270px'>
                    <Flex alignItems='center'>
                      <FaInfinity size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Full Lifetime Access
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <BiCheckShield size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        7-Day Money-Back Guarantee
                      </Text>
                    </Flex>
                    <Flex alignItems='center'>
                      <FiAward size='20px' />
                      <Text fontWeight='medium' fontSize='sm' ml='2'>
                        Original Content
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            {userInfo && (
              <>
                <Tooltip label={hasUserReviewed() ? "You have already reviewed this product." : ""} fontSize='md'>
                  <Button
                    isDisabled={hasUserReviewed()}
                    my='20px'
                    w='140px'
                    colorScheme='orange'
                    onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
                  >
                    Write a review
                  </Button>
                </Tooltip>
                {reviewBoxOpen && (
                  <Stack mb='20px'>
                    <Wrap>
                      <HStack spacing='2px'>
                        <Button variant='outline' onClick={() => setRating(1)}>
                          <StarIcon color='orange.500' />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(2)}>
                          <StarIcon color={rating >= 2 ? "orange.500" : "gray.200"} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(3)}>
                          <StarIcon color={rating >= 3 ? "orange.500" : "gray.200"} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(4)}>
                          <StarIcon color={rating >= 4 ? "orange.500" : "gray.200"} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(5)}>
                          <StarIcon color={rating >= 5 ? "orange.500" : "gray.200"} />
                        </Button>
                      </HStack>
                    </Wrap>
                    <Input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder='Review title (optional)'
                    />
                    <Textarea
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder={`The ${book.name} is...`}
                    />
                    <Button w='140px' colorScheme='orange' onClick={() => onSubmit()}>
                      Submit
                    </Button>
                  </Stack>
                )}
              </>
            )}

            <Stack my='20'>
              <Text fontSize='xl' fontWeight='bold'>
                Reviews
              </Text>
              <SimpleGrid minChildWidth='100%' spacingX='40px' spacingY='20px'>
                {book.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing='2px' alignItems='center'>
                      <StarIcon color='orange.500' />
                      <StarIcon color={book.rating >= 2 ? "orange.500" : "gray.200"}></StarIcon>
                      <StarIcon color={review.rating >= 3 ? "orange.500" : "gray.200"}></StarIcon>
                      <StarIcon color={review.rating >= 4 ? "orange.500" : "gray.200"}></StarIcon>
                      <StarIcon color={review.rating >= 5 ? "orange.500" : "gray.200"}></StarIcon>
                      <Text fontWeight='semibold' ml='4px'>
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py='12px'>{review.comment}</Box>
                    <Text fontSize='sm' color='gray.400'>
                      by {review.name}, {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default BookScreen;
