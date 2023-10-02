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
          'main': "#176de8",
          'alt':"#00106F"
        },
        'color-alt': {
          'black': "#333333",
          'green': "#008E53",
        },
        'background': "#FFFFFF"
      },
      screens:{
				midmd:"880px"
			}
    },
  },
  plugins: [],
}
export default config
