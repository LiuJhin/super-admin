import { Layout } from 'antd'
import type { MenuProps } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  addTag,
  removeTag,
  removeOtherTags,
  removeAllTags,
  setCollapsed,
  setTheme,
  setLocale,
  setPrimaryColor,
} from '@/store/layoutSlice'
import styles from './MainLayout.module.less'
import { menu as menuConfig, filterMenuByRoles } from '@/router/menu'
import type { MenuItem } from '@/router/menu'
import { PRESETS, setTheme as applyTheme, setPrimaryColor as applyPrimary } from '@/utils/theme'
import { Sidebar } from '@/components/layout/Sidebar/Sidebar'
import { HeaderBar } from '@/components/layout/Header/HeaderBar'
import { TagsView } from '@/components/layout/TagsView/TagsView'
import { Breadcrumbs } from '@/components/layout/Common/Breadcrumbs'
import { PageContainer } from '@/components/layout/Common/PageContainer'
import i18n from '@/i18n'

const { Header, Content, Footer } = Layout

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { collapsed, theme, tags, locale, primaryColor, watermark } = useAppSelector(
    (s) => s.layout
  )
  const authRoles = useAppSelector((s) => s.auth.roles)
  const [mobile, setMobile] = useState(false)
  const roles = useMemo(() => authRoles, [authRoles])

  useEffect(() => {
    const handle = () => setMobile(window.innerWidth < 992)
    handle()
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [])

  useEffect(() => {
    applyTheme(theme)
    applyPrimary(primaryColor)
  }, [theme, primaryColor])

  useEffect(() => {
    const current = menuConfig
      .flatMap((m) => (m.children ? m.children : [m]))
      .find((m) => m.path === location.pathname)
    if (current && !current.external && !current.hidden)
      dispatch(addTag({ path: current.path!, title: current.title, icon: current.icon }))
  }, [location.pathname, dispatch])

  const filtered: MenuItem[] = useMemo(() => filterMenuByRoles(menuConfig, roles), [roles])

  const onMenuClick: MenuProps['onClick'] = (info) => {
    const key: string = info.key
    if (key.startsWith('/')) {
      navigate(key)
      return
    }
    const item = findByKey(filtered, key)
    if (!item) return
    if (item.external) {
      window.open(item.external, '_blank')
    } else if (item.path) {
      navigate(item.path)
    }
  }

  function findByKey(list: MenuItem[], key: string): MenuItem | null {
    for (const it of list) {
      if (it.key === key) return it
      if (it.children) {
        const f = findByKey(it.children, key)
        if (f) return f
      }
    }
    return null
  }

  return (
    <Layout className={styles.layout}>
      <Sidebar
        items={filtered}
        selectedPath={location.pathname}
        collapsed={collapsed}
        onCollapseChange={(c) => dispatch(setCollapsed(c))}
        onMenuClick={onMenuClick}
        mobile={mobile}
        onLogoClick={() => navigate('/')}
      />
      <Layout className={styles.inner}>
        <Header className={styles.header}>
          <HeaderBar
            theme={theme}
            locale={locale}
            collapsed={collapsed}
            watermark={watermark}
            onThemeToggle={(v) => dispatch(setTheme(v ? 'dark' : 'light'))}
            onLocaleChange={(l) => dispatch(setLocale(l))}
            onPresetChange={(k) => dispatch(setPrimaryColor(PRESETS[k]))}
            onSearch={(v) => searchAndGo(v, filtered, navigate)}
            onRefresh={() => navigate(location.pathname)}
            onToggleCollapse={() => dispatch(setCollapsed(!collapsed))}
            onWatermarkChange={(v) => dispatch({ type: 'layout/setWatermark', payload: v })}
          />
        </Header>
        <div className={styles.tags}>
          <TagsView
            tags={tags}
            currentPath={location.pathname}
            onNavigate={(p) => navigate(p)}
            onClose={(p) => dispatch(removeTag(p))}
            onCloseOthers={(p) => dispatch(removeOtherTags(p))}
            onCloseAll={() => dispatch(removeAllTags())}
            onReorder={(from, to) =>
              dispatch({ type: 'layout/reorderTags', payload: { from, to } })
            }
          />
        </div>
        <Content className={styles.content}>
          <Breadcrumbs pathname={location.pathname} />
          <PageContainer title={getCurrentTitle(location.pathname)} watermark={watermark}>
            <Outlet />
          </PageContainer>
        </Content>
        <Footer className={styles.footer} style={{ textAlign: 'center' }}>
          © 2025 Super Admin
        </Footer>
      </Layout>
    </Layout>
  )
}

function searchAndGo(q: string, list: MenuItem[], navigate: (p: string) => void) {
  const flat: MenuItem[] = []
  const travel = (l: MenuItem[]) =>
    l.forEach((x) => {
      if (x.path) flat.push(x)
      if (x.children) travel(x.children)
    })
  travel(list)
  const found = flat.find((x) => x.title.toLowerCase().includes(q.toLowerCase()))
  if (found?.path) navigate(found.path)
}

function getCurrentTitle(pathname: string): string {
  const all: MenuItem[] = []
  const dig = (l: MenuItem[]) =>
    l.forEach((m) => {
      all.push(m)
      if (m.children) dig(m.children)
    })
  dig(menuConfig)
  const found = all.find((m) => m.path === pathname)
  if (!found) return 'Page'
  if (found.title?.startsWith('menu.')) return i18n.t(found.title)
  return found.title
}
