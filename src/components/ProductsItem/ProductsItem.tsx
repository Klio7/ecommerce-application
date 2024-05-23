import React from "react";
import { Box } from "@chakra-ui/react";

function ProductsItem({
  name,
  description,
  imageURL,
}: {
  name: string;
  description: string;
  imageURL: string;
}) {
  return (
    <Box>
      <p>{name}</p>
      <p>{description}</p>
      <img src={imageURL} alt="" />
    </Box>
  );
}

export default ProductsItem;
