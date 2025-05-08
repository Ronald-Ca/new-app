import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './routes'
import { AlertProvider } from './contexts/alert-context'
import './index.css'
import { TooltipProvider } from '@radix-ui/react-tooltip'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AlertProvider>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </AlertProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
