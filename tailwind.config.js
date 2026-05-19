/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#113B2C",
          cta: "#0F402F",
          secondary: "#24533E",
          accent: "#3B6E56",
          cream: "#F5F5DC",
          "cream-light": "#FCFCF1",
          white: "#FFFFFF",
          border: "#769183",
          dark: "#112516",
          gold: "#F5A623",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      screens: {
        xs: "320px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [],
};
