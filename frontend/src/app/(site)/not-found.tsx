import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pg-banner" id="top-anchor" style={{ minHeight: "100vh" }}>
      <div className="bimg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/fb1.webp" alt="" />
      </div>
      <div className="bin">
        <div className="wrap">
          <div>
            <span className="k">404</span>
            <h1 id="h1">
              <span className="w">
                <b>This room is</b>
              </span>{" "}
              <span className="w">
                <b>
                  <em>not built yet.</em>
                </b>
              </span>
            </h1>
          </div>
          <div className="bmeta">
            <Link href="/">← Back home</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
