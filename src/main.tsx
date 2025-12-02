import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/antd.theme.less'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from '@/store'
import '@/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
