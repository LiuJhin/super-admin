import { Card, Button } from 'antd'
import styles from './WelcomeBanner.module.less'

export function WelcomeBanner() {
  return (
    <Card className={styles.banner}>
      <div className={styles.left}>
        <div className={styles.title}>欢迎回来</div>
        <div className={styles.desc}>这里是项目的仪表盘，总览关键指标与趋势。</div>
        <div className={styles.actions}>
          <Button type="primary">查看报告</Button>
          <Button>创建任务</Button>
        </div>
      </div>
      <div className={styles.art}>
        <svg viewBox="0 0 120 80" className={styles.svg}>
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="var(--color-primary)" />
              <stop offset="1" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
          <path d="M0 60 Q 30 10 60 40 T 120 30" stroke="url(#g)" strokeWidth="4" fill="none" />
          <circle cx="60" cy="40" r="4" fill="var(--color-primary)" />
        </svg>
      </div>
    </Card>
  )
}
