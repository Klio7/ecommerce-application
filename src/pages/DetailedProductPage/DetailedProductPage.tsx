import React from "react";
import { Flex } from "@chakra-ui/react";
import DetailedProduct from "../../components/DetailedProduct/DetailedProduct";

function DetailedProductPage() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bgGradient="radial(basicColorLight,basicColorDark)"
      minH="calc(100vh - 82px - 86px)"
    >
      <DetailedProduct />
    </Flex>
  );
}
export default DetailedProductPage;
