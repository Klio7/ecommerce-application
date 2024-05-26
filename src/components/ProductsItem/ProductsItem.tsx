import React from "react";
import { Box, Image } from "@chakra-ui/react";

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
  discountedPrice?: string;
}) {
  return (
    <Box width="sm" height="max-content" border="1px solid black" padding="1em">
      <p>{name}</p>
      <p>{description}</p>
      {discountedPrice !== "undefined" ? (
        <>
          <p>{discountedPrice}</p>
          <p>
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

ProductsItem.defaultProps = {
  discountedPrice: "undefined",
};

export default ProductsItem;
