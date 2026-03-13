/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#d97706",
        marigold: "#f3b451",
        sandal: "#f7efe1",
        clay: "#c67b47",
        leaf: "#4d6b52",
        soil: "#6b4f3b",
        ink: "#24180f"
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

