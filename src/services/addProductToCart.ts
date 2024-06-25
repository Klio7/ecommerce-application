import { ClientCredentialsFlowApiClient } from "./apiClients";
import getCartVersion from "./getCartVersion";

async function addProductToCart(cartId: string, id: string | undefined) {
  const version = await getCartVersion(cartId);
  try {
    await ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            { action: "addLineItem", productId: id, variantId: 1, quantity: 1 },
          ],
        },
      })
      .execute();
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export default addProductToCart;
