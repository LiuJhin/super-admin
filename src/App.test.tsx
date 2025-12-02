import { render, screen } from '@testing-library/react'
import Login from '@/pages/auth/Login'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { MemoryRouter } from 'react-router-dom'
import '@/i18n'
jest.spyOn(console, 'error').mockImplementation(() => {})

test('renders login page', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  )
  const title = await screen.findByText(/登录/i)
  expect(title).toBeInTheDocument()
})
