import type { ReactNode } from "react";
import Link from "next/link";
import Monogram from "./Monogram";
import { getFooterNav, getSite } from "@/lib/content";

interface Props {
  id?: string;
  image: string;
  imageAlt: string;
  title: ReactNode;
  href: string;
  label: string;
}

const isInternal = (href: string) => href.startsWith("/");

/** Sticky full-bleed CTA that the glass footer slides over. Shared by every page. */
export default function EndZone({ id = "endz", image, imageAlt, title, href, label }: Props) {
  const site = getSite();
  const btn = (
    <>
      {label} <span>→</span>
    </>
  );
  return (
    <div className="endzone" id={id}>
      <section className="cta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bg" src={image} alt={imageAlt} />
        <div className="in">
          <div className="wrap">
            <h2>{title}</h2>
            {isInternal(href) ? (
              <Link className="btn" href={href} data-m="">
                {btn}
              </Link>
            ) : (
              <a className="btn" href={href} data-m="">
                {btn}
              </a>
            )}
          </div>
        </div>
      </section>
      <footer className="glass">
        <div className="wrap">
          <div className="top">
            <div>
              <h5>Studio</h5>
              <p>
                {site.address[0]}
                <br />
                {site.address[1]}
              </p>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <a href={site.phoneHref}>{site.phone}</a>
                </li>
              </ul>
            </div>
            <div>
              <h5>Menu</h5>
              <ul>
                {getFooterNav().map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Follow</h5>
              <ul>
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rule" />
          <div className="mark">
            <Monogram />
            <div className="word">{site.wordmark}</div>
          </div>
          <div className="bottom">
            <span>{site.copyright}</span>
            <span>{site.credit}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
