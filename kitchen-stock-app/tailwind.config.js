/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
      "./*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
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

