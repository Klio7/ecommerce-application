import { Cart, LineItem } from "@commercetools/platform-sdk";
import { ICartProduct } from "../types/types";

const formatConfig = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  currencyDisplay: "symbol",
};

function parseCartData(data: Cart) {
  let cartProducts: ICartProduct[] | undefined;
  if (data.lineItems) {
    cartProducts = data.lineItems.map((lineItem: LineItem) => {
      const productId = lineItem.id;
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
        price = new Intl.NumberFormat("ru-RU", formatConfig).format(
          rawPrice / 100,
        );
      } else {
        const rawPrice = lineItem.price.value.centAmount;
        price = new Intl.NumberFormat("ru-RU", formatConfig).format(
          rawPrice / 100,
        );
      }
      const number = lineItem.quantity;
      const rawTotalPrice = lineItem.totalPrice.centAmount;
      const totalProductPrice = new Intl.NumberFormat(
        "ru-RU",
        formatConfig,
      ).format(rawTotalPrice / 100);
      return { productId, title, imageUrl, price, number, totalProductPrice };
    });
  }
  const rawTotal = data.totalPrice.centAmount;
  const total = new Intl.NumberFormat("ru-RU", formatConfig).format(
    rawTotal / 100,
  );
  return { cartProducts, total };
}

export default parseCartData;
