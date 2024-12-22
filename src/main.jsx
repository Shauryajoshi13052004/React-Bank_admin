import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './Page/Navbar.jsx'
import {BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>

    <Navbar/>
    <App />
    </Router>
  </StrictMode>,
)