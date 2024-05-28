import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import ProductMainView from "../ProductMainView/ProductMainView";
import ImageSlider from "../ImageSlider/ImageSlider";
import ProductAdditionalView from "../ProductAdditionalView/ProductAdditionalView";
import { ModalProps } from "../../types/types";

function DetailedProductModal({
  images,
  mainImage,
  setMainImage,
  isOpen,
  setModalOpen,
}: ModalProps) {
  if (images.length === 1) {
    return (
      <>
        <ProductMainView mainImage={mainImage} setModalOpen={setModalOpen} />
        <Modal
          size="6xl"
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={() => setModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton colorScheme="white" />
            <ModalBody bgGradient="linear(to-b, basicColorDark, basicColorLight)">
              <ProductMainView
                mainImage={mainImage}
                setModalOpen={setModalOpen}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
  return (
    <>
      <Flex direction="column" align="center">
        <ImageSlider
          images={images}
          mainImage={mainImage}
          setMainImage={setMainImage}
          setModalOpen={setModalOpen}
          isOpen={isOpen}
        />

        {images.length > 1 && (
          <Flex width="xl" justify="space-between">
            {images.map((src) => (
              <ProductAdditionalView
                imageSrc={src}
                setMainImage={setMainImage}
                key={src}
              />
            ))}
          </Flex>
        )}
      </Flex>
      <Modal
        size="6xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => setModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton colorScheme="white" />
          <ModalBody bgGradient="linear(to-b, basicColorDark, basicColorLight)">
            <ImageSlider
              images={images}
              mainImage={mainImage}
              setMainImage={setMainImage}
              setModalOpen={setModalOpen}
              isOpen={isOpen}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DetailedProductModal;
