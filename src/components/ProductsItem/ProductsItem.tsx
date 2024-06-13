import React from "react";
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

  if (!product) {
    return null;
  }

  const handleAddToCart = async () => {
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
    <Link to={productKey ? `/products/${productKey}` : "#"}>
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
