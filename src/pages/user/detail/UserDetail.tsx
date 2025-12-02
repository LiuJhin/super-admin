import { Descriptions, Card } from 'antd'

export default function UserDetail() {
  return (
    <Card style={{ margin: 12 }}>
      <Descriptions title="用户详情" bordered column={1}>
        <Descriptions.Item label="姓名">示例用户</Descriptions.Item>
        <Descriptions.Item label="邮箱">user@example.com</Descriptions.Item>
        <Descriptions.Item label="角色">Admin</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
