import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'menu.dashboard': 'Dashboard',
      'menu.analysis': 'Analysis',
      'menu.analysis.overview': 'Overview',
      'menu.analysis.reports': 'Reports',
      'menu.users': 'Users',
      'menu.users.list': 'User List',
      'menu.users.detail': 'User Detail',
      'menu.settings': 'Settings',
      'menu.settings.profile': 'Profile',
      'menu.settings.security': 'Security',
      'menu.settings.notifications': 'Notifications',
      'menu.docs': 'Docs',
      'menu.admin': 'Admin',
      'menu.admin.permissions': 'Permissions',
      'menu.admin.roles': 'Roles',
      'menu.admin.audit': 'Audit',
      'menu.about': 'About',
      'menu.monitor': 'Monitor',
      'menu.logs': 'Logs',
    },
  },
  zh: {
    translation: {
      'menu.dashboard': '仪表盘',
      'menu.analysis': '分析',
      'menu.analysis.overview': '总览',
      'menu.analysis.reports': '报表',
      'menu.users': '用户',
      'menu.users.list': '用户列表',
      'menu.users.detail': '用户详情',
      'menu.settings': '设置',
      'menu.settings.profile': '个人资料',
      'menu.settings.security': '安全',
      'menu.settings.notifications': '通知',
      'menu.docs': '文档',
      'menu.admin': '管理',
      'menu.admin.permissions': '权限',
      'menu.admin.roles': '角色',
      'menu.admin.audit': '审计',
      'menu.about': '关于',
      'menu.monitor': '监控',
      'menu.logs': '日志',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
