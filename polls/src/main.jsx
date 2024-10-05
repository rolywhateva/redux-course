
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ColorfulBorder from './components/ColorfulBorder.jsx'
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorfulBorder/>
    <App />
  </StrictMode>,
)
