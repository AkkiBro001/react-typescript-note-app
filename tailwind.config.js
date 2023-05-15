/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '0px',
      // => @media (min-width: 500px) { ... }

      'sm': '640px',
      // => @media (min-width: 500px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors:{
        primary: "#181818",
        secondary: "#1f1f1f",
        light: "#dbdbdb",
        bdColor: "#2a2a2a"
      },
      flex: {
        '2': '2 2 0%'
      }
    },
  },
  plugins: [],
}

