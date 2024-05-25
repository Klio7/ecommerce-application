import React from "react";
import { IconButton, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ProductMainView from "../ProductMainView/ProductMainView";
import { SliderProps } from "../../types/types";

function ImageSlider({
  imagesArray,
  mainImageSrc,
  replaceMainImage,
}: SliderProps) {
  function goNextSlide() {
    const mainImageIndex = imagesArray.findIndex(
      (imageUrl) => imageUrl === mainImageSrc,
    );
    if (mainImageIndex === imagesArray.length - 1) {
      replaceMainImage(imagesArray[0]);
    } else {
      const nextSlideIndex = mainImageIndex + 1;
      const nextSlide = imagesArray[nextSlideIndex];
      replaceMainImage(nextSlide);
    }
  }
  function goPreviousSlide() {
    const mainImageIndex = imagesArray.findIndex(
      (imageUrl) => imageUrl === mainImageSrc,
    );
    if (mainImageIndex === 0) {
      replaceMainImage(imagesArray[imagesArray.length - 1]);
    } else {
      const previousSlideIndex = mainImageIndex - 1;
      const previousSlide = imagesArray[previousSlideIndex];
      replaceMainImage(previousSlide);
    }
  }
  return (
    <Flex align="center">
      <IconButton
        aria-label="Search database"
        icon={<ChevronLeftIcon />}
        onClick={() => goPreviousSlide()}
      />
      {ProductMainView(mainImageSrc)}
      <IconButton
        aria-label="Search database"
        icon={<ChevronRightIcon />}
        onClick={() => goNextSlide()}
      />
    </Flex>
  );
}
export default ImageSlider;
