import React from "react";
import { Flex } from "@chakra-ui/react";
import DetailedProduct from "../../components/DetailedProduct/DetailedProduct";

function DetailedProductPage() {
  return (
    <Flex justify="space-around" bgGradient="radial(#ded6cb, #bcb5ab)">
      <DetailedProduct />
    </Flex>
  );
}
export default DetailedProductPage;
