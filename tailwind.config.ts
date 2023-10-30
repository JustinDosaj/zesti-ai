import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
          'green': "#008E53",
          'yellow': '#F9E308',
          'red': '#DA291C',
          'orange': '#f5821f'
        },
        'background': "#FFFFFF"
      },
      screens:{
				midmd:"880px",
        xs: "450px"
			}
    },
  },
  plugins: [],
}
export default config
