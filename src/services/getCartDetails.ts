import { ClientCredentialsFlowApiClient } from "./apiClients";
import parseCartData from "../utils/parseCartData";

async function getCartDetails(cartId: string) {
  try {
    const apiClient = ClientCredentialsFlowApiClient();
    const response = await apiClient
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();

    const cartData = response.body;
    const parsedCart = parseCartData(cartData);

    return {
      cartData: parsedCart,
      version: cartData.version,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export default getCartDetails;
