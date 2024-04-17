import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: "#121212",
        primary: "#006a8e",
        secondary: "#789d4a",
        tertiary: "#a6bbd8",
        "primary-hover": "#1ba4e3",
        "secondary-hover": "#89cf4e",
      },
    },
  },
  plugins: [],
};
export default config;
