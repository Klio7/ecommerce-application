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
