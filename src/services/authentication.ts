import {
  CustomerSignInResult,
  CustomerSignin,
  ClientResponse,
} from "@commercetools/platform-sdk";
import { PasswordFlowApiClient } from "./apiClients";
import {
  getCartIdFromLocalStorage,
  setCartIdFromLocalStorage,
  setClientIdToLocalStorage,
} from "../store/LocalStorage";
import { getApiClient } from "./cartServices";
import getCartDetails from "./getCartDetails";

async function checkIfCartExists(customerId: string) {
  const apiClient = getApiClient();
  try {
    const cartExists = await apiClient
      .carts()
      .withCustomerId({ customerId })
      .get()
      .execute();
    return cartExists;
  } catch (error) {
    return false;
  }
}

async function setCartCustomerId(cartId: string, customerId: string) {
  const apiClient = getApiClient();
  const { version } = await getCartDetails(cartId);
  try {
    await apiClient
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: "setCustomerId",
              customerId,
            },
          ],
        },
      })
      .execute();
  } catch (error) {
    throw new Error(`${error}`);
  }
}

async function signInCustomer(
  email: string,
  password: string,
): Promise<ClientResponse<CustomerSignInResult>> {
  const customerLogin: CustomerSignin = {
    email,
    password,
  };

  try {
    const response = await PasswordFlowApiClient(email, password)
      .me()
      .login()
      .post({
        body: customerLogin,
      })
      .execute();
    if (response.statusCode === 200) {
      setClientIdToLocalStorage(response.body.customer.id);
      const cartExists = await checkIfCartExists(response.body.customer.id);
      if (cartExists) {
        setCartIdFromLocalStorage(cartExists.body.id);
      } else {
        const cartId = getCartIdFromLocalStorage();
        if (cartId) setCartCustomerId(cartId, response.body.customer.id);
      }
      return response;
    }
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default signInCustomer;
