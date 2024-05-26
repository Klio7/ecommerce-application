import React from "react";
import { Flex, Image } from "@chakra-ui/react";

function ProductMainView(imageSrc: string) {
  return (
    <Flex justify="center" grow="1">
      <Image src={imageSrc} alt="" boxSize="xl" objectFit="cover" />
    </Flex>
  );
}

export default ProductMainView;
