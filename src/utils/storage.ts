export const storage = {
  get<T = string>(key: string): T | null {
    const v = localStorage.getItem(key)
    if (!v) return null
    try {
      return JSON.parse(v)
    } catch {
      return v as unknown as T
    }
  },
  set(key: string, value: unknown) {
    const v = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, v)
  },
}
