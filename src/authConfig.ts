/* eslint-disable */
import { LogLevel, PublicClientApplication } from '@azure/msal-browser'

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: '495e6111-1756-40bc-b31d-4d609819872d',
    authority:
      'https://login.microsoftonline.com/fbc5a62b-6dc9-4de5-95aa-66baf3972f34',
    redirectUri: 'http://localhost:3000', // Must be registered as a SPA redirectURI on your app registration
    postLogoutRedirectUri: 'http://localhost:3000' // Must be registered as a SPA redirectURI on your app registration
  },
  cache: {
    cacheLocation: 'localStorage'
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Info:
            console.info(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)

          default:
        }
      },
      logLevel: LogLevel.Verbose
    }
  }
}

export const msalInstance = new PublicClientApplication(msalConfig)

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['User.Read']
}

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
}
