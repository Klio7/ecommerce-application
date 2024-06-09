import React from "react";
import { Flex } from "@chakra-ui/react";
import Cart from "../../components/Cart/Cart";

const cartId = "9ba8f627-278e-4fe4-b6e6-5b49c986b66b";
function CartPage() {
  return (
    <Flex justify="center" align="center">
      <Cart cartId={cartId} />
    </Flex>
  );
}

export default CartPage;
