import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './save-the-date.css'
import { SaveTheDatePage } from './SaveTheDatePage'

createRoot(document.getElementById('save-date-root')!).render(
  <StrictMode>
    <SaveTheDatePage />
  </StrictMode>,
)
