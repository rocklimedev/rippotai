/** Rippotai monogram (cube + ellipse) — the only logo used across the site. */
export default function Monogram({ className = "mono" }: { className?: string }) {
  return (
    <svg className={className} viewBox="150 -10 1360 1400" aria-hidden="true">
      <polyline className="gl" points="510,135 817,5 1150,137" />
      <ellipse className="gd" cx="830" cy="295" rx="165" ry="82" />
      <polygon className="dk a" points="176,287 835,605 832,1003 475,832 470,1192 172,1048" />
      <polygon className="dk b" points="1186,415 1486,265 1490,1052 834,1378 833,1004 1190,845" />
      <line className="ln" x1="835" y1="605" x2="1186" y2="415" />
      <line className="ln" x1="470" y1="1192" x2="834" y2="1374" />
    </svg>
  );
}
