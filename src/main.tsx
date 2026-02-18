import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        if (import.meta.env.DEV) {
          console.log('Service Worker registered:', registration)
        }
      })
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.error('Service Worker registration failed:', error)
        }
      })
  })
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id="root" in your index.html')
}

createRoot(rootElement).render(
  <App />,
)
