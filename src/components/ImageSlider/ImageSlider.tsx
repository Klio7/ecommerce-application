import React from "react";
import { IconButton, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ProductMainView from "../ProductMainView/ProductMainView";
import { SliderModal } from "../../types/types";

function ImageSlider({
  images,
  mainImage,
  setMainImage,
  setModalOpen,
  isOpen,
}: SliderModal) {
  function goNextSlide() {
    const mainImageIndex = images.findIndex(
      (imageUrl) => imageUrl === mainImage,
    );
    if (mainImageIndex === images.length - 1) {
      setMainImage(images[0]);
    } else {
      const nextSlideIndex = mainImageIndex + 1;
      const nextSlide = images[nextSlideIndex];
      setMainImage(nextSlide);
    }
  }
  function goPreviousSlide() {
    const mainImageIndex = images.findIndex(
      (imageUrl) => imageUrl === mainImage,
    );
    if (mainImageIndex === 0) {
      setMainImage(images[images.length - 1]);
    } else {
      const previousSlideIndex = mainImageIndex - 1;
      const previousSlide = images[previousSlideIndex];
      setMainImage(previousSlide);
    }
  }
  return (
    <Flex alignItems="center" grow="1">
      <IconButton
        aria-label="Search database"
        icon={<ChevronLeftIcon />}
        colorScheme="white"
        fontSize="60px"
        height="100%"
        _hover={{ backgroundColor: "#ffffff20" }}
        onClick={() => goPreviousSlide()}
      />
      {isOpen ? (
        <Flex boxSize="5xl" onClick={() => setModalOpen(true)}>
          {ProductMainView({ mainImage, setModalOpen })}
        </Flex>
      ) : (
        <Flex boxSize="xl" grow="1" onClick={() => setModalOpen(true)}>
          {ProductMainView({ mainImage, setModalOpen })}
        </Flex>
      )}

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
