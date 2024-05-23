import React, { useState } from "react";
import { Image } from "@commercetools/platform-sdk";
import { Center, Flex, Container, VStack, Text } from "@chakra-ui/react";
import getProduct from "../../services/getProduct";

function DetailedProduct() {
  const [productData, setProductData] = useState<{
    title: string;
    productDescription: string;
    images: Image[];
    price: string;
  }>();

  async function getProductData() {
    const data = await getProduct("big_bowl_midnight").then();
    console.log(data.price);
    const { title, productDescription, images, price } = data;
    if (images) {
      setProductData({ title, productDescription, images, price });
    }
  }
  getProductData();
  if (productData) {
    return (
      <Center>
        <Flex>
          <img
            src={productData.images[0].url}
            alt=""
            width="1000px"
            height="1143px"
          />
        </Flex>
        <Flex>
          <img
            src={productData.images[1].url}
            alt=""
            width="1000px"
            height="1143px"
          />
        </Flex>
        <Flex>
          <img
            src={productData.images[2].url}
            alt=""
            width="1000px"
            height="1143px"
          />
        </Flex>
        <Flex>
          <img
            src={productData.images[3].url}
            alt=""
            width="1000px"
            height="1143px"
          />
        </Flex>
        <VStack>
          <Container>
            <Text>{productData.title}</Text>
          </Container>
          <Container>{productData.productDescription}</Container>
          <Container>{productData.price}</Container>
        </VStack>
      </Center>
    );
  }
}

export default DetailedProduct;
