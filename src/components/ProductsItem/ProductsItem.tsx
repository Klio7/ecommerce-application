import React from "react";
import { Box, Image } from "@chakra-ui/react";
import "./ProductsItem.scss"

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
    <Box className="products-item" width="sm" height="max-content" border="1px solid black" padding="1em">
      <p>{name}</p>
      <p>{description}</p>
      {discountedPrice !== undefined ? (
        <>
          <p>{discountedPrice}</p>
          <p className="grey-price">
            <s>{price}</s>
          </p>
        </>
      ) : (
        <p>{price}</p>
      )}
      <Image boxSize="sm" objectFit="cover" src={imageURL} alt="" />
    </Box>
  );
}

export default ProductsItem;
