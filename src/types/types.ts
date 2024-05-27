export interface SignInFormInputs {
  email: string;
  password: string;
}

export type Request = [RequestInfo | URL];

export interface ParsedProductData {
  title: string;
  description: string;
  images: string[];
  price: string;
  discountedPrice: string | undefined;
}

export interface AdditionalImageView {
  imageSrc: string;
  setMainImage: (src: string) => void;
}

export interface MainViewModal {
  mainImage: string;
  setModalOpen: (prop: boolean) => void;
}

export interface SliderModal {
  images: string[];
  mainImage: string;
  setMainImage: (src: string) => void;
  setModalOpen: (prop: boolean) => void;
}

export interface ModalProps extends SliderModal {
  isOpen: boolean;
}
