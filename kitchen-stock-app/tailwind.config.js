/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'theme-regular': ['Poppins_400Regular'],
        'theme-medium': ['Poppins_500Medium'],
        'theme-light': ['Poppins_300Light'],
        'theme-header': ['Roboto_700Bold']
      }
    },
  },
  plugins: [],
}

