import React from "react";
import { HStack } from "@chakra-ui/react";
import ProductMainView from "../ProductMainView/ProductMainView";
import ProductAdditionalView from "../ProductAdditionalView/ProductAdditionalView";
import { ImageViewProps } from "../../types/types";
import ImageSlider from "../ImageSlider/ImageSlider";

function ImagesView({
  images,
  mainImageURL,
  handleMainImageChange,
}: ImageViewProps) {
  if (images.length === 1) {
    return <> {ProductMainView(mainImageURL)}</>;
  }
  return (
    <>
      <ImageSlider
        imagesArray={images}
        mainImageSrc={mainImageURL}
        replaceMainImage={handleMainImageChange}
      />
      {images.length > 1 && (
        <HStack width="xl">
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
