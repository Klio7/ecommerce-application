import React from "react";
import { Flex } from "@chakra-ui/react";
import Cart from "../../components/Cart/Cart";

function CartPage() {
  return (
    <Flex bg="basicColorLight" justify="center">
      <Cart />
    </Flex>
  );
}

export default CartPage;
