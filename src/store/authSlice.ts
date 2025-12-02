import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  token: string | null
  roles: string[]
  user?: { name: string } | null
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  roles: localStorage.getItem('token') ? ['admin'] : [],
  user: null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; roles: string[]; name?: string }>) {
      state.token = action.payload.token
      state.roles = action.payload.roles
      state.user = action.payload.name ? { name: action.payload.name } : null
      localStorage.setItem('token', state.token)
    },
    logout(state) {
      state.token = null
      state.roles = []
      state.user = null
      localStorage.removeItem('token')
    },
  },
})

export const { login, logout } = slice.actions
export default slice.reducer
