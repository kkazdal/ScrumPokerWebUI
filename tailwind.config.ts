import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: { max: '425px' }, // sm'yi 480px olarak ayarla (örneğin mobil cihazlar için)
        // md: '768px', // Orta ekranlar
        // lg: '1024px', // Büyük ekranlar
        // xl: '1280px', // Ekstra büyük ekranlar
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
