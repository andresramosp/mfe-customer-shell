import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "../../authConfig";

export default function useToken() {
  const msalInstance = new PublicClientApplication(msalConfig);

  const getAccessToken = () =>
    msalInstance
      .acquireTokenSilent({
        ...loginRequest,
      })
      .catch(async (e) => {
        await msalInstance.acquireTokenRedirect(loginRequest);
        throw e;
      });

  return {
    getAccessToken,
  };
}
