import React from "react";
import { Flex, HStack, Text, Image } from "@chakra-ui/react";
import ProductMainView from "../ProductMainView/ProductMainView";

function ImagesView(images: string | string[]) {
  const modifiedImages = [...images];
  if (modifiedImages.length === 1) {
    return ProductMainView(modifiedImages[0]);
  }
  if (typeof images !== "string" && modifiedImages.length > 1) {
    const additionalImages = modifiedImages.slice(0);
    return (
      <>
        {" "}
        {ProductMainView(modifiedImages[0])}
        <HStack>
          {additionalImages.map((image) => (
            <Image src={image} alt="" boxSize="100px" />
          ))}
        </HStack>
      </>
    );
  }
  return (
    <Flex>
      <Text>Sorry, photos are not available</Text>
    </Flex>
  );
}

export default ImagesView;
