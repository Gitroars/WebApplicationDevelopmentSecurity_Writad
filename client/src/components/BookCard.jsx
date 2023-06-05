import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBasketItem } from "../redux/actions/basketActions";

const Rating = ({ rating, numberOfReviews }) => {
  const { iconSize, setIconSize } = useState("14px");
  return (
    <Flex>
      <HStack spacing='2px'>
        <StarIcon size={iconSize} w='14px' color='orange.500' />
        <StarIcon size={iconSize} w='14px' color={rating >= 2 ? "orange.500" : "gray.200"} />
        <StarIcon size={iconSize} w='14px' color={rating >= 3 ? "orange.500" : "gray.200"} />
        <StarIcon size={iconSize} w='14px' color={rating >= 4 ? "orange.500" : "gray.200"} />
        <StarIcon size={iconSize} w='14px' color={rating >= 5 ? "orange.500" : "gray.200"} />
      </HStack>
      <Text fontSize='md' fontWeight='bold' ml='4px'>
        {`${numberOfReviews} ${numberOfReviews === 1 ? "Review" : "Reviews"}`}
      </Text>
    </Flex>
  );
};

const BookCard = ({ book, isBooks: isOwned = true, showRating = true }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const basketInfo = useSelector((state) => state.basket);
  const { basket } = basketInfo;

  const addBook = (id) => {
    if (basket.some((basketItem) => basketItem.id === id)) {
      toast({
        description: "This book has already been added previously.",
        status: "error",
        isClosable: true,
      });
    } else {
      dispatch(addBasketItem(id, 1));
      toast({
        description: "This book has successfully been added.",
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <Stack
      p='2'
      spacing='3px'
      bg={useColorModeValue("white", "gray.750")}
      minW='250px'
      h='500px'
      borderWidth='2px'
      rounded='lg'
      shadow='lg'
      position='relative'
    >
      {book.productIsNew && <Circle size='10px' position='absolute' top={3} right={3} bg='green.300' />}
      {book.stock && <Circle size='10px' position='absolute' top={3} right={3} bg='red.300' />}
      <Image src={book.image} alt={book.name} roundedTop='lg' />

      <Box flex='2' maxH='8' alignItems='baseline'>
        {book.productIsNew && (
          <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
            New
          </Badge>
        )}
      </Box>

      <Flex mt='2' justifyContent='space-between' alignContent='center'>
        {!isOwned && (
          <>
            <Link as={ReactLink} to={`/book/${book._id}`} pt='2' cursor='pointer'>
              <Box fontSize='2x1' fontWeight='semibold' lineHeight='tight'>
                {book.name}
              </Box>
            </Link>
          </>
        )}
      </Flex>

      <Flex justify='space-between'>
        {isOwned && (
          <Box fontSize='2x1'>
            <Box as='span' color={"gray.600"} fontSize='lg'>
              $
            </Box>
            {Number(book.price).toFixed(2)}
          </Box>
        )}

        {isOwned && (
          <Tooltip label='Add to Basket' bg='white' placement='top' color='gray.900' fontSize='1.25em'>
            <Button variant='ghost' display='flex' disabled={book.stock <= 0} onClick={() => addBook(book._id)}>
              <Icon as={RiShoppingBasket2Line} h={8} w={8} alignSelf='center' />
            </Button>
          </Tooltip>
        )}
      </Flex>

      {showRating && (
        <Flex justifyContent='space-between' alignContent='center' py='2'>
          <Rating rating={book.rating} numberOfReviews={book.numberOfReviews} />
        </Flex>
      )}
    </Stack>
  );
};

export default BookCard;
