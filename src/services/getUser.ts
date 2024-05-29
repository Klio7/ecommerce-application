import { getClientIdFromLocalStorage } from "../store/LocalStorage";
import { ClientCredentialsFlowApiClient } from "./ApiClients";
  
async function getUserProfile() {
        try {
            const clientId = getClientIdFromLocalStorage();
            if (clientId === null) {
                throw new Error("Client ID is null");
            }
            const response = await ClientCredentialsFlowApiClient()
                .customers()
                .withId({ ID: clientId })
                .get()
                .execute();
            if (response.statusCode === 200) {
                return response;
            }
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
}

export default getUserProfile;
  