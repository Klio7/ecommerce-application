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
export interface ImageViewProps {
  images: string[];
  mainImage: string;
  setMainImage: (src: string) => void;
}

export interface AdditionalImageViewProps {
  imageSrc: string;
  setMainImage: (src: string) => void;
}
