import { ClientCredentialsFlowApiClient } from "./apiClients";
import parseCartData from "../utils/parseCartData";

async function getCartDetails(cartId: string) {
  try {
    const data = await ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();
    const cartData = data.body;
    return parseCartData(cartData);
  } catch (error) {
    return Promise.reject(error);
  }
}
export default getCartDetails;
