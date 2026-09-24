import { Fragment } from "react";

interface Props {
  text: string;
  id?: string;
  className?: string;
  /** seconds between words */
  step?: number;
  /** delay before the first word */
  delay?: number;
}

/**
 * Word-mask headline: each word rises out of its own mask once <body> gets `.ready`
 * (after the loader on first visit, or on every client-side navigation). Last word is italic.
 */
export default function SplitHeading({ text, id, className, step = 0.1, delay = 0.25 }: Props) {
  const words = text.trim().split(/\s+/);
  return (
    <h1 id={id} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true">
            <b style={{ transitionDelay: `${(delay + i * step).toFixed(2)}s` }}>
              {i === words.length - 1 ? <em>{w}</em> : w}
            </b>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </h1>
  );
}
