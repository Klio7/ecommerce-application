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
            productId: "a5c4459e-b4d6-4fde-815f-051d2cfb87af",
            quantity: 1,
          },
        ],
      },
    })
    .execute();
}
export default addProductToCart;
