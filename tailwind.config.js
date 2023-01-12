/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto_kufi_arabic: ["var(--noto-kufi-arabic)"],
      },
      zIndex: {
        '100': '100',
      }
    },
  },
  plugins: [],
}
