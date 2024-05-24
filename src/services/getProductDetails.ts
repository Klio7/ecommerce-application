import { ClientCredentialsFlowApiClient } from "./apiClients";
import parseProductDetails from "../utils/parseProductDetails";

async function getProductDetails(key: string) {
  const data = await ClientCredentialsFlowApiClient()
    .products()
    .withKey({ key })
    .get()
    .execute();
  const productData = data.body.masterData.current;
  return parseProductDetails(productData);
}
export default getProductDetails;
