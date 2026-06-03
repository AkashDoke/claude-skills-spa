/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        obsidian: { 950: '#050508', 900: '#0a0a12', 800: '#10101e', 700: '#16162a', 600: '#1e1e38' },
        electric: { 400: '#00f5ff', 500: '#00d4ff', 600: '#00b3e6' },
        aurora: { 400: '#a855f7', 500: '#9333ea', 600: '#7c22ce' },
        ember: { 400: '#fb923c', 500: '#f97316', 600: '#ea6c0a' },
        jade: { 400: '#34d399', 500: '#10b981', 600: '#059669' },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: { 'grid': '60px 60px' },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: { '0%,100%': {transform:'translateY(0px)'}, '50%': {transform:'translateY(-20px)'} },
        glow: { 'from': {boxShadow:'0 0 20px rgba(0,245,255,0.3)'}, 'to': {boxShadow:'0 0 40px rgba(0,245,255,0.8), 0 0 80px rgba(0,245,255,0.3)'} },
      }
    },
  },
  plugins: [],
}
