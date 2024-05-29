import {
  CustomerSignInResult,
  CustomerSignin,
  ClientResponse,
} from "@commercetools/platform-sdk";
import { PasswordFlowApiClient } from "./ApiClients";
import { setClientIdToLocalStorage } from "../store/LocalStorage";

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
      return response;
    }
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default signInCustomer;
