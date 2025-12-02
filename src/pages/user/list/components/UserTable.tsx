import { Table } from 'antd'

type Row = { id: number; name: string; email: string }

const data: Row[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
]

export function UserTable() {
  return (
    <Table<Row>
      rowKey="id"
      dataSource={data}
      columns={[
        { title: 'ID', dataIndex: 'id' },
        { title: '姓名', dataIndex: 'name' },
        { title: '邮箱', dataIndex: 'email' },
      ]}
      pagination={false}
    />
  )
}
