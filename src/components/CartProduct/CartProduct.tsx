import React from "react";
import { Flex, Image, Text, IconButton } from "@chakra-ui/react";
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import { ICartProduct } from "../../types/types";

function CartProduct({
  imageUrl,
  title,
  price,
  number,
  totalProductPrice,
}: ICartProduct) {
  return (
    <Flex p="10px" w="100%" align="center" m="5px" bg="white">
      <Image src={imageUrl} alt="photo" boxSize="100px" />
      <Flex w="20%">
        <Text fontWeight="600" px="10px">
          {title}
        </Text>
      </Flex>
      <Flex w="20%" direction="column">
        {price}
        <Text>/per item</Text>
      </Flex>
      <Flex w="20%" align="center">
        <IconButton aria-label="Search database" icon={<MinusIcon />} />
        <Text px="5px">{number}</Text>
        <IconButton aria-label="Search database" icon={<AddIcon />} />
      </Flex>
      <Flex w="20%">{totalProductPrice}</Flex>
      <IconButton aria-label="Search database" icon={<DeleteIcon />} />
    </Flex>
  );
}

export default CartProduct;
