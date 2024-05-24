import React from "react";
import { Flex, Image } from "@chakra-ui/react";

function ProductMainView(imageSrc: string) {
  return (
    <Flex>
      <Image src={imageSrc} alt="" width="1000px" height="1143px" />
    </Flex>
  );
}

export default ProductMainView;
