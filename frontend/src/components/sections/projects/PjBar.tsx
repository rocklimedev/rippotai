export default function PjBar() {
  return (
    <div className="pj-bar">
      <div className="wrap">
        <div className="pj-filters" id="pjf">
          <button className="on" data-f="all">
            All<sup>16</sup>
          </button>{" "}
          <button data-f="residential">
            Residential<sup>10</sup>
          </button>{" "}
          <button data-f="commercial">
            Commercial<sup>4</sup>
          </button>{" "}
          <button data-f="hospitality">
            Hospitality<sup>1</sup>
          </button>{" "}
          <button data-f="institutional">
            Institutional<sup>1</sup>
          </button>
        </div>
        <div className="pj-view" id="pjv">
          <button className="on" data-v="grid">
            Grid
          </button>
          <button data-v="list">List</button>
        </div>
      </div>
    </div>
  );
}
