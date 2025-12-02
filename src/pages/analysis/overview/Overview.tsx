// src/pages/overview/Overview.tsx
import React from 'react'
import styles from './Overview.module.less'
import { Card, Row, Col, Statistic, Progress, List, Avatar, Tag } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  NotificationOutlined,
} from '@ant-design/icons'

const Overview: React.FC = () => {
  // 模拟数据
  const statsData = [
    {
      title: '总用户数',
      value: 12658,
      icon: <UserOutlined />,
      color: '#3f8600',
      trend: '+12.5%',
      up: true,
    },
    {
      title: '总订单数',
      value: 8934,
      icon: <ShoppingCartOutlined />,
      color: '#cf1322',
      trend: '+8.1%',
      up: true,
    },
    {
      title: '总收入',
      value: 1284239,
      icon: <DollarCircleOutlined />,
      color: '#1890ff',
      trend: '-3.2%',
      up: false,
      prefix: '¥',
    },
    {
      title: '活跃用户',
      value: 8245,
      icon: <NotificationOutlined />,
      color: '#faad14',
      trend: '+18.9%',
      up: true,
    },
  ]

  const todoList = [
    { avatar: 'A', title: '审核新注册用户', desc: '共 12 条待审核', tag: '紧急', tagColor: 'red' },
    {
      avatar: 'B',
      title: '版本 v2.3.0 发布',
      desc: '预计明天上午上线',
      tag: '进行中',
      tagColor: 'blue',
    },
    {
      avatar: 'C',
      title: '数据备份完成',
      desc: '已于今日 02:30 完成',
      tag: '已完成',
      tagColor: 'green',
    },
  ]

  return (
    <div className={styles.overview}>
      <h1 className={styles.pageTitle}>总览仪表盘</h1>

      {/* 统计卡片区域 */}
      <Row gutter={[16, 16]}>
        {statsData.map((item, idx) => (
          <Col xs={24} sm={12} lg={6} key={idx}>
            <Card hoverable className={styles.statCard}>
              <div className={styles.statIcon} style={{ backgroundColor: item.color }}>
                {item.icon}
              </div>
              <div className={styles.statContent}>
                <Statistic
                  title={item.title}
                  value={item.value}
                  prefix={item.prefix}
                  valueStyle={{ fontSize: 28 }}
                />
                <div className={styles.trend}>
                  {item.up ? (
                    <ArrowUpOutlined style={{ color: '#3f8600' }} />
                  ) : (
                    <ArrowDownOutlined style={{ color: '#cf1322' }} />
                  )}
                  <span style={{ color: item.up ? '#3f8600' : '#cf1322', marginLeft: 4 }}>
                    {item.trend}
                  </span>
                  <span style={{ marginLeft: 8, color: '#999' }}>较上周</span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 中间区域：图表 + 待办事项 */}
      <Row gutter={16} style={{ marginTop: 24 }}>
        {/* 左侧图表占 2/3 */}
        <Col xs={24} lg={16}>
          <Card title="近7天趋势" className={styles.chartCard}>
            <div
              style={{
                height: 300,
                background: '#f0f2f5',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
              }}
            >
              （此处可接入 ECharts / AntV G2 / Recharts 等图表）
            </div>
          </Card>
        </Col>

        {/* 右侧待办事项占 1/3 */}
        <Col xs={24} lg={8}>
          <Card title="待办事项" className={styles.todoCard}>
            <List
              itemLayout="horizontal"
              dataSource={todoList}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{item.avatar}</Avatar>}
                    title={<a href="#!">{item.title}</a>}
                    description={item.desc}
                  />
                  <Tag color={item.tagColor}>{item.tag}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* 底部快捷操作或最近活动 */}
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="快捷操作">
            <div className={styles.quickActions}>
              {['新增用户', '创建订单', '导出报表', '系统设置'].map((action) => (
                <div key={action} className={styles.quickBtn}>
                  {action}
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Overview
