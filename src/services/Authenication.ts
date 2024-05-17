import {
  CustomerSignInResult,
  CustomerSignin,
  ClientResponse,
} from "@commercetools/platform-sdk";
import PasswordFlowApiClient from "./ApiClients";

async function loginCustomer(
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
      return response;
    }
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default loginCustomer;
