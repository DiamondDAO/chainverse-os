const defaultTheme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
module.exports = {
  mode: 'jit',
  content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		process.env === 'production'
			? null
			: './{playground,stories}/**/*.{js,jsx,ts,tsx}',
	].filter((item) => item),
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
				mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
				blue: { DEFAULT: '#015fcf' },
				darkBlue: { DEFAULT: '#003459' },
				lightBlue: { DEFAULT: '#c8d6ee' },
				lightGray: { DEFAULT: '#f5f5f5' },
				purple: { DEFAULT: '#2857ce' },
				orange: { DEFAULT: '#fac65a' },
				yellow: { DEFAULT: '#ffe04c' },
				'accent-1': '#ccdbdc',
				'accent-2': '#9ad1d4',
				'accent-3': '#80ced7',
				'accent-4': '#007ea7',
			},
      animation: {
				spin: 'spin 600ms linear infinite',
			},
    },
  },
  plugins: [typography, forms],
}
