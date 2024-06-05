import React from "react";
import { Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { AddIcon, MinusIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { ICartProduct } from "../../types/types";

function CartProduct({
  imageUrl,
  title,
  price,
  number,
  totalProductPrice,
}: ICartProduct) {
  return (
    <Flex
      p="10px"
      w="100%"
      align="center"
      m="5px"
      gap="10px"
      borderBottom="2px solid"
      borderColor="footerColorDark"
    >
      <IconButton
        aria-label="Search database"
        icon={<SmallCloseIcon />}
        color="red.500"
        colorScheme="white"
        w="10%"
      />
      <Image src={imageUrl} alt="photo" boxSize="100px" />
      <Flex w="20%">
        <Text fontWeight="600" px="10px">
          {title}
        </Text>
      </Flex>
      <Flex w="20%" direction="column">
        <Text> {price}</Text>
      </Flex>
      <Flex w="20%" align="center">
        <IconButton
          aria-label="Search database"
          icon={<MinusIcon />}
          color="footerColorDark"
          colorScheme="white"
        />
        <Text px="5px">{number}</Text>
        <IconButton
          aria-label="Search database"
          icon={<AddIcon />}
          color="footerColorDark"
          colorScheme="white"
        />
      </Flex>
      <Flex w="20%" color="orange.600">
        {totalProductPrice}
      </Flex>
    </Flex>
  );
}

export default CartProduct;
