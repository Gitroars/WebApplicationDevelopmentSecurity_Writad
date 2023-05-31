import { Button, Flex, Heading, Stack, Text, useColorModeValue as mode, Badge } from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";

const BasketOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState();
  const basketItems = useSelector((state) => state.basket);
  const { subtotal } = basketItems;
  const navigate = useNavigate;

  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate("/checkout");
  };

  return (
    <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' w='full'>
      <Heading size='md'>Order Summary</Heading>
      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode("gray.600", "gray.400")}>
            Subtotal
          </Text>
          <Text fontWeight='medium'>{subtotal}</Text>
        </Flex>
        <Flex justify='space-between'></Flex>
      </Stack>
      <Button
        as={ReactLink}
        to='/checkout'
        colorScheme='orange'
        size='lg'
        fontSize='md'
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Checkout
      </Button>
    </Stack>
  );
};

export default BasketOrderSummary;
