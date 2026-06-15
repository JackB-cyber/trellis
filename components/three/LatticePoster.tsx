/**
 * Static SVG stand-in for the WebGL lattice — used as the suspense fallback,
 * and as the permanent visual under prefers-reduced-motion or when WebGL is unavailable.
 */
export default function LatticePoster() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute inset-0 w-full h-full opacity-70"
        viewBox="0 0 800 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="#254D3A" strokeWidth="2">
          <path d="M180 900 C 220 700, 160 560, 260 400 S 340 160, 420 40" opacity="0.7" />
          <path d="M320 900 C 300 720, 400 600, 380 440 S 480 200, 540 80" opacity="0.55" />
          <path d="M470 900 C 520 740, 460 580, 560 430 S 600 220, 680 100" opacity="0.65" />
          <path d="M600 900 C 640 760, 600 620, 680 470 S 720 280, 780 160" opacity="0.45" />
          <path d="M90 900 C 130 740, 80 600, 170 460 S 230 260, 300 140" opacity="0.4" />
        </g>
        <g stroke="#B8782A" strokeWidth="1.5">
          <path d="M260 400 C 300 340, 360 300, 420 280" opacity="0.5" />
          <path d="M380 440 C 430 390, 490 360, 545 350" opacity="0.45" />
          <path d="M560 430 C 600 380, 650 350, 700 340" opacity="0.4" />
        </g>
        <g fill="#D99A45">
          <circle cx="420" cy="40" r="3" opacity="0.8" />
          <circle cx="540" cy="80" r="2.5" opacity="0.7" />
          <circle cx="680" cy="100" r="3" opacity="0.6" />
          <circle cx="300" cy="140" r="2" opacity="0.5" />
          <circle cx="450" cy="250" r="2" opacity="0.45" />
          <circle cx="600" cy="300" r="2.5" opacity="0.4" />
          <circle cx="350" cy="330" r="1.5" opacity="0.5" />
          <circle cx="500" cy="180" r="1.5" opacity="0.4" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_60%_45%,transparent,#060A08_85%)]" />
    </div>
  );
}
