/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        puff: `anim-loader 2s linear infinite`,
      },
      keyframes: {
        "anim-loader": {
          "0%": { transform: `scale(0)`, opacity: 1 },
          "100%": { transform: `scale(1)`, opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
