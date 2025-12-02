import {
  Badge,
  Button,
  Dropdown,
  Input,
  Space,
  Switch,
  Tooltip,
  Avatar,
  Drawer,
  List,
  Modal,
} from 'antd'
import type { MenuProps } from 'antd'
import { PRESETS } from '@/utils/theme'
import * as Icons from '@ant-design/icons'
import { useState } from 'react'
import styles from './HeaderBar.module.css'

export function HeaderBar({
  theme,
  locale,
  collapsed,
  watermark,
  onThemeToggle,
  onLocaleChange,
  onPresetChange,
  onSearch,
  onRefresh,
  onToggleCollapse,
  onWatermarkChange,
}: {
  theme: 'light' | 'dark'
  locale: 'en' | 'zh'
  collapsed: boolean
  watermark: boolean
  onThemeToggle: (dark: boolean) => void
  onLocaleChange: (next: 'en' | 'zh') => void
  onPresetChange: (key: keyof typeof PRESETS) => void
  onSearch: (q: string) => void
  onRefresh: () => void
  onToggleCollapse: () => void
  onWatermarkChange: (v: boolean) => void
}) {
  const [openSettings, setOpenSettings] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [locked, setLocked] = useState(false)
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState([
    { id: 'm1', title: '系统更新完成', unread: true },
    { id: 'm2', title: '有新的工单待处理', unread: true },
    { id: 'm3', title: '备份成功', unread: false },
  ])
  const localeMenu: MenuProps = {
    items: [
      { key: 'zh', label: '中文' },
      { key: 'en', label: 'English' },
    ],
    onClick: (i) => {
      const k = String(i.key) as 'en' | 'zh'
      onLocaleChange(k)
    },
  }

  const themeMenu: MenuProps = {
    items: Object.entries(PRESETS).map(([k, v]) => ({
      key: k,
      label: (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span
            style={{
              width: 12,
              height: 12,
              background: v,
              display: 'inline-block',
              borderRadius: 2,
            }}
          />
          {k}
        </div>
      ),
    })),
    onClick: (i) => onPresetChange(i.key as keyof typeof PRESETS),
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
    else document.exitFullscreen?.()
  }

  const unreadCount = messages.filter((m) => m.unread).length

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <Button
          type="text"
          icon={collapsed ? <Icons.MenuUnfoldOutlined /> : <Icons.MenuFoldOutlined />}
          onClick={onToggleCollapse}
        />
        <Input.Search placeholder="搜索菜单" onSearch={onSearch} style={{ width: 260 }} />
      </div>
      <div className={styles.right}>
        <Tooltip title="刷新">
          <Button type="text" icon={<Icons.ReloadOutlined />} onClick={onRefresh} />
        </Tooltip>
        <Tooltip title="全屏">
          <Button type="text" icon={<Icons.FullscreenOutlined />} onClick={toggleFullscreen} />
        </Tooltip>
        <Dropdown
          open={notifOpen}
          onOpenChange={setNotifOpen}
          dropdownRender={() => (
            <div style={{ width: 280, padding: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>通知</span>
                <Button
                  size="small"
                  type="link"
                  onClick={() => setMessages((prev) => prev.map((m) => ({ ...m, unread: false })))}
                >
                  全部已读
                </Button>
              </div>
              <List
                dataSource={messages}
                renderItem={(item) => (
                  <List.Item
                    onClick={() =>
                      setMessages((prev) =>
                        prev.map((m) => (m.id === item.id ? { ...m, unread: false } : m))
                      )
                    }
                  >
                    <List.Item.Meta
                      title={item.title}
                      description={item.unread ? '未读' : '已读'}
                    />
                  </List.Item>
                )}
              />
            </div>
          )}
        >
          <Badge count={unreadCount}>
            <Button type="text" icon={<Icons.BellOutlined />} />
          </Badge>
        </Dropdown>
        <Tooltip title="锁屏">
          <Button type="text" icon={<Icons.LockOutlined />} onClick={() => setLocked(true)} />
        </Tooltip>
        <Tooltip title="暗黑模式">
          <Switch checked={theme === 'dark'} onChange={(v) => onThemeToggle(v)} />
        </Tooltip>
        <Dropdown menu={localeMenu}>
          <Button type="text" icon={<Icons.GlobalOutlined />}>
            {locale.toUpperCase()}
          </Button>
        </Dropdown>
        <Dropdown menu={themeMenu}>
          <Button type="text" icon={<Icons.SkinOutlined />}>
            Theme
          </Button>
        </Dropdown>
        <Tooltip title="设置">
          <Button
            type="text"
            icon={<Icons.SettingOutlined />}
            onClick={() => setOpenSettings(true)}
          />
        </Tooltip>
        <Dropdown
          menu={{
            items: [
              { key: 'profile', label: 'Profile' },
              { key: 'logout', label: 'Logout' },
            ],
          }}
        >
          <Avatar src="https://i.pravatar.cc/40" />
        </Dropdown>
      </div>

      <Drawer title="设置" open={openSettings} onClose={() => setOpenSettings(false)} width={320}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>暗黑模式</span>
            <Switch checked={theme === 'dark'} onChange={(v) => onThemeToggle(v)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>水印</span>
            <Switch checked={watermark} onChange={onWatermarkChange} />
          </div>
          <div>
            <span>主题色</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {Object.entries(PRESETS).map(([k, v]) => (
                <Button
                  key={k}
                  style={{ background: v, width: 24, height: 24, padding: 0 }}
                  onClick={() => onPresetChange(k as keyof typeof PRESETS)}
                />
              ))}
            </div>
          </div>
        </Space>
      </Drawer>

      <Modal title="锁屏" open={locked} footer={null} closable={false} maskClosable={false}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input.Password
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            block
            onClick={() => {
              if (password.trim().length) {
                setLocked(false)
                setPassword('')
              }
            }}
          >
            解锁
          </Button>
        </Space>
      </Modal>
    </div>
  )
}
