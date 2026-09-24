import { getServices } from "@/lib/content";
import ServicesBehavior from "./ServicesBehavior";

/** Home "What we do" accordion with a floating image that follows the cursor. */
export default function ServicesAccordion() {
  const services = getServices();
  return (
    <>
      <section className="services" id="services">
        <div className="wrap">
          <p className="eyebrow" data-rev="">
            What we do
          </p>
          <h2 data-rev="mask">Services</h2>
          <div className="srv" id="srv">
            {services.map((s, i) => (
              <div key={s.slug} className={`srv-row${i === 0 ? " open" : ""}`} data-m="" data-peek={s.peek}>
                <div className="srv-top">
                  <i>{String(i + 1).padStart(2, "0")}</i>
                  <h3>{s.name}</h3>
                  <span className="plus" />
                </div>
                <div className="srv-body">
                  <div>{s.summary}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="srvpeek">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="srvpeekimg" src={services[0].peek} alt="" />
      </div>
      <ServicesBehavior />
    </>
  );
}
