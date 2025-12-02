import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
// polyfill for react-router
Object.assign(globalThis, { TextEncoder, TextDecoder })
// polyfill for antd responsive observer
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
