import { Cart, LineItem } from "@commercetools/platform-sdk";
import { ICartProduct } from "../types/types";

function parseCartData(data: Cart) {
  let cartProducts: ICartProduct[] | undefined;
  if (data.lineItems) {
    cartProducts = data.lineItems.map((lineItem: LineItem) => {
      const title = lineItem.name["en-US"];
      let imageUrl;
      if (lineItem.variant.images) {
        imageUrl = lineItem.variant.images[0].url;
      } else {
        imageUrl = undefined;
      }
      const rawPrice = lineItem.price.value.centAmount;
      const price = `${(rawPrice / 100).toFixed(2)}$`;
      const number = lineItem.quantity;
      const rawTotalPrice = lineItem.totalPrice.centAmount;
      const totalPrice = `${(rawTotalPrice / 100).toFixed(2)}$`;
      return { title, imageUrl, price, number, totalPrice };
    });
  }
  return cartProducts;
}

export default parseCartData;
