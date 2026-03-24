import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EBF3FF",
          100: "#C5DEFF",
          200: "#9AC9FF",
          300: "#6EB4FF",
          400: "#3D91FF",
          500: "#1A7AFF",
          600: "#0062E6",
          700: "#004DB3",
          800: "#003880",
          900: "#00234D",
        },
      },
    },
  },
  plugins: [],
};

export default config;
