import * as Icons from '@ant-design/icons'
import type { ComponentType } from 'react'

export function IconRender({ name }: { name?: string }) {
  if (!name) return null
  const C = (Icons as unknown as Record<string, ComponentType>)[name]
  return C ? <C /> : null
}
