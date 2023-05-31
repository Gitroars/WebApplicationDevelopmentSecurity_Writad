import React from "react";
import { CloseButton, Flex, Select, useColorModeValue as mode, Stack, Image, Box, Text } from "@chakra-ui/react";
import { addBasketItem, removeBasketItem } from "../redux/actions/basketActions";
import { useDispatch } from "react-redux";

const BasketItem = ({ basketItem }) => {
  const { name, image, price, stock, qty, id } = basketItem;
  const dispatch = useDispatch();
  return (
    <Flex direction={{ base: "column", md: "row" }} justify='space-between' align='center'>
      <Stack direction='row' spacing='5' width='full'>
        <Image rounded='lg' w='120px' h='120px' fit='cover' src={image} alt={name} draggable='false' loading='lazy' />
        <Box pt='4'>
          <Flex direction='column' alignItems='flex-start'>
            <Text fontWeight='medium'>{name}</Text>
            <Text fontWeight='bold'>${price}</Text>
          </Flex>
        </Box>
      </Stack>
      <CloseButton onClick={() => dispatch(removeBasketItem(id))} />
    </Flex>
  );
};

export default BasketItem;
