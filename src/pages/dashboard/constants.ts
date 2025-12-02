import type { StatItem } from './types'

export const DASHBOARD_STATS: StatItem[] = [
  { key: 'users', title: 'Users', value: 1203, icon: 'UserOutlined', color: '#436dff' },
  { key: 'orders', title: 'Orders', value: 348, icon: 'ShoppingCartOutlined', color: '#52c41a' },
  {
    key: 'revenue',
    title: 'Revenue',
    value: 12903,
    prefix: '$',
    icon: 'LineChartOutlined',
    color: '#fa8c16',
  },
  { key: 'errors', title: 'Errors', value: 4, icon: 'WarningOutlined', color: '#ff4d4f' },
]
