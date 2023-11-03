import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "grace-500": "#00694b",
        "grace-700": "#005039",
      },
    },
  },
  plugins: [],
} satisfies Config;
