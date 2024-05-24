import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { AdditionalImageViewProps } from "../../types/types";

function ProductAdditionalView({
  imageSrc,
  replaceMainImage,
}: AdditionalImageViewProps) {
  return (
    <Flex key={imageSrc}>
      <Image
        src={imageSrc}
        boxSize="200px"
        alt=""
        onClick={() => replaceMainImage(imageSrc)}
      />
    </Flex>
  );
}
export default ProductAdditionalView;
