import { CartUpdateAction } from "@commercetools/platform-sdk";
import { ClientCredentialsFlowApiClient } from "./apiClients";
import getCartVersion from "./getCartVersion";
import parseCartData from "../utils/parseCartData";

async function clearCart(cartId: string, productIds: string[]) {
  const version = await getCartVersion(cartId);
  const removeActions: CartUpdateAction[] = productIds.map((productId) => ({
    action: "removeLineItem",
    lineItemId: productId,
  }));

  try {
    const data = await ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: removeActions,
        },
      })
      .execute();
    const cartData = data.body;
    return parseCartData(cartData);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default clearCart;
