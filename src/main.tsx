import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { PrivyProvider } from '@privy-io/react-auth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProvider
      appId="cmhz2ucjo01mjjv0cqty2x4fa"
      clientId="client-WY6SXpdREveLEpN6G9FYsuTxWtqCErrUDdZ6AefKLPAY7"
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>,
)
