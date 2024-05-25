import React from "react";
import { IconButton, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ProductMainView from "../ProductMainView/ProductMainView";

function ImageSlider(imageSrc: string) {
  return (
    <Flex align="center">
      <IconButton aria-label="Search database" icon={<ChevronLeftIcon />} />
      {ProductMainView(imageSrc)}
      <IconButton aria-label="Search database" icon={<ChevronRightIcon />} />
    </Flex>
  );
}
export default ImageSlider;
