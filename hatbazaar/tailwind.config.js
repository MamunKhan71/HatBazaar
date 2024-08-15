/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "system-ui"],
        inter: ["Inter", "system-ui"]
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"]
  }
}