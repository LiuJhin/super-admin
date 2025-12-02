import { Spin } from 'antd'
import * as Icons from '@ant-design/icons'

export default function LoadingScreen() {
  return (
    <Spin
      spinning
      fullscreen
      tip="加载中..."
      indicator={
        <Icons.LoadingOutlined style={{ fontSize: 32, color: 'var(--color-primary)' }} spin />
      }
    />
  )
}
