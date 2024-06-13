import { ClientCredentialsFlowApiClient } from "./apiClients";

async function getCartProductIds(cartId: string) {
  try {
    const data = await ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();
    const cartIds = data.body.lineItems.map((item) => item.productId);
    const removalIds = data.body.lineItems.map((item) => item.id);
    return [cartIds, removalIds];
  } catch (error) {
    return Promise.reject(error);
  }
}
export default getCartProductIds;
