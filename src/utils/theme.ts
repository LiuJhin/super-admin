const PRESET_COLORS = {
  blue: '#1677ff',
  green: '#52c41a',
  purple: '#722ed1',
  red: '#ff4d4f',
  orange: '#fa8c16',
  gold: '#faad14',
  cyan: '#13c2c2',
  geek: '#0f172a',
}

export type PresetKey = keyof typeof PRESET_COLORS

export function setTheme(mode: 'light' | 'dark') {
  document.documentElement.dataset.theme = mode === 'dark' ? 'dark' : 'light'
}

export function setPrimaryColor(colorOrPreset: string | PresetKey) {
  const color = PRESET_COLORS[colorOrPreset as PresetKey] || (colorOrPreset as string)
  document.documentElement.style.setProperty('--color-primary', color)
}

export const PRESETS = PRESET_COLORS
