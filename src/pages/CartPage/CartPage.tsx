import React from "react";
import { Flex } from "@chakra-ui/react";
import Cart from "../../components/Cart/Cart";

const cartId = "f8b29451-c39c-4836-8da2-e17b803e2a7b";
function CartPage() {
  return (
    <Flex justify="center" h="100vh">
      <Cart cartId={cartId} />
    </Flex>
  );
}

export default CartPage;
