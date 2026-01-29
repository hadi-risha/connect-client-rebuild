export const config = {
  apiBaseUrl: import.meta.env.VITE_API_URL, //this url includes api
  apiSocketUrl: import.meta.env.VITE_SOCKET_API_URL,
  env: import.meta.env.MODE, 

  google: {
    authUrl: import.meta.env.VITE_GOOGLE_AUTH_URL
  },
  imageKit: {
    publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
    endPoint: import.meta.env.VITE_IMAGEKIT_ENDPOINT //specifically using in ai chatbot, not in any other image upload
  },
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY,  

  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  },
  zegoCloud: {
    appId: import.meta.env.VITE_ZEGO_APP_ID,
    serverSecret: import.meta.env.VITE_ZEGO_SERVER_SECRET
  },

};
