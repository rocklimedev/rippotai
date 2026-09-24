export default function SvScroll() {
  return (
    <section className="sv-scroll" id="svs" style={{ height: "900vh" }}>
      <div className="sv-pin">
        <div className="sv-left">
          <article className="sv-step" data-i="0">
            <span className="n">01 / 08</span>
            <h2>Architectural Design</h2>
            <p>
              Buildings conceived from the cube outward — massing, planning and construction documentation resolved as
              one set of decisions.
            </p>
            <ul>
              <li>Site study</li>
              <li>Massing</li>
              <li>Working drawings</li>
            </ul>
          </article>
          <article className="sv-step" data-i="1">
            <span className="n">02 / 08</span>
            <h2>Concept Development</h2>
            <p>
              The idea before the drawing: site, brief and budget distilled into a clear spatial concept you can react
              to early.
            </p>
            <ul>
              <li>Brief</li>
              <li>Zoning</li>
              <li>{"Mood & material"}</li>
            </ul>
          </article>
          <article className="sv-step" data-i="2">
            <span className="n">03 / 08</span>
            <h2>Façade Design</h2>
            <p>
              Skins that work as hard as they look — screens, fins, brick and stone detailed for light, heat and the
              street.
            </p>
            <ul>
              <li>Elevation studies</li>
              <li>{"Screens & fins"}</li>
              <li>Material detailing</li>
            </ul>
          </article>
          <article className="sv-step" data-i="3">
            <span className="n">04 / 08</span>
            <h2>Interior Design</h2>
            <p>
              Rooms composed around how you live — material palettes, lighting and joinery drawn as a single language.
            </p>
            <ul>
              <li>Layouts</li>
              <li>Lighting</li>
              <li>Styling</li>
            </ul>
          </article>
          <article className="sv-step" data-i="4">
            <span className="n">05 / 08</span>
            <h2>Interior Architecture</h2>
            <p>
              Where interiors meet structure: reworked plans, new volumes and built-in elements that change how a space
              performs.
            </p>
            <ul>
              <li>Re-planning</li>
              <li>{"Ceilings & niches"}</li>
              <li>Built-ins</li>
            </ul>
          </article>
          <article className="sv-step" data-i="5">
            <span className="n">06 / 08</span>
            <h2>Design Consultation</h2>
            <p>
              Focused expert time for owners, developers and fellow designers — reviews, feasibility and second
              opinions.
            </p>
            <ul>
              <li>Design reviews</li>
              <li>Feasibility</li>
              <li>Second opinions</li>
            </ul>
          </article>
          <article className="sv-step" data-i="6">
            <span className="n">07 / 08</span>
            <h2>Project Execution</h2>
            <p>
              Drawings carried through to site — procurement, vendor coordination and supervision to a single point of
              accountability.
            </p>
            <ul>
              <li>Procurement</li>
              <li>Vendor coordination</li>
              <li>Site supervision</li>
            </ul>
          </article>
          <article className="sv-step" data-i="7">
            <span className="n">08 / 08</span>
            <h2>Bespoke Furniture Design</h2>
            <p>
              Pieces made for the room they sit in — designed in-studio, prototyped and produced with trusted workshops.
            </p>
            <ul>
              <li>Concept sketches</li>
              <li>Prototyping</li>
              <li>Production</li>
            </ul>
          </article>
          <div className="sv-rail" id="rail">
            <button data-i="0" title="Architectural Design">
              <span>Architectural Design</span>
            </button>
            <button data-i="1" title="Concept Development">
              <span>Concept Development</span>
            </button>
            <button data-i="2" title="Façade Design">
              <span>Façade Design</span>
            </button>
            <button data-i="3" title="Interior Design">
              <span>Interior Design</span>
            </button>
            <button data-i="4" title="Interior Architecture">
              <span>Interior Architecture</span>
            </button>
            <button data-i="5" title="Design Consultation">
              <span>Design Consultation</span>
            </button>
            <button data-i="6" title="Project Execution">
              <span>Project Execution</span>
            </button>
            <button data-i="7" title="Bespoke Furniture Design">
              <span>Bespoke Furniture Design</span>
            </button>
          </div>
        </div>
        <div className="sv-right">
          <figure className="board" data-i="0">
            <img src="/images/p_banga.webp" alt="Banga’s Residence" />{" "}
            <svg viewBox="0 0 400 300" className="draw">
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
            <figcaption>
              <span>Drawn</span>
              <i />
              <span>Built — Banga’s Residence</span>
            </figcaption>
          </figure>
          <figure className="board" data-i="1">
            <img src="/images/L1.webp" alt="Moksh Dham" />{" "}
            <svg viewBox="0 0 400 300" className="draw">
              <circle className="ln" pathLength="1" style={{ "--i": "0" }} cx="120" cy="120" r="52" />
              <circle className="ln" pathLength="1" style={{ "--i": "1" }} cx="260" cy="105" r="40" />
              <circle className="ln" pathLength="1" style={{ "--i": "2" }} cx="215" cy="215" r="46" />
              <circle className="ln g" pathLength="1" style={{ "--i": "3" }} cx="90" cy="230" r="30" />
              <path
                className="ln"
                pathLength="1"
                style={{ "--i": "4" }}
                d="M166 112 L220 106 M152 160 L180 190 M248 143 L232 172 M112 172 L100 200"
              />
              <text x="120" y="124" className="lbl">
                LIVE
              </text>
              <text x="260" y="109" className="lbl">
                LIGHT
              </text>
              <text x="215" y="219" className="lbl">
                WORK
              </text>
              <text x="90" y="234" className="lbl">
                GREEN
              </text>
            </svg>
            <figcaption>
              <span>Drawn</span>
              <i />
              <span>Built — Moksh Dham</span>
            </figcaption>
          </figure>
          <figure className="board" data-i="2">
            <img src="/images/L12.webp" alt="Banga’s Residence" />{" "}
            <svg viewBox="0 0 400 300" className="draw">
              <rect className="ln" pathLength="1" style={{ "--i": "0" }} x="80" y="40" width="240" height="230" />
              <path className="ln" pathLength="1" style={{ "--i": "1" }} d="M100 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "2" }} d="M120 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "3" }} d="M140 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "4" }} d="M160 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "1" }} d="M180 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "2" }} d="M200 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "3" }} d="M220 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "4" }} d="M240 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "1" }} d="M260 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "2" }} d="M280 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "3" }} d="M300 40 V270" />
              <path className="ln" pathLength="1" style={{ "--i": "5" }} d="M80 110 C150 110 170 150 320 150" />
              <path className="ln" pathLength="1" style={{ "--i": "6" }} d="M80 200 C170 200 190 240 320 240" />
              <path className="ln" pathLength="1" style={{ "--i": "7" }} d="M40 270 H360" />
            </svg>
            <figcaption>
              <span>Drawn</span>
              <i />
              <span>Built — Banga’s Residence</span>
            </figcaption>
          </figure>
          <figure className="board" data-i="3">
            <img src="/images/p_tropical.webp" alt="Tropical Home" />{" "}
            <svg viewBox="0 0 400 300" className="draw">
              <rect className="ln" pathLength="1" style={{ "--i": "0" }} x="40" y="40" width="320" height="220" />
              <rect className="ln" pathLength="1" style={{ "--i": "1" }} x="90" y="170" width="170" height="60" />
              <path className="ln" pathLength="1" style={{ "--i": "2" }} d="M110 170 V150 H240 V170" />
              <circle className="ln g" pathLength="1" style={{ "--i": "3" }} cx="175" cy="110" r="26" />
              <rect className="ln" pathLength="1" style={{ "--i": "4" }} x="110" y="80" width="130" height="70" />
              <path
                className="ln"
                pathLength="1"
                style={{ "--i": "5" }}
                d="M300 260 A50 50 0 0 1 350 210 M300 260 V210"
              />
              <rect className="ln" pathLength="1" style={{ "--i": "6" }} x="290" y="60" width="50" height="80" />
            </svg>
            <figcaption>
              <span>Drawn</span>
              <i />
              <span>Built — Tropical Home</span>
            </figcaption>
          </figure>
          <figure className="board" data-i="4">
            <img src="/images/L4.webp" alt="The Inner House" />{" "}
            <svg viewBox="0 0 400 300" className="draw">
              <path className="ln" pathLength="1" style={{ "--i": "0" }} d="M30 60 H370 M30 250 H370" />
              <path className="ln" pathLength="1" style={{ "--i": "1" }} d="M30 60 V250 M370 60 V250" />
              <path className="ln" pathLength="1" style={{ "--i": "2" }} d="M60 60 V78 H340 V60" />
              <path
                className="ln"
                pathLength="1"
                style={{ "--i": "3" }}
                d="M200 250 V225 H225 V200 H250 V175 H275 V150 H300 V125 H325 V100"
              />
              <rect className="ln g" pathLength="1" style={{ "--i": "4" }} x="70" y="120" width="70" height="90" />
              <path className="ln" pathLength="1" style={{ "--i": "5" }} d="M70 150 H140 M70 180 H140" />
            </svg>
            <figcaption>
              <span>Drawn</span>
              <i />
              <span>Built — The Inner House</span>
            </figcaption>
          </figure>
          <figure className="board" data-i="5">
            <img src="/images/p_khanna.webp" alt="Vinay Khanna Law Chambers" />{" "}
            <svg viewBox="0 0 400 300" className="draw">
              <rect className="ln" pathLength="1" style={{ "--i": "0" }} x="60" y="70" width="150" height="120" />
              <rect className="ln" pathLength="1" style={{ "--i": "1" }} x="130" y="120" width="150" height="110" />
              <path className="ln" pathLength="1" style={{ "--i": "2" }} d="M60 130 H210 M135 70 V190" />
              <circle className="ln g" pathLength="1" style={{ "--i": "3" }} cx="270" cy="110" r="44" />
              <path className="ln" pathLength="1" style={{ "--i": "4" }} d="M301 141 L345 185" />
              <path className="ln" pathLength="1" style={{ "--i": "5" }} d="M250 110 L265 125 L292 95" />
            </svg>
            <figcaption>
              <span>Drawn</span>
              <i />
              <span>Built — Vinay Khanna Law Chambers</span>
            </figcaption>
          </figure>
          <figure className="board" data-i="6">
            <img src="/images/sagar.webp" alt="On site" />{" "}
            <svg viewBox="0 0 400 300" className="draw">
              <path className="ln" pathLength="1" style={{ "--i": "0" }} d="M40 60 H360" />
              <path className="ln" pathLength="1" style={{ "--i": "0" }} d="M40 92 H360" />
              <path className="ln" pathLength="1" style={{ "--i": "0" }} d="M40 124 H360" />
              <path className="ln" pathLength="1" style={{ "--i": "0" }} d="M40 156 H360" />
              <path className="ln" pathLength="1" style={{ "--i": "0" }} d="M40 188 H360" />
              <path className="ln" pathLength="1" style={{ "--i": "0" }} d="M40 220 H360" />
              <path className="ln" pathLength="1" style={{ "--i": "0" }} d="M40 252 H360" />
              <rect className="ln" pathLength="1" style={{ "--i": "1" }} x="50" y="53" width="90" height="14" />
              <rect className="ln" pathLength="1" style={{ "--i": "2" }} x="110" y="85" width="110" height="14" />
              <rect className="ln g" pathLength="1" style={{ "--i": "3" }} x="170" y="117" width="80" height="14" />
              <rect className="ln" pathLength="1" style={{ "--i": "4" }} x="220" y="149" width="90" height="14" />
              <rect className="ln" pathLength="1" style={{ "--i": "5" }} x="260" y="181" width="70" height="14" />
              <rect className="ln g" pathLength="1" style={{ "--i": "6" }} x="300" y="213" width="50" height="14" />
              <path className="ln" pathLength="1" style={{ "--i": "7" }} d="M40 40 V260" />
            </svg>
            <figcaption>
              <span>Drawn</span>
              <i />
              <span>Built — On site</span>
            </figcaption>
          </figure>
          <figure className="board" data-i="7">
            <img src="/images/L9.webp" alt="Tropical Home" />{" "}
            <svg viewBox="0 0 400 300" className="draw">
              <path
                className="ln"
                pathLength="1"
                style={{ "--i": "0" }}
                d="M110 80 V250 M110 150 H210 V250 M110 170 H210"
              />
              <path className="ln" pathLength="1" style={{ "--i": "1" }} d="M110 80 C140 70 160 70 180 78" />
              <path className="ln" pathLength="1" style={{ "--i": "2" }} d="M105 150 H220" />
              <rect className="ln g" pathLength="1" style={{ "--i": "3" }} x="250" y="150" width="90" height="10" />
              <path
                className="ln"
                pathLength="1"
                style={{ "--i": "4" }}
                d="M262 160 V250 M328 160 V250 M262 215 H328"
              />
              <circle className="ln" pathLength="1" style={{ "--i": "5" }} cx="295" cy="130" r="16" />
              <path className="ln" pathLength="1" style={{ "--i": "6" }} d="M60 250 H360" />
            </svg>
            <figcaption>
              <span>Drawn</span>
              <i />
              <span>Built — Tropical Home</span>
            </figcaption>
          </figure>
          <div className="sv-count">
            <b id="svn">01</b> / 08
          </div>
        </div>
      </div>
      <div className="wrap sv-mobile">
        <article>
          <figure>
            <img src="/images/p_banga.webp" alt="Banga’s Residence" loading="lazy" />
          </figure>
          <span className="n">01 / 08</span>
          <h2>Architectural Design</h2>
          <p>
            Buildings conceived from the cube outward — massing, planning and construction documentation resolved as one
            set of decisions.
          </p>
        </article>
        <article>
          <figure>
            <img src="/images/L1.webp" alt="Moksh Dham" loading="lazy" />
          </figure>
          <span className="n">02 / 08</span>
          <h2>Concept Development</h2>
          <p>
            The idea before the drawing: site, brief and budget distilled into a clear spatial concept you can react to
            early.
          </p>
        </article>
        <article>
          <figure>
            <img src="/images/L12.webp" alt="Banga’s Residence" loading="lazy" />
          </figure>
          <span className="n">03 / 08</span>
          <h2>Façade Design</h2>
          <p>
            Skins that work as hard as they look — screens, fins, brick and stone detailed for light, heat and the
            street.
          </p>
        </article>
        <article>
          <figure>
            <img src="/images/p_tropical.webp" alt="Tropical Home" loading="lazy" />
          </figure>
          <span className="n">04 / 08</span>
          <h2>Interior Design</h2>
          <p>
            Rooms composed around how you live — material palettes, lighting and joinery drawn as a single language.
          </p>
        </article>
        <article>
          <figure>
            <img src="/images/L4.webp" alt="The Inner House" loading="lazy" />
          </figure>
          <span className="n">05 / 08</span>
          <h2>Interior Architecture</h2>
          <p>
            Where interiors meet structure: reworked plans, new volumes and built-in elements that change how a space
            performs.
          </p>
        </article>
        <article>
          <figure>
            <img src="/images/p_khanna.webp" alt="Vinay Khanna Law Chambers" loading="lazy" />
          </figure>
          <span className="n">06 / 08</span>
          <h2>Design Consultation</h2>
          <p>
            Focused expert time for owners, developers and fellow designers — reviews, feasibility and second opinions.
          </p>
        </article>
        <article>
          <figure>
            <img src="/images/sagar.webp" alt="On site" loading="lazy" />
          </figure>
          <span className="n">07 / 08</span>
          <h2>Project Execution</h2>
          <p>
            Drawings carried through to site — procurement, vendor coordination and supervision to a single point of
            accountability.
          </p>
        </article>
        <article>
          <figure>
            <img src="/images/L9.webp" alt="Tropical Home" loading="lazy" />
          </figure>
          <span className="n">08 / 08</span>
          <h2>Bespoke Furniture Design</h2>
          <p>
            Pieces made for the room they sit in — designed in-studio, prototyped and produced with trusted workshops.
          </p>
        </article>
      </div>
    </section>
  );
}
