import { ClientCredentialsFlowApiClient } from "./apiClients";
import getCartVersion from "./getCartVersion";
import parseCartData from "../utils/parseCartData";

async function changeProductQuantity(
  cartId: string,
  lineItemId: string,
  quantity: number,
) {
  const version = await getCartVersion(cartId);
  try {
    const data = await ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [{ action: "changeLineItemQuantity", lineItemId, quantity }],
        },
      })
      .execute();
    const cartData = data.body;
    return parseCartData(cartData);
  } catch (error) {
    return Promise.reject(error);
  }
}
export default changeProductQuantity;
