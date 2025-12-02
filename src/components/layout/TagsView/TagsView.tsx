import { Tag } from 'antd'
import { IconRender } from '@/components/layout/Common/IconRender'
import type { TagItem } from '@/store/layoutSlice'
import styles from './TagsView.module.css'

export function TagsView({
  tags,
  currentPath,
  onNavigate,
  onClose,
  onCloseOthers,
  onCloseAll,
  onReorder,
}: {
  tags: TagItem[]
  currentPath: string
  onNavigate: (p: string) => void
  onClose: (p: string) => void
  onCloseOthers: (p: string) => void
  onCloseAll: () => void
  onReorder: (from: number, to: number) => void
}) {
  return (
    <div className={styles.container} onWheel={(e) => (e.currentTarget.scrollLeft += e.deltaY)}>
      {tags.map((t, idx) => (
        <Tag
          key={t.path}
          className={styles.tag}
          color={currentPath === t.path ? 'processing' : undefined}
          onClick={() => onNavigate(t.path)}
          closable={!t.affix}
          onClose={(e) => {
            e.preventDefault()
            if (!t.affix) onClose(t.path)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            const menuOpts: { key: string; label: string; onClick: () => void }[] = [
              { key: 'close', label: 'Close', onClick: () => onClose(t.path) },
              { key: 'closeOthers', label: 'Close Others', onClick: () => onCloseOthers(t.path) },
              { key: 'closeAll', label: 'Close All', onClick: () => onCloseAll() },
            ]
            const el = document.createElement('div')
            el.style.position = 'fixed'
            el.style.top = e.clientY + 'px'
            el.style.left = e.clientX + 'px'
            el.style.background = '#fff'
            el.style.border = '1px solid #eee'
            el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
            el.style.zIndex = '9999'
            el.innerHTML = menuOpts
              .map((m) => `<div style="padding:6px 12px;cursor:pointer;">${m.label}</div>`)
              .join('')
            document.body.appendChild(el)
            Array.from(el.children).forEach((c, i) =>
              c.addEventListener('click', () => {
                menuOpts[i].onClick()
                document.body.removeChild(el)
              })
            )
            const close = () => document.body.removeChild(el)
            setTimeout(() => document.addEventListener('click', close, { once: true }), 0)
          }}
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', String(idx))}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const from = Number(e.dataTransfer.getData('text/plain'))
            const to = idx
            onReorder(from, to)
          }}
        >
          <span className={styles.item}>
            <span style={{ marginRight: 6 }}>
              <IconRender name={t.icon} />
            </span>
            {t.title}
          </span>
        </Tag>
      ))}
    </div>
  )
}
