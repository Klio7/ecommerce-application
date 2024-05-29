import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type AuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { Request } from "../types/types";
import { setTokenToLocalStorage } from "../store/LocalStorage";

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const scopes = [import.meta.env.VITE_CTP_SCOPES];
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};

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
    scopes,
    fetch: fetcher,
  };

  const passwordFlowClient = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();

  const passwordFlowApiRoot = createApiBuilderFromCtpClient(
    passwordFlowClient,
  ).withProjectKey({
    projectKey,
  });

  return passwordFlowApiRoot;
};

const ClientCredentialsFlowApiClient = () => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    scopes,
    fetch,
  };

  const clientCredentialsFlowClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();

  const clientCredentialsFlowApiRoot = createApiBuilderFromCtpClient(
    clientCredentialsFlowClient,
  ).withProjectKey({
    projectKey,
  });

  return clientCredentialsFlowApiRoot;
};

export { PasswordFlowApiClient, ClientCredentialsFlowApiClient };
