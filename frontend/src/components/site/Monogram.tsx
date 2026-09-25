/** Rippotai monogram (straight cube + ellipse) */
export default function Monogram({ className = "mono" }: { className?: string }) {
  return (
    <svg className={className} viewBox="150 -10 1360 1400" aria-hidden="true">
      {/* Top */}
      <polyline className="gl" points="510,135 830,5 1150,135" />

      {/* Top ellipse */}
      <ellipse className="gd" cx="830" cy="295" rx="165" ry="82" />

      {/* Left face */}
      <polygon
        className="dk a"
        points="
          176,287
          830,605
          830,1003
          475,832
          475,1192
          172,1048
        "
      />

      {/* Right face — straight vertical sides */}
      <polygon
        className="dk b"
        points="
          1185,415
          1485,265
          1485,1052
          830,1378
          830,1003
          1185,845
        "
      />

      {/* Center edge */}
      <line className="ln" x1="830" y1="605" x2="1185" y2="415" />

      {/* Bottom edge */}
      <line className="ln" x1="475" y1="1192" x2="830" y2="1374" />
    </svg>
  );
}
