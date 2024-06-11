import { ClientCredentialsFlowApiClient } from "./apiClients";
import getCartVersion from "./getCartVersion";

async function removeProductFromCart(cartId: string, id: string | undefined) {
  const version = await getCartVersion(cartId);
  try {
    await ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [{ action: "removeLineItem", lineItemId: id }],
        },
      })
      .execute();
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export default removeProductFromCart;
