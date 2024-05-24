import React, { useState, useEffect } from "react";
import { HStack, Container, VStack, Text } from "@chakra-ui/react";
import { ParsedProductData } from "../../types/types";
import getProductDetails from "../../services/getProductDetails";
import ImagesView from "../ImagesView/ImagesView";

function DetailedProduct() {
  const [productData, setProductData] = useState<ParsedProductData>();
  const [mainImage, setMainImage] = useState("");
  async function getProductData() {
    const data = await getProductDetails("big_bowl");
    if (data) {
      const { title, description, images, price } = data;
      setProductData({ title, description, images, price });
      setMainImage(images[0]);
    }
    return null;
  }
  useEffect(() => {
    getProductData();
  }, []);

  if (productData === undefined) {
    return null;
  }

  return (
    <HStack>
      <VStack>
        <ImagesView
          images={productData?.images}
          mainImageURL={mainImage}
          handleMainImageChange={setMainImage}
        />
      </VStack>
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
