import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { MainViewModal } from "../../types/types";

function ProductMainView({ mainImage, setModalOpen }: MainViewModal) {
  return (
    <Flex justify="center" grow="1">
      <Image
        src={mainImage}
        alt=""
        boxSize="xl"
        objectFit="cover"
        onClick={() => setModalOpen(true)}
      />
    </Flex>
  );
}

export default ProductMainView;
