export default function SvHero() {
  return (
    <section className="sv-hero grid-paper" style={{ minHeight: "auto", padding: "clamp(70px,9vw,120px) 0 70px" }}>
      <div className="wrap">
        <div>
          <p data-rev="">Eight ways to work with one studio — from the first sketch to the last fitting on site.</p>
          <ul className="sv-idx" data-rev="">
            <li data-i="0">
              <i>01</i>Architectural Design
            </li>
            <li data-i="1">
              <i>02</i>Concept Development
            </li>
            <li data-i="2">
              <i>03</i>Façade Design
            </li>
            <li data-i="3">
              <i>04</i>Interior Design
            </li>
            <li data-i="4">
              <i>05</i>Interior Architecture
            </li>
            <li data-i="5">
              <i>06</i>Design Consultation
            </li>
            <li data-i="6">
              <i>07</i>Project Execution
            </li>
            <li data-i="7">
              <i>08</i>Bespoke Furniture Design
            </li>
          </ul>
        </div>
        <svg className="hero-draw" viewBox="0 0 400 300" aria-hidden="true">
          <path className="ln" pathLength="1" style={{ "--i": "0" }} d="M20 250 H380" />
          <rect className="ln" pathLength="1" style={{ "--i": "1" }} x="70" y="120" width="120" height="130" />
          <rect className="ln" pathLength="1" style={{ "--i": "2" }} x="190" y="70" width="140" height="180" />
          <path className="ln" pathLength="1" style={{ "--i": "3" }} d="M70 120 L110 95 H230 L190 120" />
          <rect className="ln" pathLength="1" style={{ "--i": "4" }} x="205" y="90" width="24" height="30" />
          <rect className="ln" pathLength="1" style={{ "--i": "4" }} x="205" y="135" width="24" height="30" />
          <rect className="ln" pathLength="1" style={{ "--i": "4" }} x="205" y="180" width="24" height="30" />
          <rect className="ln" pathLength="1" style={{ "--i": "5" }} x="245" y="90" width="24" height="30" />
          <rect className="ln" pathLength="1" style={{ "--i": "5" }} x="245" y="135" width="24" height="30" />
          <rect className="ln" pathLength="1" style={{ "--i": "5" }} x="245" y="180" width="24" height="30" />
          <rect className="ln" pathLength="1" style={{ "--i": "6" }} x="285" y="90" width="24" height="30" />
          <rect className="ln" pathLength="1" style={{ "--i": "6" }} x="285" y="135" width="24" height="30" />
          <rect className="ln" pathLength="1" style={{ "--i": "6" }} x="285" y="180" width="24" height="30" />
          <rect className="ln g" pathLength="1" style={{ "--i": "5" }} x="95" y="190" width="30" height="60" />
          <path className="ln" pathLength="1" style={{ "--i": "7" }} d="M70 270 H330 M70 264 V276 M330 264 V276" />
          <text x="200" y="290" className="dim">
            12 400
          </text>
        </svg>
      </div>
    </section>
  );
}
