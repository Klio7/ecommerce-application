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
            productId: "42a96e07-706f-4819-acc5-2d1749527d33",
            quantity: 1,
          },
        ],
      },
    })
    .execute();
}
export default addProductToCart;
