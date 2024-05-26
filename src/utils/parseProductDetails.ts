import { ProductData } from "@commercetools/platform-sdk";
import { ParsedProductData } from "../types/types";

function parseProductDetails(data: ProductData): ParsedProductData | null {
  const title = data.name["en-US"];
  let description;
  let images;
  let discountedPrice;
  let price;

  if (
    data.description &&
    data.masterVariant.images &&
    data.masterVariant.prices
  ) {
    description = data.description["en-US"];
    images = data.masterVariant.images.map(
      (image: { url: string; dimensions: { w: number; h: number } }) =>
        image.url,
    );
    const rawPrice = data.masterVariant.prices[0].value.centAmount;
    price = `${(rawPrice / 100).toFixed(2)}$`;
    const rawDiscountedPrice =
      data.masterVariant.prices[0].discounted?.value.centAmount;
    if (rawDiscountedPrice) {
      discountedPrice = `${(rawDiscountedPrice / 100).toFixed(2)}$`;
    }
  }
  if (description && images && price) {
    return { title, description, images, price, discountedPrice };
  }

  return null;
}
export default parseProductDetails;
