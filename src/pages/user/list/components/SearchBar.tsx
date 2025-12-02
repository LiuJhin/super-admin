import { Form, Input, Button, Space } from 'antd'

export function SearchBar() {
  return (
    <Form layout="inline" onFinish={() => {}}>
      <Space>
        <Form.Item name="q">
          <Input placeholder="搜索用户" allowClear />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </Space>
    </Form>
  )
}
