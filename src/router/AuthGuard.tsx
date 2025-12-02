import { useAppSelector } from '@/store/hooks'
import { Navigate, useLocation } from 'react-router-dom'
import type { ReactElement } from 'react'

export default function AuthGuard({ children }: { children: ReactElement }) {
  const token = useAppSelector((s) => s.auth.token)
  const location = useLocation()
  if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}
