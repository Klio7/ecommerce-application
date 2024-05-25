import React, { useState, useEffect } from "react";
import {
  HStack,
  Container,
  VStack,
  Text,
  StackDivider,
  Heading,
  Highlight,
} from "@chakra-ui/react";
import { ParsedProductData } from "../../types/types";
import getProductDetails from "../../services/getProductDetails";
import ImagesView from "../ImagesView/ImagesView";

function DetailedProduct() {
  const [productData, setProductData] = useState<ParsedProductData>();
  const [mainImage, setMainImage] = useState("");
  async function getProductData() {
    const data = await getProductDetails("stocked_set");
    if (data) {
      const { title, description, images, price, discountedPrice } = data;
      setProductData({ title, description, images, price, discountedPrice });
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
          <Heading textAlign="center" fontFamily="detailedPageHeading">
            {productData.title}
          </Heading>
        </Container>
        <Container>
          {!productData.discountedPrice && (
            <Text
              fontSize="3xl"
              textAlign="center"
              fontFamily="detailedPageHeading"
            >
              {productData.price}
            </Text>
          )}
          {productData.discountedPrice && (
            <Text
              fontSize="3xl"
              textAlign="center"
              fontFamily="detailedPageHeading"
            >
              <Highlight
                query={`${productData.price}`}
                styles={{
                  fontSize: "xl",
                  textDecorationLine: "line-through",
                  color: "gray.500",
                }}
              >
                {`${productData.discountedPrice}/${productData.price}`}
              </Highlight>
            </Text>
          )}
        </Container>
        <Container>
          <Text fontSize="2xl" textAlign="center" fontFamily="detailedPageBody">
            {productData.description}
          </Text>
        </Container>
      </VStack>
    </HStack>
  );
}

export default DetailedProduct;
