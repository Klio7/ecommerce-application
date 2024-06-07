import { ClientCredentialsFlowApiClient } from "./apiClients";

async function getCartVersion(cartId: string) {
  try {
    const data = await ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();
    const cartVersion = data.body.version;
    return cartVersion;
  } catch (error) {
    return Promise.reject(error);
  }
}
export default getCartVersion;
