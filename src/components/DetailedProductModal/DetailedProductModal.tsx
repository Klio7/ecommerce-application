import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  HStack,
} from "@chakra-ui/react";
import ProductMainView from "../ProductMainView/ProductMainView";
import ImageSlider from "../ImageSlider/ImageSlider";
import ProductAdditionalView from "../ProductAdditionalView/ProductAdditionalView";

export interface ModalProps {
  images: string[];
  mainImage: string;
  setMainImage: (src: string) => void;
  isOpen: boolean;
  setModalOpen: (prop: boolean) => void;
}
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
        <Modal isOpen={isOpen} onClose={() => setModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
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
      <ImageSlider
        images={images}
        mainImage={mainImage}
        setMainImage={setMainImage}
        setModalOpen={setModalOpen}
      />
      {images.length > 1 && (
        <HStack width="xl" justify="center">
          {images.map((src) => (
            <ProductAdditionalView
              imageSrc={src}
              setMainImage={setMainImage}
              key={src}
            />
          ))}
        </HStack>
      )}
      <Modal isOpen={isOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ImageSlider
              images={images}
              mainImage={mainImage}
              setMainImage={setMainImage}
              setModalOpen={setModalOpen}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DetailedProductModal;
