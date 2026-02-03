import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './utils/dayjs' // dayjs config loaded here

import { Provider } from 'react-redux'
import { store } from './app/store'
import AuthInitializer from './globalProviders/AuthInitializer'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
   <StrictMode> 
    <Provider store={store}>
      <BrowserRouter>
      <AuthInitializer> {/* access token persist across app refresh */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthInitializer>
      </BrowserRouter>
    </Provider>
   </StrictMode>
)
