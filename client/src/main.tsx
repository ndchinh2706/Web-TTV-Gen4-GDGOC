import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NotificationProvider} from "@/components/Notification";
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </StrictMode>,
)
