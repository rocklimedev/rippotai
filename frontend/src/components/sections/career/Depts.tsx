export default function Depts() {
  return (
    <section className="depts">
      <div className="wrap">
        <h2 data-rev="">
          Where you’d <em>fit.</em>
        </h2>
        <p className="sub" data-rev="">
          No fixed openings listed right now — every application is read. Pick an area and we’ll start your application
          with it.
        </p>
        <div className="dlist">
          <button className="dept" data-d="Architecture" data-m="">
            <span className="i">01</span>
            <span className="t">Architecture</span>
            <span className="a">Apply →</span>
          </button>
          <button className="dept" data-d="Interior Design" data-m="">
            <span className="i">02</span>
            <span className="t">Interior Design</span>
            <span className="a">Apply →</span>
          </button>
          <button className="dept" data-d="Furniture Design" data-m="">
            <span className="i">03</span>
            <span className="t">Furniture Design</span>
            <span className="a">Apply →</span>
          </button>
          <button className="dept" data-d="Project Management" data-m="">
            <span className="i">04</span>
            <span className="t">Project Management</span>
            <span className="a">Apply →</span>
          </button>
          <button className="dept" data-d="3D Visualization" data-m="">
            <span className="i">05</span>
            <span className="t">3D Visualization</span>
            <span className="a">Apply →</span>
          </button>
          <button className="dept" data-d="Other" data-m="">
            <span className="i">06</span>
            <span className="t">Other</span>
            <span className="a">Apply →</span>
          </button>
        </div>
      </div>
    </section>
  );
}
