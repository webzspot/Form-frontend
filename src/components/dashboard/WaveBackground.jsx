


const WaveBackground = ({ position = "top", height = "h-96" }) => {
  return (
    <div
      className={`absolute ${
        position === "top" ? "top-0" : "bottom-0"
      } left-0 w-full ${height} overflow-hidden z-0 pointer-events-none`}
    >
      <svg
        viewBox="0 0 1440 320"
        className={`w-full h-full ${
          position === "bottom" ? "rotate-180" : ""
        }`}
        preserveAspectRatio="none"
      >
        <path
          fill="#7c3aed"
          fillOpacity="0.12"
          d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,186.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96L1440,0L1380,0L1320,0L1200,0L1080,0L960,0L840,0L720,0L600,0L480,0L360,0L240,0L120,0L60,0L0,0Z"
        />
      </svg>
    </div>
  );
};
export default WaveBackground;