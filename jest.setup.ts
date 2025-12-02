import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
// polyfill for react-router
Object.assign(globalThis, { TextEncoder, TextDecoder })
;(globalThis as unknown as { Request: unknown }).Request = class {}
;(globalThis as unknown as { fetch: () => Promise<unknown> }).fetch = () =>
  Promise.resolve({ ok: true, text: () => Promise.resolve('') })
;(globalThis as unknown as { Response: unknown }).Response = class {}
;(globalThis as unknown as { Headers: unknown }).Headers = class {}
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
