import React, { useState, useEffect } from "react";
import {
  HStack,
  Container,
  VStack,
  Text,
  StackDivider,
  Heading,
} from "@chakra-ui/react";
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
    <HStack align="strech">
      <VStack>
        <ImagesView
          images={productData?.images}
          mainImageURL={mainImage}
          handleMainImageChange={setMainImage}
        />
      </VStack>
      <VStack
        bg="white"
        border="2px"
        borderColor="#3A3845"
        spacing="30px"
        padding="50px"
        divider={<StackDivider borderColor="#3A3845" />}
      >
        <Container marginBottom={10}>
          <Heading textAlign="center" fontFamily="myHeading">
            {productData.title}
          </Heading>
        </Container>
        <Container>
          <Text fontSize="3xl" textAlign="center" fontFamily="myHeading">
            {productData.price}
          </Text>
        </Container>
        <Container>
          <Text fontSize="2xl" textAlign="center" fontFamily="myBody">
            {productData.description}
          </Text>
        </Container>
      </VStack>
    </HStack>
  );
}

export default DetailedProduct;
