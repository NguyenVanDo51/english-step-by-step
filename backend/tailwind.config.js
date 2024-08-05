/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'bg-primary': 'rgb(221, 244, 255)',
        'text-primary': 'var(--main-text)',
        active: 'rgb(28, 176, 246)',
      },
      spacing: {
        inline: '0.5rem',
        normal: '1rem',
        large: '1.5rem',
      },
    },
  },
  plugins: [],
}
