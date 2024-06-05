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
      let price;
      if (lineItem.price.discounted) {
        const rawPrice = lineItem.price.discounted.value.centAmount;
        price = `${(rawPrice / 100).toFixed(2)}$`;
      } else {
        const rawPrice = lineItem.price.value.centAmount;
        price = `${(rawPrice / 100).toFixed(2)}$`;
      }

      const number = lineItem.quantity;
      const rawTotalPrice = lineItem.totalPrice.centAmount;
      const totalProductPrice = `${(rawTotalPrice / 100).toFixed(2)}$`;
      return { title, imageUrl, price, number, totalProductPrice };
    });
  }
  const rawTotal = data.totalPrice.centAmount;
  const total = `${(rawTotal / 100).toFixed(2)}$`;
  return { cartProducts, total };
}

export default parseCartData;
