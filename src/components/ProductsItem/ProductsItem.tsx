import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import "./ProductsItem.scss";

function ProductsItem({
  name,
  description,
  imageURL,
  price,
  discountedPrice,
}: {
  name: string | undefined;
  description: string | undefined;
  imageURL: string | undefined;
  price: string | undefined;
  discountedPrice: string | undefined;
}) {
  return (
    <Box
      className="products-item"
      border="1px solid black"
      padding="1em"
    >
      <Text>{name}</Text>
      <Text>{description}</Text>
      {discountedPrice !== undefined ? (
        <>
          <Text>{discountedPrice}</Text>
          <Text className="grey-price">
            <s>{price}</s>
          </Text>
        </>
      ) : (
        <Text>{price}</Text>
      )}
      <Image alignSelf='center' boxSize="sm" objectFit="cover" src={imageURL} alt="" />
    </Box>
  );
}

export default ProductsItem;
