import React from "react";
import { Flex, Image } from "@chakra-ui/react";

export interface ModalPropsMainView {
  mainImage: string;
  setModalOpen: (prop: boolean) => void;
}

function ProductMainView({ mainImage, setModalOpen }: ModalPropsMainView) {
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
