import React from "react";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import "./ProductsItem.scss";
import { Link } from "react-router-dom";

function ProductsItem({
  name,
  description,
  imageURL,
  price,
  discountedPrice,
  productKey,
}: {
  name: string | undefined;
  description: string | undefined;
  imageURL: string | undefined;
  price: string | undefined;
  discountedPrice: string | undefined;
  productKey: string | undefined;
}) {
  return (
    <Link to={`${productKey}`}>
      <Box className="products-item" border="1px solid black" padding="1em">
        <Box boxSize="xl" maxWidth="100%">
          <Text justifySelf="center" fontSize="1.5em" fontWeight="bold">
            {name}
          </Text>
          <Text>{description}</Text>
        </Box>
        <Divider />
        {discountedPrice !== undefined ? (
          <Flex alignItems="center" gap="1em">
            <Text fontSize="1.5em">{discountedPrice}</Text>
            <Text fontSize="big" className="grey-price">
              <s>{price}</s>
            </Text>
          </Flex>
        ) : (
          <Text fontSize="1.5em">{price}</Text>
        )}
        <Image
          alignSelf="center"
          boxSize="sm"
          objectFit="cover"
          src={imageURL}
          alt="product-image"
          marginTop="1em"
        />
      </Box>
    </Link>
  );
}

export default ProductsItem;
