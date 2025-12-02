import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { genRouter } from '@/router/routes'
import LoadingScreen from '@/components/layout/Common/LoadingScreen'

export default function App() {
  const router = genRouter(['admin'])
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
