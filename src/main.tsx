import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { installImpactRuntime } from './impact/runtime.ts'
import './index.css'

function ImpactRuntimeBootstrap() {
  useEffect(() => installImpactRuntime(), [])
  return null
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ImpactRuntimeBootstrap />
    <App />
  </React.StrictMode>,
)
