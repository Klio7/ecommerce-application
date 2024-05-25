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
}
export interface ImageViewProps {
  images: string[];
  mainImageURL: string;
  handleMainImageChange: (src: string) => void;
}

export interface AdditionalImageViewProps {
  imageSrc: string;
  replaceMainImage: (src: string) => void;
}

export interface SliderProps {
  imagesArray: string[];
  mainImageSrc: string;
  replaceMainImage: (src: string) => void;
}
