/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        text: 'var(--color-text)',
        bg: 'var(--color-bg)',
      },
      borderRadius: {
        xl: 'var(--radius-xl)',
      },
    },
  },
}
