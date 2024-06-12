import { ClientCredentialsFlowApiClient } from "./apiClients";
import getCartVersion from "./getCartVersion";

async function addProductToCart(cartId: string) {
  const version = await getCartVersion(cartId);
  ClientCredentialsFlowApiClient()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: "addLineItem",
            productId: "078f9796-e2df-4f7a-a96d-a96a59c1160a",
            quantity: 1,
          },
        ],
      },
    })
    .execute();
}
export default addProductToCart;

export function createCart() {
  ClientCredentialsFlowApiClient()
    .carts()
    .post({ body: { currency: "USD" } })
    .execute();
}
