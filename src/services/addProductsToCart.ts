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
            productId: "96e0c1d6-ac10-4ad4-b37f-6072ccbcdf28",
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
