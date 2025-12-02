import styles from './UserList.module.less'
import { Card, Button } from 'antd'
import { PageHeader } from '@/components/ui/PageHeader'
import { SearchBar } from './components/SearchBar'
import { UserTable } from './components/UserTable'

export default function UserList() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="用户列表"
        subtitle="管理系统中的用户信息"
        actions={[
          <Button key="add" type="primary">
            新增用户
          </Button>,
          <Button key="export">导出</Button>,
        ]}
      />
      <Card style={{ marginBottom: 12 }}>
        <SearchBar />
      </Card>
      <UserTable />
    </div>
  )
}
