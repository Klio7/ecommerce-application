import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { AdditionalImageView } from "../../types/types";

function ProductAdditionalView({
  imageSrc,
  setMainImage,
}: AdditionalImageView) {
  return (
    <Flex key={imageSrc}>
      <Image
        src={imageSrc}
        boxSize="140px"
        alt=""
        onClick={() => setMainImage(imageSrc)}
      />
    </Flex>
  );
}
export default ProductAdditionalView;
