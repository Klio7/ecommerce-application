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
  isOpen: boolean;
}

export interface ICartProduct {
  productId: string;
  title: string;
  imageUrl: string | undefined;
  discountedCartPrice: string | undefined;
  discountedPrice: string | undefined;
  price: string;
  number: number;
  totalProductPrice: string;
}

export interface ICart {
  cartProducts: ICartProduct[] | undefined;
  total: string;
}
export interface ISetCartProducts extends ICartProduct {
  handleQuantityChange: (productId: string, value: string) => void;
}
export interface IOnClearCart {
  onClearCart: () => Promise<void>;
}
