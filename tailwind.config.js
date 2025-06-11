import { colors } from '@mui/material';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {    
    extend: {
      fontFamily: {
        'Ubuntu': ['Ubuntu']
      },
      colors: {
        'footer': "#EBEBEB",
        'home': "#EFEFED",
        'pri-orange': '#FF9201',
        'pri-blue': '#030B98',
        'pri-blueDark': '#040a6e',
      },
      keyframes: {
        fall: {
          '0%, 100%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(-20%)' },
        }
      },
      animation: {
        fall: 'fall 1s ease-in-out infinite',
      }
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: []
  }
}

