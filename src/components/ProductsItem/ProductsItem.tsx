import React, { useContext } from "react";
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

interface ProductsItemProps {
  product: ParsedProductData | null;
  id: string;
  productKey: string | undefined;
  // inCart: boolean | undefined;
}

function ProductsItem({
  product,
  id,
  productKey,
  // inCart,
}: ProductsItemProps) {
  // const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { setCartItemsCount } = useContext(CartContext);
  const cartId = getCartIdFromLocalStorage();

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
    // setLoading(true);
    try {
      await addProductToCart(id);
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
      // setLoading(false);
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
          <Button
            colorScheme="teal"
            // isDisabled={inCart || loading}
            onClick={(event) => {
              event.preventDefault();
              handleAddToCart();
            }}
          >
            Add to Cart
            {/* {inCart ? "In Cart" : loading ? "Adding..." : "Add to Cart"} */}
          </Button>
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
