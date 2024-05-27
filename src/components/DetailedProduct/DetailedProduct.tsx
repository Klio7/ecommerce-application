import React, { useState, useEffect } from "react";
import {
  HStack,
  Container,
  VStack,
  Text,
  StackDivider,
  Heading,
  Highlight,
  useToast,
} from "@chakra-ui/react";
import { ParsedProductData } from "../../types/types";
import getProductDetails from "../../services/getProductDetails";
import DetailedProductModal from "../DetailedProductModal/DetailedProductModal";

function DetailedProduct() {
  const [productData, setProductData] = useState<ParsedProductData>();
  const [mainImage, setMainImage] = useState("");
  const [isOpen, setModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function getProductData() {
      try {
        const data = await getProductDetails("utensil_crock");
        if (data) {
          const { title, description, images, price, discountedPrice } = data;
          setProductData({
            title,
            description,
            images,
            price,
            discountedPrice,
          });
          setMainImage(images[0]);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "NotFound") {
            toast({
              position: "top",
              title: "Sorry!",
              description: "Product is not found",
              status: "error",
              duration: 6000,
              isClosable: true,
            });
          } else {
            toast({
              position: "top",
              title: "Sorry! There is temporary error.",
              description: `Check your Internet connection.`,
              status: "error",
              duration: 6000,
              isClosable: true,
            });
          }
        }
      }
    }
    getProductData();
  }, [toast]);

  if (productData === undefined) {
    return null;
  }

  return (
    <HStack align="strech">
      <VStack>
        <DetailedProductModal
          images={productData?.images}
          mainImage={mainImage}
          setMainImage={setMainImage}
          isOpen={isOpen}
          setModalOpen={setModalOpen}
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
