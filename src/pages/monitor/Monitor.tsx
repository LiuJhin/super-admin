// src/pages/monitor/Monitor.tsx
import React, { useState, useEffect, useRef } from 'react'
import { Card, Row, Col, Statistic, Progress, List, Tag, Badge, Button, message } from 'antd'
import { ReloadOutlined, BellOutlined } from '@ant-design/icons'
import ReactECharts from 'echarts-for-react'
import styles from './Monitor.module.less'

// 模拟实时数据生成器
const generateResourceData = () => ({
  cpu: Number((Math.random() * 40 + 10).toFixed(1)), // 10~50%
  memory: Number((Math.random() * 45 + 25).toFixed(1)), // 25~70%
  disk: Number((Math.random() * 30 + 50).toFixed(1)), // 50~80%
  networkIn: Number((Math.random() * 8 + 2).toFixed(2)), // MB/s
  networkOut: Number((Math.random() * 15 + 5).toFixed(2)),
  onlineUsers: Math.floor(Math.random() * 800 + 1200),
  responseTime: Number((Math.random() * 150 + 50).toFixed(0)), // ms
  successRate: Number((99.9 + Math.random() * 0.08).toFixed(3)),
})

const Monitor: React.FC = () => {
  const [resource, setResource] = useState(generateResourceData())
  const [cpuData, setCpuData] = useState<number[]>([])
  const [memData, setMemData] = useState<number[]>([])
  const [respData, setRespData] = useState<number[]>([])
  const [timeLabels, setTimeLabels] = useState<string[]>([])
  const timerRef = useRef<number | null>(null)

  // 报警数据
  const alerts = [
    { id: 1, time: '2025-08-05 14:32:11', level: 'error', message: '支付服务响应超时 > 1000ms' },
    { id: 2, time: '2025-08-05 14:28:45', level: 'warn', message: '数据库连接池使用率达到 87%' },
    {
      id: 3,
      time: '2025-08-05 14:15:03',
      level: 'error',
      message: '订单微服务实例下线（10.0.5.28）',
    },
    { id: 4, time: '2025-08-05 13:59:22', level: 'info', message: '缓存已自动清理，释放 2.1GB' },
  ]

  // 每2秒更新一次数据
  const startAutoRefresh = () => {
    timerRef.current = setInterval(() => {
      const now = new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      const newData = generateResourceData()

      setResource(newData)
      setTimeLabels((prev) => [...prev.slice(-59), now])
      setCpuData((prev) => [...prev.slice(-59), newData.cpu])
      setMemData((prev) => [...prev.slice(-59), newData.memory])
      setRespData((prev) => [...prev.slice(-59), newData.responseTime])
    }, 2000)
  }

  useEffect(() => {
    // 初始化60个点
    const initLabels = Array.from({ length: 60 }, (_, i) => {
      const d = new Date()
      d.setSeconds(d.getSeconds() - (59 - i))
      return d.toLocaleTimeString('zh-CN', { hour12: false, minute: '2-digit', second: '2-digit' })
    })
    setTimeLabels(initLabels)
    setCpuData(Array(60).fill(0))
    setMemData(Array(60).fill(0))
    setRespData(Array(60).fill(0))

    startAutoRefresh()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleRefresh = () => {
    message.success('刷新成功')
    const newData = generateResourceData()
    setResource(newData)
  }

  // ECharts 配置
  const getOption = (title: string, data: number[], color: string) => ({
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, top: 40, bottom: 30 },
    xAxis: {
      type: 'category',
      data: timeLabels,
      boundaryGap: false,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { fontSize: 10, color: '#999' },
    },
    yAxis: {
      type: 'value',
      max: title.includes('响应') ? undefined : 100,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { type: 'dashed' } },
    },
    series: [
      {
        name: title,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 2, color },
        areaStyle: { color, opacity: 0.1 },
        data,
      },
    ],
  })

  return (
    <div className={styles.monitor}>
      <div className={styles.header}>
        <h1 className={styles.title}>实时监控中心</h1>
        <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
          手动刷新
        </Button>
      </div>

      {/* 第一行：核心指标卡片 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.resourceCard}>
            <div className={styles.label}>CPU 使用率</div>
            <Progress type="circle" percent={resource.cpu} strokeColor="#1890ff" size={80} />
            <div className={styles.value}>{resource.cpu}%</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.resourceCard}>
            <div className={styles.label}>内存使用率</div>
            <Progress type="circle" percent={resource.memory} strokeColor="#52c41a" size={80} />
            <div className={styles.value}>{resource.memory}%</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.resourceCard}>
            <div className={styles.label}>磁盘使用率</div>
            <Progress type="circle" percent={resource.disk} strokeColor="#faad14" size={80} />
            <div className={styles.value}>{resource.disk}%</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.resourceCard}>
            <Statistic
              title="当前在线人数"
              value={resource.onlineUsers}
              prefix={<Badge status="processing" />}
            />
            <div className={styles.smallChart}>
              <ReactECharts
                option={getOption('', respData.slice(-20), '#722ed1')}
                style={{ height: 60 }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 第二行：趋势图 */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="CPU & 内存趋势" extra={<Tag color="blue">实时</Tag>}>
            <ReactECharts option={getOption('CPU', cpuData, '#1890ff')} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="平均响应时间 (ms)" extra={<Tag color="green">近1分钟</Tag>}>
            <ReactECharts
              option={getOption('响应时间', respData, '#13c2c2')}
              style={{ height: 300 }}
            />
          </Card>
        </Col>
      </Row>

      {/* 第三行：网络 + 报警 */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="网络流量 (MB/s)">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="上行"
                  value={resource.networkOut}
                  suffix="MB/s"
                  valueStyle={{ color: '#cf1322' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="下行"
                  value={resource.networkIn}
                  suffix="MB/s"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <span>
                <BellOutlined style={{ marginRight: 8 }} />
                最近报警
                <Badge count={alerts.filter((a) => a.level === 'error').length} offset={[10, -2]} />
              </span>
            }
          >
            <List
              size="small"
              dataSource={alerts}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Tag
                        color={
                          item.level === 'error' ? 'red' : item.level === 'warn' ? 'orange' : 'cyan'
                        }
                      >
                        {item.time}
                      </Tag>
                    }
                    description={item.message}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Monitor
