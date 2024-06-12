import React from "react";
import { Flex } from "@chakra-ui/react";
import Cart from "../../components/Cart/Cart";

const cartId = "810e88ae-27ae-43cd-af6f-f25a003f9579";
function CartPage() {
  return (
    <Flex justify="center" minHeight="100vh">
      <Cart cartId={cartId} />
    </Flex>
  );
}

export default CartPage;
