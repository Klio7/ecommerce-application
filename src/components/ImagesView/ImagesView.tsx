import React from "react";
import { HStack } from "@chakra-ui/react";
import ProductMainView from "../ProductMainView/ProductMainView";
import ProductAdditionalView from "../ProductAdditionalView/ProductAdditionalView";
import { ImageViewProps } from "../../types/types";

function ImagesView({
  images,
  mainImageURL,
  handleMainImageChange,
}: ImageViewProps) {
  return (
    <>
      {ProductMainView(mainImageURL)}
      {images.length > 1 && (
        <HStack>
          {images.map((src) => (
            <ProductAdditionalView
              imageSrc={src}
              replaceMainImage={handleMainImageChange}
              key={src}
            />
          ))}
        </HStack>
      )}
    </>
  );

  /* return (
    <Flex>
      <Text>Sorry, photos are not available</Text>
    </Flex>
  ); */
}

export default ImagesView;
