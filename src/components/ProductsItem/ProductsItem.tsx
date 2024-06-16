import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../services/cartServices";
import getCartProductIds from "../../services/getCartProductIds";
import "./ProductsItem.scss";
import { ParsedProductData } from "../../types/types";
import removeProductFromCart from "../../services/removeProductFromCart";
import { getCartIdFromLocalStorage } from "../../store/LocalStorage";

interface ProductsItemProps {
  product: ParsedProductData | null;
  id: string;
  productKey: string | undefined;
}

function ProductsItem({
  product,
  id,
  productKey,
}: ProductsItemProps) {
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [removalIds, setRemovalIds] = useState<string[]>([]);
  const toast = useToast();
  const cartId = getCartIdFromLocalStorage();

  useEffect(() => {
    async function fetchCartData() {
      if (cartId) {
      try {
        const data = await getCartProductIds(cartId);
        setCartIds(data[0]);
        setRemovalIds(data[1]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch cart data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }

    if (cartId) {
      fetchCartData();
    }
  }, [cartId, toast]);

  useEffect(() => {
    setIsInCart(cartIds.includes(id));
  }, [cartIds, id]);

  if (!product) {
    return null;
  }

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addProductToCart(id);
      setIsInCart(true);
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (event: React.MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (cartId && removalIds.length > 0) {
        const removalId = removalIds[cartIds.indexOf(id)];
        await removeProductFromCart(cartId, removalId);
        setIsInCart(false);
        toast({
          title: "Removed from cart",
          description: `${product?.title} has been removed from your cart.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove product from cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link to={`${productKey}`}>
      <Box className="products-item" border="1px solid black" padding="1em">
        <Box boxSize="xl" maxWidth="100%">
          <Text justifySelf="center" fontSize="1.5em" fontWeight="bold">
            {product.title}
          </Text>
          <Text>{product.description}</Text>
        </Box>
        <Divider />
        <Flex alignItems="center" gap="1em">
          {product.discountedPrice ? (
            <>
              <Text fontSize="1.5em">{product.discountedPrice}</Text>
              <Text fontSize="big" className="grey-price">
                <s>{product.price}</s>
              </Text>
            </>
          ) : (
            <Text fontSize="1.5em">{product.price}</Text>
          )}
          {isInCart ? (
            <Button
              isDisabled={loading}
              onClick={(event) => {
                event.preventDefault();
                handleRemoveFromCart(event);
              }}
            >
              {loading ? "Removing..." : "Remove from Cart"}
            </Button>
          ) : (
            <Button
              isDisabled={loading}
              onClick={(event) => {
                event.preventDefault();
                handleAddToCart();
              }}
            >
              {loading ? "Adding..." : "Add to Cart"}
            </Button>
          )}
        </Flex>
        <Image
          alignSelf="center"
          boxSize="sm"
          objectFit="cover"
          src={product.images[0]}
          alt="product-image"
          marginTop="1em"
        />
      </Box>
    </Link>
  );
}

export default ProductsItem;
