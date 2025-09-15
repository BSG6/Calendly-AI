import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': 'var(--brand-primary)',
        'brand-accent-purple': 'var(--brand-accent-purple)',
        'brand-neutral': 'var(--brand-neutral)',
        'brand-accent-green': 'var(--brand-accent-green)',
        'brand-deep-green': 'var(--brand-deep-green)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
