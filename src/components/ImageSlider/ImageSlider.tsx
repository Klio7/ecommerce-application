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
        colorScheme="white"
        fontSize="60px"
        height="100%"
        _hover={{ backgroundColor: "#ffffff20" }}
        onClick={() => goPreviousSlide()}
      />
      <Flex boxSize="xl">{ProductMainView(mainImageSrc)}</Flex>
      <IconButton
        aria-label="Search database"
        icon={<ChevronRightIcon />}
        colorScheme="white"
        fontSize="60px"
        height="100%"
        _hover={{ backgroundColor: "#ffffff20" }}
        onClick={() => goNextSlide()}
      />
    </Flex>
  );
}
export default ImageSlider;
