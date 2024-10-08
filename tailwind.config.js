/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#222222",
        secondary: "#7A7A7A",
        brand: "#32375C",
      },
      fontFamily: {
        inter: 'Inter, sans-serif',
      }
    },
  },
  plugins: [],
};