import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TagItem = {
  path: string
  title: string
  icon?: string
  affix?: boolean
}

type ThemeMode = 'light' | 'dark'
type LocaleType = 'en' | 'zh'

type LayoutState = {
  collapsed: boolean
  theme: ThemeMode
  primaryColor: string
  locale: LocaleType
  tags: TagItem[]
  watermark: boolean
}

const initialState: LayoutState = {
  collapsed: false,
  theme: (localStorage.getItem('theme') as ThemeMode) || 'light',
  primaryColor: localStorage.getItem('primaryColor') || '#1677ff',
  locale: (localStorage.getItem('locale') as LocaleType) || 'zh',
  tags: [{ path: '/', title: 'Dashboard', icon: 'DashboardOutlined', affix: true }],
  watermark: false,
}

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.collapsed = action.payload
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload
      localStorage.setItem('theme', state.theme)
    },
    setPrimaryColor(state, action: PayloadAction<string>) {
      state.primaryColor = action.payload
      localStorage.setItem('primaryColor', state.primaryColor)
    },
    setLocale(state, action: PayloadAction<LocaleType>) {
      state.locale = action.payload
      localStorage.setItem('locale', state.locale)
    },
    addTag(state, action: PayloadAction<TagItem>) {
      const exists = state.tags.find((t) => t.path === action.payload.path)
      if (!exists) state.tags.push(action.payload)
    },
    removeTag(state, action: PayloadAction<string>) {
      state.tags = state.tags.filter((t) => !t.affix && t.path !== action.payload)
    },
    removeOtherTags(state, action: PayloadAction<string>) {
      state.tags = state.tags.filter((t) => t.affix || t.path === action.payload)
    },
    removeAllTags(state) {
      state.tags = state.tags.filter((t) => t.affix)
    },
    reorderTags(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload
      const item = state.tags.splice(from, 1)[0]
      state.tags.splice(to, 0, item)
    },
    setWatermark(state, action: PayloadAction<boolean>) {
      state.watermark = action.payload
    },
  },
})

export const {
  setCollapsed,
  setTheme,
  setPrimaryColor,
  setLocale,
  addTag,
  removeTag,
  removeOtherTags,
  removeAllTags,
  reorderTags,
  setWatermark,
} = slice.actions

export default slice.reducer
