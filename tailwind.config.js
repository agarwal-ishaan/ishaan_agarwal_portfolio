/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fluoro volt — the single loud accent
        primary: {
          50: '#fbffe5',
          100: '#f4ffc2',
          200: '#e9ff8a',
          300: '#ddff47',
          400: '#d2ff15',
          500: '#ccff00', // Volt
          600: '#a3cc00',
          700: '#7a9903',
          800: '#5c730a',
          900: '#4c5f0d',
        },
        accent: {
          400: '#2dd4bf',
          500: '#14b8a6', // Teal secondary (trail / charts)
          600: '#0d9488',
        },
        background: '#0b0f14', // Carbon
        surface: '#11161d',
        'surface-flat': '#161d26',
        line: '#232c38',
        text: '#f2f5f7',
        'text-soft': '#9aa7b4',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        display: ['Anton', 'Impact', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.4)',
        'plate': '0 1px 2px rgba(0,0,0,0.5), 0 12px 40px rgba(0,0,0,0.45)',
        'volt': '0 0 24px rgba(204,255,0,0.18), 0 0 60px rgba(204,255,0,0.07)',
      }
    },
  },
  plugins: [],
}
