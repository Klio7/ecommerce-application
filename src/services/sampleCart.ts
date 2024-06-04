import { ClientCredentialsFlowApiClient } from "./apiClients";

async function createSampleCart() {
  try {
    const response = await ClientCredentialsFlowApiClient()
      .carts()
      .post({ body: { currency: "USD" } })
      .execute();
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
export default createSampleCart;
