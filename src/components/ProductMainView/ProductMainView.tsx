import React from "react";
import { Flex, Image } from "@chakra-ui/react";

function ProductMainView(imageSrc: string) {
  return (
    <Flex boxSize="xl">
      <Image src={imageSrc} alt="" />
    </Flex>
  );
}

export default ProductMainView;
