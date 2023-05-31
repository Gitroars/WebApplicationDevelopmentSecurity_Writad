import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  Wrap,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useSelector } from "react-redux";
import BasketItem from "../components/BasketItem";
import BasketOrderSummary from "../components/BasketOrderSummary";

const BasketScreen = () => {
  const basketInfo = useSelector((state) => state.basket);
  const { loading, error, basket } = basketInfo;

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
      ) : !basket?.length ? (
        <Alert status='warning'>
          <AlertIcon />
          <AlertTitle>Basket is empty!</AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to='/books'>
              View Books
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          maxW={{ base: "3x1", lg: "7x1" }}
          mx='auto'
          px={{ base: "4", md: "8", lg: "12" }}
          py={{ base: "6", md: "8", lg: "12" }}
        >
          <Stack
            direction={{ base: "column", lg: "row" }}
            align={{ lg: "flex-start" }}
            spacing={{ base: "8", md: "16" }}
          >
            <Stack spacing={{ base: "8", md: "10" }} flex='2'>
              <Heading fontSize='2x1' fontWeight='extrabold'>
                Basket
              </Heading>
              <Stack spacing='6'>
                {basket.map((basketItem) => (
                  <BasketItem key={basketItem.id} basketItem={basketItem}></BasketItem>
                ))}
              </Stack>
            </Stack>
            <Flex direction='column' align='center' flex='1'>
              <BasketOrderSummary />
              <HStack mt='6' fontWeight='semibold'>
                <p>or</p>
                <Link as={ReactLink} to='/books' color={mode("orange.500", "orange.200")}>
                  Continue Shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default BasketScreen;
