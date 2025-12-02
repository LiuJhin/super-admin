import { Space } from 'antd'
import styles from './PageContainer.module.less'

export function PageContainer({
  title,
  extra,
  children,
  watermark,
}: {
  title: string
  extra?: React.ReactNode
  children: React.ReactNode
  watermark?: boolean
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {extra && <Space>{extra}</Space>}
      </div>
      <div className={watermark ? styles.watermark : undefined}>{children}</div>
    </div>
  )
}
