import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function CartHeader() {
  return (
    <Flex
      direction="row"
      p="10px"
      w="100%"
      align="center"
      m="5px"
      gap="10px"
      bg="footerColorDark"
      color="white"
      textAlign="center"
    >
      <DeleteIcon w="10%" />
      <Text w="15%">PHOTO</Text>
      <Text w="25%">PRODUCT</Text>
      <Text w="20%">PRICE</Text>
      <Text w="20%">QUANTITY</Text>
      <Text w="20%">SUBTOTAL</Text>
    </Flex>
  );
}

export default CartHeader;
