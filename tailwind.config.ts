// tailwind.config.ts
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
        // আপনার ছবির সাথে মিল রেখে কাস্টম কালার
        'dusk': '#2B2A25', // ছবির ডার্ক ব্যাকগ্রাউন্ড (মাউন্টেন)
        'ember': '#B4632F', // ছবির সানরাইজ বা অরেঞ্জ গ্লো
        'moss': '#495640', // ছবির গ্রিন ফরেস্ট বা ডার্ক গ্রিন গ্লো
        'stone': '#FAF9F6', // ছবির লাইট ব্যাকগ্রাউন্ড (সেকশন)
      },
      borderRadius: {
        // অতিরিক্ত রাউন্ডেড কোণার জন্য
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
export default config;