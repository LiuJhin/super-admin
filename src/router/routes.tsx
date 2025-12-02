import { lazy } from 'react'
import type { ReactElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Placeholder = lazy(() => import('@/pages/Placeholder'))

export type RouteItem = {
  path: string
  element: ReactElement
  title: string
  icon?: string
  roles?: string[]
}

export const rawRoutes: RouteItem[] = [
  { path: '/', element: <Dashboard />, title: 'menu.dashboard', icon: 'DashboardOutlined' },
  {
    path: '/analysis/overview',
    element: <Placeholder title="Overview" />,
    title: 'menu.analysis.overview',
    roles: ['admin'],
  },
  {
    path: '/analysis/reports',
    element: <Placeholder title="Reports" />,
    title: 'menu.analysis.reports',
  },
  { path: '/users/list', element: <Placeholder title="Users" />, title: 'menu.users.list' },
  {
    path: '/users/detail',
    element: <Placeholder title="User Detail" />,
    title: 'menu.users.detail',
  },
  {
    path: '/settings/profile',
    element: <Placeholder title="Profile" />,
    title: 'menu.settings.profile',
  },
  {
    path: '/settings/security',
    element: <Placeholder title="Security" />,
    title: 'menu.settings.security',
  },
  {
    path: '/settings/notifications',
    element: <Placeholder title="Notifications" />,
    title: 'menu.settings.notifications',
  },
  {
    path: '/admin/permissions',
    element: <Placeholder title="Permissions" />,
    title: 'menu.admin.permissions',
    roles: ['admin'],
  },
  {
    path: '/admin/roles',
    element: <Placeholder title="Roles" />,
    title: 'menu.admin.roles',
    roles: ['admin'],
  },
  {
    path: '/admin/audit',
    element: <Placeholder title="Audit" />,
    title: 'menu.admin.audit',
    roles: ['admin'],
  },
  { path: '/about', element: <Placeholder title="About" />, title: 'menu.about' },
  { path: '/monitor', element: <Placeholder title="Monitor" />, title: 'menu.monitor' },
  { path: '/logs', element: <Placeholder title="Logs" />, title: 'menu.logs' },
]

export function genRouter(roles: string[]) {
  const allowed = rawRoutes.filter((r) => !r.roles || r.roles.some((x) => roles.includes(x)))
  return createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: allowed.map((r) =>
        r.path === '/'
          ? { index: true, element: r.element }
          : { path: r.path.replace(/^\//, ''), element: r.element }
      ),
    },
  ])
}
