import { ClientCredentialsFlowApiClient } from "./apiClients";

async function addProductToCart(cartId: string) {
  try {
    const response = await ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: 28,
          actions: [
            {
              action: "addLineItem",
              productId: "078f9796-e2df-4f7a-a96d-a96a59c1160a",
              variantId: 1,
              quantity: 3,
            },
          ],
        },
      })
      .execute();
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export default addProductToCart;
