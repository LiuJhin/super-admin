import styles from './PageHeader.module.less'
import { Space } from 'antd'

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>
        <span className={styles.main}>{title}</span>
        {subtitle && <span className={styles.sub}>{subtitle}</span>}
      </div>
      {actions && (
        <div className={styles.actions}>
          <Space>{actions}</Space>
        </div>
      )}
    </div>
  )
}
