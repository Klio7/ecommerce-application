import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { Request } from "../types/types";
import { setTokenToLocalStorage } from "../store/LocalStorage";

async function fetcher(...args: Request) {
  const param = args;
  const response = await fetch(...param);
  const responseClone = response.clone();
  const responseFormatted = await responseClone.json();
  if (responseFormatted.access_token) {
    setTokenToLocalStorage(responseFormatted.access_token, true);
  }
  return response;
}

const PasswordFlowApiClient = (email: string, password: string) => {
  const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
  const options: PasswordAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username: email,
        password,
      },
    },
    scopes: [import.meta.env.VITE_CTP_SCOPES] /* [
      `view_published_products:${projectKey}`,
      `manage_my_profile:${projectKey}`,
      `manage_my_orders:${projectKey}`,
      `manage_my_shopping_lists:${projectKey}`,
      `manage_my_payments:${projectKey}`,
    ] */,

    fetch: fetcher,
  };
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    fetch,
  };

  const passwordFlowClient = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware() only for development usage
    .build();

  const passwordFlowApiRoot = createApiBuilderFromCtpClient(
    passwordFlowClient,
  ).withProjectKey({
    projectKey,
  });

  return passwordFlowApiRoot;
};

export default PasswordFlowApiClient;
