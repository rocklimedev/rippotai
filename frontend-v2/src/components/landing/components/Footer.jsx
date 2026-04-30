"use client";

export default function Footer({ data, brand, brandFull }) {
  if (!data) return null;

  return (
    <footer className="bg-[#0F2A24] text-white/80 py-16 pb-24 md:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <span className="text-2xl uppercase text-white tracking-[0.2em]">
            {brand}
          </span>

          <p className="mt-4 text-sm text-white/70 max-w-xs">
            Architecture is responsibility. Every project is treated as a long
            commitment, not a deliverable.
          </p>
        </div>

        {/* Studio */}
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-[#D9AF61]">
            Studio
          </span>

          <p className="mt-4 text-sm text-white/80">{data?.location}</p>

          <p className="text-sm text-white/70">By appointment only</p>
        </div>

        {/* Navigation */}
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-[#D9AF61]">
            Navigate
          </span>

          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#process">Process</a>
            </li>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#begin">Begin</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
        <span className="text-xs text-white/60 tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} {brandFull}. {data?.rights}
        </span>

        <a
          href="/admin"
          className="text-xs text-white/40 hover:text-[#D9AF61] tracking-[0.3em] uppercase"
        >
          Studio Access
        </a>
      </div>
    </footer>
  );
}
