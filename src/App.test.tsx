import { render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '@/store'
import '@/i18n'

test('renders dashboard', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const items = await screen.findAllByText(/Dashboard/i)
  expect(items.length).toBeGreaterThan(0)
})
