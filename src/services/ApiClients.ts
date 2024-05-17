import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

type Request = [RequestInfo | URL];

async function fetcher(...args: Request) {
  const param = args;
  const r = await fetch(...param);
  const t = r.clone();
  const tt = await t.json();
  if (tt.access_token) {
    localStorage.setItem("sleepless_access_token", tt.access_token);
    localStorage.setItem("isAuthenticated", "true");
  }

  return r;
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

    // tokenCache?:;
    // oauthUri?: string;
    fetch: fetcher,
  };
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_API_URL,
    fetch,
  };

  const passwordFlowClient = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  const PasswordFlowApiRoot = createApiBuilderFromCtpClient(
    passwordFlowClient,
  ).withProjectKey({
    projectKey,
  });

  return PasswordFlowApiRoot;
};

export default PasswordFlowApiClient;
