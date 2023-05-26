/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: "Kanit, Montserrat, sans-serif",
        mont: "Montserrat, sans-serif",
        rubik: "Rubik, sans-serif",
      },
      flex: {
        0: "1 0 0%",
      },
      zIndex: {
        "-1": "-1",
      },
      transformOrigin: {
        0: "0%",
      },
      animation: {
        puff: `anim-loader 2s linear infinite`,
        rotate: `rotation 1s linear infinite`,
        fade: `fade 1.5s `,
        pause: `pause 0.5s `,
      },
      keyframes: {
        "anim-loader": {
          "0%": { transform: `scale(0)`, opacity: 1 },
          "100%": { transform: `scale(1)`, opacity: 0 },
        },
        rotation: {
          "0%": { transform: ` rotate(0deg)` },
          "100%": {
            transform: `rotate(360deg)`,
          },
        },
        fade: {
          "0%": { opacity: 0.4 },
          "100%": { opacity: 1 },
        },
        pause: {
          "0%": { opacity: 0.2 },
          "90%": { opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["responsive", "hover", "focus", "focus-within"],
    },
  },
  plugins: [],
};
