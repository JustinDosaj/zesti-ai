import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            table: {
              width: '100%',
              borderCollapse: 'collapse',
            },
            'thead th': {
              border: '2px solid #e5e7eb', // Light gray border
              padding: '1rem', // Padding
              textAlign: 'center', // Left align text
            },
            'tbody td': {
              border: '2px solid #e5e7eb', // Light gray border
              padding: '1rem', // Padding
              textAlign: 'center', // Left align text
            },
          },
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease-in',
        fadeInFast: 'fadeIn 0.3s ease-in',
        fadeInExtraFast: 'fadeIn 0.1s ease-in'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary':{
          'main': "#f5821f",
          'alt':"#D7690A"
        },
        'color-alt': {
          'black': "#333333",
          'green': "#16a34a",
          'yellow': '#F9E308',
          'red': '#DA291C',
          'orange': '#f5821f',
        },
        'background': "#FFFFFF"
      },
      screens:{
				midmd:"880px",
        xs: "450px"
			}
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

export default config
