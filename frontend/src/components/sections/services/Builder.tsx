export default function Builder() {
  return (
    <section className="builder grid-paper" id="build">
      <div className="wrap">
        <h2 data-rev="">
          Build your <em>scope.</em>
        </h2>
        <p className="sub" data-rev="">
          Pick what your project needs. We’ll carry your selection straight into the contact form.
        </p>
        <div className="picks" id="picks">
          <button className="pick" data-s="Architectural Design">
            <span>Architectural Design</span>
          </button>
          <button className="pick" data-s="Concept Development">
            <span>Concept Development</span>
          </button>
          <button className="pick" data-s="Façade Design">
            <span>Façade Design</span>
          </button>
          <button className="pick" data-s="Interior Design">
            <span>Interior Design</span>
          </button>
          <button className="pick" data-s="Interior Architecture">
            <span>Interior Architecture</span>
          </button>
          <button className="pick" data-s="Design Consultation">
            <span>Design Consultation</span>
          </button>
          <button className="pick" data-s="Project Execution">
            <span>Project Execution</span>
          </button>
          <button className="pick" data-s="Bespoke Furniture Design">
            <span>Bespoke Furniture Design</span>
          </button>
        </div>
        <div className="scope">
          <p id="scopeTxt">Nothing picked yet — tap the services you’re interested in.</p>
          <a className="go off" id="go" href="/contact" data-m="">
            Start with this scope <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
