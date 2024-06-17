import React, { useContext, useEffect, useState } from "react";
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
import "./ProductsItem.scss";
import { ParsedProductData } from "../../types/types";
import { CartContext } from "../../contexts/CartContext";
import getCartProductIds from "../../services/getCartProductIds";
import { getCartIdFromLocalStorage } from "../../store/LocalStorage";
import removeProductFromCart from "../../services/removeProductFromCart";

interface ProductsItemProps {
  product: ParsedProductData | null;
  id: string;
  productKey: string | undefined;
}

function ProductsItem({ product, id, productKey }: ProductsItemProps) {
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [removalIds, setRemovalIds] = useState<string[]>([]);
  const toast = useToast();
  const { setCartItemsCount } = useContext(CartContext);
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
  }, [cartId, toast, isInCart, setCartItemsCount]);

  useEffect(() => {
    setIsInCart(cartIds.includes(id));
  }, [cartIds, id]);

  if (!product) {
    return null;
  }

  const handleAddToCart = async () => {
    async function getCart(cardId: string) {
      try {
        const data = await getCartProductIds(cardId);
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
      if (cartId !== null) {
        getCart(cartId);
      } else {
        setCartItemsCount(1);
      }
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
