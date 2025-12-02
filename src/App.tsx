import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { genRouter } from '@/router/routes'

export default function App() {
  const router = genRouter(['admin'])
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}
