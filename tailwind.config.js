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
      animation: {
				spin: 'spin 600ms linear infinite',
			},
    },
  },
  plugins: [typography, forms],
}
