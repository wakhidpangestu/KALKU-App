module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#38bdf8',
      },
      dropShadow: {
        'neon': '0 0 24px #38bdf8aa',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
