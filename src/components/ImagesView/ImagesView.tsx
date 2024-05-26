import React from "react";
import { HStack } from "@chakra-ui/react";
import ProductMainView from "../ProductMainView/ProductMainView";
import ProductAdditionalView from "../ProductAdditionalView/ProductAdditionalView";
import { ImageViewProps } from "../../types/types";
import ImageSlider from "../ImageSlider/ImageSlider";

function ImagesView({ images, mainImage, setMainImage }: ImageViewProps) {
  if (images.length === 1) {
    return <> {ProductMainView(mainImage)}</>;
  }
  return (
    <>
      <ImageSlider
        images={images}
        mainImage={mainImage}
        setMainImage={setMainImage}
      />
      {images.length > 1 && (
        <HStack width="xl" justify="center">
          {images.map((src) => (
            <ProductAdditionalView
              imageSrc={src}
              replaceMainImage={setMainImage}
              key={src}
            />
          ))}
        </HStack>
      )}
    </>
  );
}

export default ImagesView;
