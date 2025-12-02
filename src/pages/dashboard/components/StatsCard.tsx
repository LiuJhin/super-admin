import { Card, Statistic } from 'antd'

export function StatsCard({
  title,
  value,
  prefix,
}: {
  title: string
  value: number | string
  prefix?: string
}) {
  return (
    <Card>
      <Statistic title={title} value={value} prefix={prefix} />
    </Card>
  )
}
