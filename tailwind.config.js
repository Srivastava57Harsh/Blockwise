/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#0E0E0E',
        "secondary": '#D9D9D9',
        "accent-1": '#B9FF66',
        "accent-2": '#806DFF',
      }
    },
  },
  plugins: [],
}
