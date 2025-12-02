import { Card, Row, Col } from 'antd'
import styles from './Dashboard.module.less'
import { WelcomeBanner } from './components/WelcomeBanner'
import { StatsCard } from './components/StatsCard'
import { RevenueChart } from './components/RevenueChart'
import { useDashboardData } from './hooks/useDashboardData'

export default function Dashboard() {
  const { stats } = useDashboardData()

  return (
    <div className={styles.page}>
      <WelcomeBanner />
      <Row gutter={12} className={styles.grid}>
        {stats.map((s) => (
          <Col key={s.key} xs={12} md={6}>
            <StatsCard title={s.title} value={s.value} prefix={s.prefix} />
          </Col>
        ))}
      </Row>
      <Card style={{ marginTop: 12 }}>
        <RevenueChart />
      </Card>
    </div>
  )
}
