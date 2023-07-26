/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      "foodpink":"#d7c7f0",
      "bgcolor": {
        100: "#e8f4d7",
        900: "#050505",
      },
      "textcolor":{
        200: "#7a7f70",
        400: "#060802",
      },
      "teal":{
        400: "#32bdaf",
        900: "#160b28",
      },
      "accent":{
        100: "#df868f",
        400: "#b9313f",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        onbtn: {
          "0%, 100%": {transform: "scale(.85)"} 
        }
      },
      animation: {
        onbtn: "onbtn infinite ease-in-out"
      }
    },
  },
  plugins: [],
}
