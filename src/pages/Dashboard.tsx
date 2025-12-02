import { Card, Row, Col, Statistic } from 'antd'

export default function Dashboard() {
  return (
    <Row gutter={12}>
      <Col span={6}>
        <Card>
          <Statistic title="Users" value={1203} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="Orders" value={348} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="Revenue" prefix="$" value={12903} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic title="Errors" value={4} />
        </Card>
      </Col>
    </Row>
  )
}
