import { ClientCredentialsFlowApiClient } from "./apiClients";
import parseProductDetails from "../utils/parseProductDetails";

async function getProductDetails(key: string) {
  try {
    const data = await ClientCredentialsFlowApiClient()
      .products()
      .withKey({ key })
      .get()
      .execute();
    const productData = data.body.masterData.current;
    return parseProductDetails(productData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.name);
    }
  }
  return null;
}
export default getProductDetails;
