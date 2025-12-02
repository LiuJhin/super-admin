import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { genRouter } from '@/router/routes'
import LoadingScreen from '@/components/layout/Common/LoadingScreen'
import { useAppSelector } from '@/store/hooks'

export default function App() {
  const roles = useAppSelector((s) => s.auth.roles)
  const router = genRouter(roles)
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
