module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myGray: {
          DEFAULT: '#1F2028'
        }
      },
    },
  },
  plugins: [],
}