import { Breadcrumb } from 'antd'
import i18n from '@/i18n'

export function Breadcrumbs({ pathname }: { pathname: string }) {
  const segs = pathname.split('/').filter(Boolean)
  const items = [{ title: i18n.t('menu.dashboard') }]
  segs.forEach((s) => items.push({ title: s }))
  return <Breadcrumb items={items} />
}
