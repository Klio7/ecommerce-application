import { ClientCredentialsFlowApiClient } from "./apiClients";

async function getProductId(key: string) {
  try {
    const data = await ClientCredentialsFlowApiClient()
      .products()
      .withKey({ key })
      .get()
      .execute();
    const productId = data.body.id;
    return productId;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.name);
    }
  }
  return null;
}
export default getProductId;
