import { useMemo } from 'react'
import { DASHBOARD_STATS } from '../constants'
import type { StatItem } from '../types'

export function useDashboardData() {
  const stats: StatItem[] = useMemo(() => DASHBOARD_STATS, [])
  return { stats }
}
