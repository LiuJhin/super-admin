import styles from './UserList.module.less'
import { Card } from 'antd'
import { SearchBar } from './components/SearchBar'
import { UserTable } from './components/UserTable'

export default function UserList() {
  return (
    <div className={styles.page}>
      <Card style={{ marginBottom: 12 }}>
        <SearchBar />
      </Card>
      <UserTable />
    </div>
  )
}
