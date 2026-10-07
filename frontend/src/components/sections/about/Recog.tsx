export default function Recog() {
  return (
    <section className="recog" id="recognition" aria-labelledby="recognition-title">
      <div className="wrap">
        <div className="recog-head">
          <span className="recog-label">Recognition</span>
          <h2 id="recognition-title">Awards & <em>recognition</em></h2>
        </div>
        <div className="recog-grid">
          <article className="recog-card">
            <div className="recog-art recog-publication" aria-hidden="true">Architectural<br />Digest</div>
            <div className="recog-caption"><h3>Architectural Digest</h3><span>2025</span></div>
          </article>
          {["awards_1.png", "awards_2.png"].map((image) => (
            <article className="recog-card" key={image}>
              <div className="recog-art">
                <img src={`/assets/achievements/${image}`} alt="GROHE Bath & Design Awards 2025" loading="lazy" />
              </div>
              <div className="recog-caption"><h3>GROHE Bath & Design Awards</h3><span>2025</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
