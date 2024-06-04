import React, { useState, useEffect } from "react";
import {
  Flex,
  Container,
  Text,
  Divider,
  Heading,
  Highlight,
  useToast,
} from "@chakra-ui/react";
import { ParsedProductData } from "../../types/types";
import getProductDetails from "../../services/getProductDetails";
import DetailedProductModal from "../DetailedProductModal/DetailedProductModal";

function DetailedProduct({ productKey }: { productKey: string }) {
  const [productData, setProductData] = useState<ParsedProductData>();
  const [mainImage, setMainImage] = useState("");
  const [isOpen, setModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function getProductData() {
      try {
        const data = await getProductDetails(productKey);
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
  }, [toast, productKey]);

  if (productData === undefined) {
    return null;
  }

  return (
    <Flex
      direction={["column", "column", "column", "row"]}
      align={["center", "center", "stretch"]}
    >
      <Flex direction="column">
        <DetailedProductModal
          images={productData?.images}
          mainImage={mainImage}
          setMainImage={setMainImage}
          isOpen={isOpen}
          setModalOpen={setModalOpen}
        />
      </Flex>
      <Flex
        direction="column"
        bg="white"
        border="2px"
        borderColor="#3A3845"
        alignItems="center"
        maxW={["20em", "md", "2xl", "md", "xl"]}
        px={[0, 0, "5px", "20px", "50px"]}
        py={[0, 0, "5px", "50px", "50px"]}
      >
        <Container my={10}>
          <Heading
            textAlign="center"
            fontFamily="detailedPageHeading"
            fontSize={["2xl", "2xl", "2xl", "3xl", "5xl"]}
          >
            {productData.title}
          </Heading>
        </Container>
        <Divider orientation="horizontal" />
        <Container my={7}>
          {!productData.discountedPrice && (
            <Text
              fontSize={["2xl", "xl", "2xl", "2xl", "4xl"]}
              textAlign="center"
              fontFamily="detailedPageHeading"
            >
              {productData.price}
            </Text>
          )}
          {productData.discountedPrice && (
            <Text
              fontSize={["2xl", "xl", "2xl", "2xl", "4xl"]}
              textAlign="center"
              fontFamily="detailedPageHeading"
            >
              <Highlight
                query={`${productData.price}`}
                styles={{
                  textDecorationLine: "line-through",
                  color: "gray.500",
                }}
              >
                {`${productData.discountedPrice}/${productData.price}`}
              </Highlight>
            </Text>
          )}
        </Container>
        <Divider orientation="horizontal" />
        <Container mt={7}>
          <Text
            fontSize={["xl", "lg", "xl", "xl", "3xl"]}
            textAlign="center"
            fontFamily="detailedPageBody"
          >
            {productData.description}
          </Text>
        </Container>
      </Flex>
    </Flex>
  );
}

export default DetailedProduct;
