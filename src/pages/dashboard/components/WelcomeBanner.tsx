import { Alert } from 'antd'

export function WelcomeBanner() {
  return (
    <Alert
      message="欢迎回来"
      description="这里是项目的仪表盘，总览关键指标与趋势。"
      type="info"
      showIcon
    />
  )
}
