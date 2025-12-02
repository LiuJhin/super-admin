import { Card, Statistic } from 'antd'
import styles from './StatsCard.module.less'
import * as Icons from '@ant-design/icons'

export function StatsCard({
  title,
  value,
  prefix,
  icon,
  color,
}: {
  title: string
  value: number | string
  prefix?: string
  icon?: keyof typeof Icons | string
  color?: string
}) {
  const Icon = icon ? (Icons as any)[icon] : null
  return (
    <Card className={styles.card}>
      <div className={styles.row}>
        <div className={styles.left}>
          {Icon ? (
            <div className={styles.icon} style={{ background: color || 'var(--color-primary)' }}>
              <Icon />
            </div>
          ) : null}
          <div>
            <div className={styles.title}>{title}</div>
            <div className={styles.value}>
              <Statistic value={value} prefix={prefix} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
