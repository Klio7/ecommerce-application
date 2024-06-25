import React from "react";
import { useSearchParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Checkout from "../../components/Checkout/Checkout";

function CheckoutPage() {
  const [searchParams] = useSearchParams("cartId");
  const cartId = searchParams.get("cartId") ?? "";

  return (
    <Flex justify="center" h="100vh">
      <Checkout cartId={cartId} />
    </Flex>
  );
}

export default CheckoutPage;
