import { Drawer, Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import i18n from '@/i18n'
import type { MenuItem } from '@/router/menu'
import { IconRender } from '@/components/layout/Common/IconRender'
import styles from './Sidebar.module.css'

const { Sider } = Layout

function toMenuItem(m: MenuItem): NonNullable<MenuProps['items']>[number] {
  if (m.hidden) return null
  return {
    key: m.path || m.key,
    label: m.title ? (m.title.startsWith('menu.') ? i18n.t(m.title) : m.title) : '',
    icon: <IconRender name={m.icon} />,
    children: m.children?.map(toMenuItem).filter(Boolean),
  }
}

export function Sidebar({
  items,
  selectedPath,
  collapsed,
  onCollapseChange,
  onMenuClick,
  mobile,
  onLogoClick,
}: {
  items: MenuItem[]
  selectedPath: string
  collapsed: boolean
  onCollapseChange: (c: boolean) => void
  onMenuClick: MenuProps['onClick']
  mobile: boolean
  onLogoClick?: () => void
}) {
  if (mobile) {
    return (
      <Drawer
        open={!collapsed}
        onClose={() => onCollapseChange(true)}
        placement="left"
        size="default"
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedPath]}
          onClick={onMenuClick}
          items={items.map(toMenuItem)}
        />
      </Drawer>
    )
  }
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapseChange}
      width={220}
      trigger={null}
    >
      <div className={styles.logo} onClick={onLogoClick} role="button">
        <span className={styles.logoIcon} />
        {!collapsed && <span className={styles.logoText}>Super Admin</span>}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedPath]}
        onClick={onMenuClick}
        items={items.map(toMenuItem)}
      />
    </Sider>
  )
}
