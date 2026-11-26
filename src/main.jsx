import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/playfair-display/latin-500.css'
import '@fontsource/playfair-display/latin-500-italic.css'
import '@fontsource/caveat/latin-500.css'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')).render(<App />)
