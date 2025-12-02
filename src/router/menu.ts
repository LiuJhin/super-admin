export type MenuItem = {
  key: string
  path?: string
  title: string
  icon?: string
  children?: MenuItem[]
  roles?: string[]
  hidden?: boolean
  external?: string
  affix?: boolean
}

export const menu: MenuItem[] = [
  { key: 'dashboard', path: '/', title: 'menu.dashboard', icon: 'DashboardOutlined', affix: true },
  {
    key: 'analysis',
    title: 'menu.analysis',
    icon: 'PieChartOutlined',
    children: [
      {
        key: 'analysis-overview',
        path: '/analysis/overview',
        title: 'menu.analysis.overview',
        roles: ['admin'],
      },
      { key: 'analysis-reports', path: '/analysis/reports', title: 'menu.analysis.reports' },
    ],
  },
  {
    key: 'users',
    title: 'menu.users',
    icon: 'UserOutlined',
    children: [
      { key: 'users-list', path: '/users/list', title: 'menu.users.list' },
      { key: 'users-detail', path: '/users/detail', title: 'menu.users.detail', hidden: true },
    ],
  },
  {
    key: 'settings',
    title: 'menu.settings',
    icon: 'SettingOutlined',
    children: [
      { key: 'settings-profile', path: '/settings/profile', title: 'menu.settings.profile' },
      { key: 'settings-security', path: '/settings/security', title: 'menu.settings.security' },
      {
        key: 'settings-notifications',
        path: '/settings/notifications',
        title: 'menu.settings.notifications',
      },
    ],
  },
  { key: 'external-docs', title: 'menu.docs', icon: 'LinkOutlined', external: 'https://vite.dev' },
  {
    key: 'admin',
    title: 'menu.admin',
    icon: 'KeyOutlined',
    roles: ['admin'],
    children: [
      { key: 'admin-permissions', path: '/admin/permissions', title: 'menu.admin.permissions' },
      { key: 'admin-roles', path: '/admin/roles', title: 'menu.admin.roles' },
      { key: 'admin-audit', path: '/admin/audit', title: 'menu.admin.audit' },
    ],
  },
  { key: 'about', path: '/about', title: 'menu.about', icon: 'InfoCircleOutlined' },
  { key: 'monitor', path: '/monitor', title: 'menu.monitor', icon: 'MonitorOutlined' },
  { key: 'logs', path: '/logs', title: 'menu.logs', icon: 'FileTextOutlined' },
]

export function filterMenuByRoles(list: MenuItem[], roles: string[]): MenuItem[] {
  return list
    .filter((m) => !m.roles || m.roles.some((r) => roles.includes(r)))
    .map((m) => ({
      ...m,
      children: m.children ? filterMenuByRoles(m.children, roles) : undefined,
    }))
}
