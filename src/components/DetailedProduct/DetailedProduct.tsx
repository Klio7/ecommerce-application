import React, { useState, useEffect, useContext } from "react";
import {
  Flex,
  Container,
  Text,
  Divider,
  Heading,
  Highlight,
  useToast,
  Button,
} from "@chakra-ui/react";
import { ParsedProductData } from "../../types/types";
import getProductDetails from "../../services/getProductDetails";
import DetailedProductModal from "../DetailedProductModal/DetailedProductModal";
import getProductId from "../../services/getProductId";
import { addProductToCart } from "../../services/cartServices";
import getCartProductIds from "../../services/getCartProductIds";
import removeProductFromCart from "../../services/removeProductFromCart";
import { getCartIdFromLocalStorage } from "../../store/LocalStorage";
import { CartContext } from "../../contexts/CartContext";

function DetailedProduct({ productKey }: { productKey: string }) {
  const [productData, setProductData] = useState<ParsedProductData>();
  const [productId, setProductId] = useState<string>();
  const [mainImage, setMainImage] = useState<string>("");
  const [isOpen, setModalOpen] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>();
  const [cartIds, setCartIds] = useState<string[]>();
  const [removalIds, setRemovalIds] = useState<string[]>();
  const toast = useToast();
  const cartId = getCartIdFromLocalStorage();
  const { setCartItemsCount } = useContext(CartContext);

  useEffect(() => {
    async function getProductData() {
      try {
        const data = await getProductDetails(productKey);
        const id = await getProductId(productKey);
        if (data && id) {
          const { title, description, images, price, discountedPrice } = data;
          setProductData({
            title,
            description,
            images,
            price,
            discountedPrice,
          });
          setProductId(id);
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

  useEffect(() => {
    async function getCart(cardId: string) {
      try {
        const data = await getCartProductIds(cardId);
        setCartIds(data[0]);
        setRemovalIds(data[1]);
        setCartItemsCount(data[0].length);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            position: "top",
            title: "Sorry!",
            description: `${error.message}`,
            status: "error",
            duration: 6000,
            isClosable: true,
          });
        }
      }
    }
    if (cartId !== null) {
      getCart(cartId);
    }
  }, [isInCart, toast, cartId, setCartItemsCount]);

  useEffect(() => {
    setIsInCart(cartIds?.some((id) => id === productId));
  }, [cartIds, productId]);

  async function HandleAddToCart() {
    try {
      if (productId) {
        await addProductToCart(productId);
        setIsInCart(true);
        toast({
          position: "top",
          title: "Success!",
          description: "Product successfully added to cart",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          position: "top",
          title: "Sorry!",
          description: `${error.message}`,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
    }
  }

  async function HandleRemoveFromCart() {
    try {
      if (removalIds && cartIds && productId && cartId) {
        await removeProductFromCart(
          cartId,
          removalIds[cartIds?.indexOf(productId)],
        );
        setIsInCart(false);
        toast({
          position: "top",
          title: "Success!",
          description: "Product successfully removed from cart",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          position: "top",
          title: "Sorry!",
          description: `${error.message}`,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
    }
  }

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
        {isInCart ? (
          <Button marginTop="2em" onClick={() => HandleRemoveFromCart()}>
            Remove from Cart
          </Button>
        ) : (
          <Button marginTop="2em" onClick={() => HandleAddToCart()}>
            Add to Cart
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default DetailedProduct;
