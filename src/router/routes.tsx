import { lazy } from 'react'
import type { ReactElement } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import AuthGuard from '@/router/AuthGuard'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Overview = lazy(() => import('@/pages/analysis/overview'))
const Reports = lazy(() => import('@/pages/analysis/reports'))
const UserList = lazy(() => import('@/pages/user/list'))
const UserDetail = lazy(() => import('@/pages/user/detail'))
const Profile = lazy(() => import('@/pages/settings/profile'))
const Security = lazy(() => import('@/pages/settings/security'))
const Notifications = lazy(() => import('@/pages/settings/notifications'))
const Permissions = lazy(() => import('@/pages/admin/permissions'))
const Roles = lazy(() => import('@/pages/admin/roles'))
const Audit = lazy(() => import('@/pages/admin/audit'))
const About = lazy(() => import('@/pages/about'))
const Monitor = lazy(() => import('@/pages/monitor'))
const Logs = lazy(() => import('@/pages/logs'))
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))

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
    element: <Overview />,
    title: 'menu.analysis.overview',
    roles: ['admin'],
  },
  { path: '/analysis/reports', element: <Reports />, title: 'menu.analysis.reports' },
  { path: '/users/list', element: <UserList />, title: 'menu.users.list' },
  { path: '/users/detail', element: <UserDetail />, title: 'menu.users.detail' },
  { path: '/settings/profile', element: <Profile />, title: 'menu.settings.profile' },
  { path: '/settings/security', element: <Security />, title: 'menu.settings.security' },
  {
    path: '/settings/notifications',
    element: <Notifications />,
    title: 'menu.settings.notifications',
  },
  {
    path: '/admin/permissions',
    element: <Permissions />,
    title: 'menu.admin.permissions',
    roles: ['admin'],
  },
  { path: '/admin/roles', element: <Roles />, title: 'menu.admin.roles', roles: ['admin'] },
  { path: '/admin/audit', element: <Audit />, title: 'menu.admin.audit', roles: ['admin'] },
  { path: '/about', element: <About />, title: 'menu.about' },
  { path: '/monitor', element: <Monitor />, title: 'menu.monitor' },
  { path: '/logs', element: <Logs />, title: 'menu.logs' },
]

export function genRouter(roles: string[]) {
  const allowed = rawRoutes.filter((r) => !r.roles || r.roles.some((x) => roles.includes(x)))
  return createBrowserRouter([
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: allowed.map((r) =>
        r.path === '/'
          ? { index: true, element: r.element }
          : { path: r.path.replace(/^\//, ''), element: r.element }
      ),
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
  ])
}
