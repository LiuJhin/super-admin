import { Form, Input, Button, Tabs, message } from 'antd'
import { useState } from 'react'
import styles from './Auth.module.css'
import { useAppDispatch } from '@/store/hooks'
import { login } from '@/store/authSlice'
import { useNavigate, useLocation } from 'react-router-dom'

type Mode = 'login' | 'register'

export default function Auth({ initialMode = 'login' }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from || '/'

  const onLogin = (v: { username: string; password: string }) => {
    dispatch(login({ token: 'mock-token', roles: ['admin'], name: v.username }))
    navigate(from, { replace: true })
  }

  const onRegister = () => {
    message.success('注册成功，请登录')
    setMode('login')
  }

  return (
    <div className={styles.container}>
      {/* 左侧表单 */}
      <div className={styles.leftPanel}>
        <div className={styles.formCard}>
          <div className={styles.logo}>
            <div className={styles.logoIcon} />
            <span>Super Admin</span>
          </div>

          <h1 className={styles.welcome}>
            Welcome to <strong>Super Admin</strong>
          </h1>

          <Tabs
            activeKey={mode}
            onChange={(k) => setMode(k as Mode)}
            centered
            size="large"
            className={styles.tabs}
          >
            <Tabs.TabPane key="login" tab="登录" />
            <Tabs.TabPane key="register" tab="注册" />
          </Tabs>

          {mode === 'login' ? (
            <Form layout="vertical" onFinish={onLogin} className={styles.form}>
              <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input size="large" placeholder="Username / Email" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password size="large" placeholder="Password" />
              </Form.Item>

              <div className={styles.formExtra}>
                {/* <Checkbox>记住我</Checkbox> */}
                <a className={styles.forgot}>忘记密码？</a>
              </div>

              <Button type="primary" size="large" block htmlType="submit">
                立即登录
              </Button>
            </Form>
          ) : (
            <Form layout="vertical" onFinish={onRegister} className={styles.form}>
              <Form.Item name="username" rules={[{ required: true }]}>
                <Input size="large" placeholder="用户名" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password size="large" placeholder="密码" />
              </Form.Item>
              <Form.Item name="confirm" rules={[{ required: true }]}>
                <Input.Password size="large" placeholder="确认密码" />
              </Form.Item>
              <Button type="primary" size="large" block htmlType="submit">
                立即注册
              </Button>
            </Form>
          )}

          <div className={styles.signup}>
            {mode === 'login' ? '还没有账号？' : '已有账号？'}
            <a
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className={styles.link}
            >
              {mode === 'login' ? ' 立即注册' : ' 立即登录'}
            </a>
          </div>
        </div>
      </div>

      {/* 右侧介绍 + 曲线背景（用 SVG 绝对稳） */}
      <div className={styles.rightPanel}>
        <svg className={styles.curve} viewBox="0 0 1200 1200" preserveAspectRatio="none">
          <path d="M0,0 L800,0 C1000,300 1000,900 800,1200 L0,1200 Z" fill="var(--primary)" />
        </svg>

        <div className={styles.rightContent}>
          <h2>Super Admin</h2>
          <p className={styles.desc}>
            后台管理系统，极简设计、极致性能。
            <br />
            帮助团队快速构建现代 Web 应用。
          </p>

          <ul className={styles.features}>
            <li>完整的权限管理体系（RBAC）</li>
            <li>暗黑模式与主题切换</li>
            <li>国际化与多语言支持</li>
            <li>响应式布局完美适配</li>
            <li>丰富的组件与图表库</li>
          </ul>

          {/* 可选：放一张插画 */}
          {/* <img src="/login-illustration.png" alt="" className={styles.illu} /> */}
        </div>
      </div>
    </div>
  )
}
