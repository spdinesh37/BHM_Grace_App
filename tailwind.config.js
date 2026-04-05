/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#0f5132",
        marigold: "#f4d03f",
        sandal: "#fdf8e4",
        clay: "#1b7042",
        leaf: "#4d6b52",
        soil: "#2d5a3a",
        ink: "#1a2e20",
        "brand-green": "#0f5132",
        "brand-green-light": "#1b7042",
        "brand-yellow": "#f4d03f"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 60px -28px rgba(141, 87, 25, 0.35)"
      },
      backgroundImage: {
        halo: "radial-gradient(circle at top, rgba(243, 180, 81, 0.3), transparent 50%)",
        earth: "linear-gradient(135deg, rgba(247, 239, 225, 0.95), rgba(255, 255, 255, 0.92))"
      }
    }
  },
  plugins: []
};

