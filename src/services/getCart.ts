import { ClientCredentialsFlowApiClient } from "./apiClients";

async function getCart(cartId: string) {
  try {
    const response = await ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export default getCart;
