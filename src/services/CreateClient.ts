import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import ctpClient from "./BuildClient";

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});
export default apiRoot;
