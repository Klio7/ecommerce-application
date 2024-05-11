import {
  // ApiRoot,
  createApiBuilderFromCtpClient,
} from "@commercetools/platform-sdk";
import ctpClient from "./BuildClient";

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
  // projectKey: "sleeplesstask",
});
export default apiRoot;

export const getProject = () => apiRoot.get().execute();

// getProject().then(console.log).catch(console.error);
