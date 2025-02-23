import type { Config } from "tailwindcss";
import daisyui from "daisyui"
import themes from "daisyui/src/theming/themes"

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...themes["light"],
          primary: "#006a4d",
          "primary-content": "#fff",
          secondary: "teal",
        },
      },
    ],
    darkTheme: "mytheme"
  },
  plugins: [daisyui],
} satisfies Config;
