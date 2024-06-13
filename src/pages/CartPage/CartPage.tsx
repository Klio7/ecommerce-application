import React from "react";
import { Flex } from "@chakra-ui/react";
import Cart from "../../components/Cart/Cart";

const cartId = "a8abf6b2-f00a-49bd-ad94-713b37054434";
function CartPage() {
  return (
    <Flex justify="center" minHeight="100vh">
      <Cart cartId={cartId} />
    </Flex>
  );
}

export default CartPage;
