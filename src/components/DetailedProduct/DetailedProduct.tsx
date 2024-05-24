import React, { useState, useEffect } from "react";
import { HStack, Container, VStack, Text } from "@chakra-ui/react";
import { ParsedProductData } from "../../types/types";
import ProductMainView from "../ProductMainView/ProductMainView";
import getProductDetails from "../../services/getProductDetails";

function DetailedProduct() {
  const [productData, setProductData] = useState<ParsedProductData>();

  async function getProductData() {
    const data = await getProductDetails("big_bowl").then();
    if (data) {
      const { title, description, images, price } = data;
      setProductData({ title, description, images, price });
    }
    return null;
  }
  useEffect(() => {
    getProductData();
  }, []);

  function renderProductView(data: ParsedProductData): React.JSX.Element {
    if (productData?.images.length === 1) {
      return ProductMainView(data.images[0]);
    }
    return ProductMainView(data.images[0]);
  }
  if (productData === undefined) {
    return null;
  }

  return (
    <HStack>
      <VStack>{renderProductView(productData)}</VStack>
      <VStack>
        <Container>
          <Text>{productData.title}</Text>
        </Container>
        <Container>{productData.description}</Container>
        <Container>{productData.price}</Container>
      </VStack>
    </HStack>
  );
}

export default DetailedProduct;
