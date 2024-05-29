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
        _hover={{
          cursor: "pointer",
          border: "2px solid white",
          transform: "scale(1.1)",
        }}
      />
    </Flex>
  );
}
export default ProductAdditionalView;
