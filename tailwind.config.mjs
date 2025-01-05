/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#2563eb',
        'secondary': '#1e293b',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'  // This removes the backticks
            },
            'code::after': {
              content: '""'  // This removes the backticks
            },
            code: {
              backgroundColor: '#f3f3f3',
              padding: '0.2em 0.4em',
              borderRadius: '4px',
              fontWeight: '400',
            },
            maxWidth: '100ch',
            color: '#334155',
            a: {
              color: '#2563eb',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
          },
        },
        dark: {
          css: {
            color: '#e2e8f0',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            h1: {
              color: '#f1f5f9',
            },
            h2: {
              color: '#f1f5f9',
            },
            h3: {
              color: '#f1f5f9',
            },
            h4: {
              color: '#f1f5f9',
            },
            strong: {
              color: '#f1f5f9',
            },
            code: {
              color: '#f1f5f9',
            },
            blockquote: {
              color: '#cbd5e1',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}