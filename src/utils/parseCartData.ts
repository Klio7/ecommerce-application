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
      let discountedCartPrice;
      if (lineItem.discountedPricePerQuantity[0]) {
        const rawDiscountedCartPrice =
          lineItem.discountedPricePerQuantity[0].discountedPrice.value
            .centAmount;
        discountedCartPrice = new Intl.NumberFormat(
          "ru-RU",
          formatConfig,
        ).format(rawDiscountedCartPrice / 100);
      }
      let discountedPrice;
      if (lineItem.price.discounted) {
        const rawDiscountedPrice = lineItem.price.discounted.value.centAmount;
        discountedPrice = new Intl.NumberFormat("ru-RU", formatConfig).format(
          rawDiscountedPrice / 100,
        );
      }

      const rawPrice = lineItem.price.value.centAmount;
      const price = new Intl.NumberFormat("ru-RU", formatConfig).format(
        rawPrice / 100,
      );

      const number = lineItem.quantity;
      const rawTotalPrice = lineItem.totalPrice.centAmount;
      const totalProductPrice = new Intl.NumberFormat(
        "ru-RU",
        formatConfig,
      ).format(rawTotalPrice / 100);
      return {
        productId,
        title,
        imageUrl,
        discountedCartPrice,
        discountedPrice,
        price,
        number,
        totalProductPrice,
      };
    });
  }
  const rawTotal = data.totalPrice.centAmount;
  const total = new Intl.NumberFormat("ru-RU", formatConfig).format(
    rawTotal / 100,
  );
  return { cartProducts, total };
}

export default parseCartData;
