/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f2fcf8', 'surface-low': '#ecf6f2', 'surface-container': '#e6f0ec',
        'surface-high': '#e0eae6', white: '#ffffff', ink: '#141d1b', 'ink-variant': '#3f4946',
        outline: '#6f7976', 'outline-variant': '#bec9c5',
        primary: '#004d41', 'primary-container': '#156658', 'primary-fixed': '#a7f1de',
        'on-primary-container': '#98e1cf',
        secondary: '#904d00', 'secondary-container': '#fe932c', 'secondary-fixed': '#ffdcc3',
        tertiary: '#394457', 'tertiary-container': '#505b6f', error: '#ba1a1a'
      },
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'sans-serif'] }
    }
  },
  plugins: []
}
