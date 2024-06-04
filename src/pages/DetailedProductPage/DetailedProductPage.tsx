import React from "react";
import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import DetailedProduct from "../../components/DetailedProduct/DetailedProduct";

function DetailedProductPage() {
  const { key } = useParams<{ key: string }>();
  if (key) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        bgGradient="radial(basicColorLight,basicColorDark)"
        minH="calc(100vh - 82px - 86px)"
      >
        <DetailedProduct productKey={key} />
      </Flex>
    );
  }
}
export default DetailedProductPage;
