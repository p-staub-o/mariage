import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './save-the-date.css'
import { SaveTheDatePage } from './SaveTheDatePage'

const searchParams = new URLSearchParams(window.location.search)

function setSaveDateHeight() {
  document.documentElement.style.setProperty('--save-date-height', `${window.innerHeight}px`)
}

setSaveDateHeight()
window.addEventListener('resize', setSaveDateHeight)
window.addEventListener('orientationchange', setSaveDateHeight)

if (searchParams.get('open') === '1') {
  document.documentElement.dataset.invitation = 'open'
}

if (searchParams.get('preview') === 'email') {
  document.documentElement.dataset.preview = 'email'
}

createRoot(document.getElementById('save-date-root')!).render(
  <StrictMode>
    <SaveTheDatePage />
  </StrictMode>,
)
