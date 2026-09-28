"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { useCreateQueryMutation } from "@/api/queriesApi";

export default function Talk() {
  const [createQuery, { isLoading }] = useCreateQueryMutation();

  const [intent, setIntent] = useState<"project" | "consult" | "hello">("project");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const verb = useMemo(() => {
    switch (intent) {
      case "consult":
        return "book a consultation";
      case "hello":
        return "say hello";
      default:
        return "start a project";
    }
  }, [intent]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSubmitted(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const kind = String(formData.get("kind") || "").trim();
    const where = String(formData.get("where") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const services = formData.getAll("svc").map(String);

    if (!name || !email) {
      setError("Please enter your name and email.");
      return;
    }

    const subject =
      intent === "project"
        ? `New project enquiry — ${kind}`
        : intent === "consult"
          ? `Consultation request — ${kind}`
          : "New enquiry — Rippotai";

    const enquiryMessage = [
      `Intent: ${verb}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      kind ? `Project type: ${kind}` : null,
      where ? `Location: ${where}` : null,
      services.length ? `Services: ${services.join(", ")}` : null,
      "",
      message ? `Message:\n${message}` : "Message: No additional message.",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await createQuery({
        branch: "rippotai",
        name,
        email,
        subject,
        message: enquiryMessage,
      }).unwrap();

      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error("Failed to submit query:", err);

      setError("Something went wrong while sending your enquiry. Please try again.");
    }
  };

  if (submitted) {
    return (
      <section className="ct-done on" id="done">
        <svg className="mono" viewBox="150 -10 1360 1400" aria-hidden="true">
          <polyline className="gl" points="510,135 817,5 1150,137" />
          <ellipse className="gd" cx="830" cy="295" rx="165" ry="82" />
          <polygon className="dk a" points="176,287 835,605 832,1003 475,832 470,1192 172,1048" />
          <polygon className="dk b" points="1186,415 1486,265 1490,1052 834,1378 833,1004 1190,845" />
          <line className="ln" x1="835" y1="605" x2="1186" y2="415" />
          <line className="ln" x1="470" y1="1192" x2="834" y2="1374" />
        </svg>

        <h3>
          Your note is <em>received.</em>
        </h3>

        <p>Thanks for reaching out to Rippotai. Our team will get back to you shortly.</p>

        <button type="button" id="again" onClick={() => setSubmitted(false)}>
          Write another →
        </button>
      </section>
    );
  }

  return (
    <section id="talk">
      <div className="wrap">
        <div className="intent" data-rev="">
          <p>I'd like to…</p>

          <div className="chips" id="chips">
            <button
              type="button"
              className={`chip ${intent === "project" ? "on" : ""}`}
              onClick={() => setIntent("project")}
            >
              <span>Start a project</span>
            </button>

            <button
              type="button"
              className={`chip ${intent === "consult" ? "on" : ""}`}
              onClick={() => setIntent("consult")}
            >
              <span>Book a consultation</span>
            </button>

            <Link className="chip" href="/career" data-m="">
              <span>Join the team →</span>
            </Link>

            <button
              type="button"
              className={`chip ${intent === "hello" ? "on" : ""}`}
              onClick={() => setIntent("hello")}
            >
              <span>Just say hello</span>
            </button>
          </div>
        </div>

        <div className="ct-stage">
          <div>
            <form className="panel on" id="fMain" noValidate onSubmit={handleSubmit}>
              <div className="madlib">
                {" "}
                Hi Rippotai, my name is{" "}
                <span className="fld">
                  <input name="name" required placeholder="your name" data-auto="" />
                </span>
                , and I'd like to <span id="verb">{verb}</span> — a{" "}
                <span className="fld">
                  <select name="kind">
                    <option>home</option>
                    <option>apartment interior</option>
                    <option>office</option>
                    <option>retail space</option>
                    <option>restaurant or café</option>
                    <option>institutional building</option>
                    <option>piece of furniture</option>
                    <option>something else</option>
                  </select>
                </span>{" "}
                in{" "}
                <span className="fld">
                  <input name="where" placeholder="city / area" data-auto="" />
                </span>
                . You can reach me at{" "}
                <span className="fld">
                  <input name="email" type="email" required placeholder="email address" data-auto="" />
                </span>{" "}
                or{" "}
                <span className="fld">
                  <input name="phone" type="tel" placeholder="phone (optional)" data-auto="" />
                </span>
                .{" "}
                <div className="svc" id="svcBox">
                  <label>
                    <input type="checkbox" name="svc" value="Architectural Design" />
                    <span>Architectural Design</span>
                  </label>

                  <label>
                    <input type="checkbox" name="svc" value="Concept Development" />
                    <span>Concept Development</span>
                  </label>

                  <label>
                    <input type="checkbox" name="svc" value="Façade Design" />
                    <span>Façade Design</span>
                  </label>

                  <label>
                    <input type="checkbox" name="svc" value="Interior Design" />
                    <span>Interior Design</span>
                  </label>

                  <label>
                    <input type="checkbox" name="svc" value="Interior Architecture" />
                    <span>Interior Architecture</span>
                  </label>

                  <label>
                    <input type="checkbox" name="svc" value="Design Consultation" />
                    <span>Design Consultation</span>
                  </label>

                  <label>
                    <input type="checkbox" name="svc" value="Project Execution" />
                    <span>Project Execution</span>
                  </label>

                  <label>
                    <input type="checkbox" name="svc" value="Bespoke Furniture Design" />
                    <span>Bespoke Furniture Design</span>
                  </label>
                </div>{" "}
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Anything else we should know? Site, timeline, the feeling you're after…"
                />{" "}
              </div>

              {error && (
                <p className="error" role="alert" style={{ marginTop: 12 }}>
                  {error}
                </p>
              )}

              <div className="send-row">
                <button className="send" type="submit" data-m="" disabled={isLoading}>
                  <svg viewBox="0 0 200 200" aria-hidden="true">
                    <defs>
                      <path id="circ" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
                    </defs>

                    <text>
                      <textPath href="#circ">
                        {isLoading
                          ? "Sending · Rippotai · Sending · Rippotai ·"
                          : "Send message · Rippotai · Send message · Rippotai ·"}
                      </textPath>
                    </text>
                  </svg>

                  <span>{isLoading ? "Sending" : "Send"}</span>
                  <span className="ar">→</span>
                </button>

                <p className="progress-txt" id="prog">
                  <b>2 of 2</b> required details filled — name and email.
                </p>
              </div>

              <p className="note">Your enquiry will be sent directly to the Rippotai team.</p>
            </form>
          </div>

          <aside className="ct-side">
            <a
              className="card"
              href="https://www.google.com/maps/dir/?api=1&destination=Rippotai+Architecture,+487/64+National+Market,+Peeragarhi,+Paschim+Vihar,+New+Delhi+110087"
              target="_blank"
              rel="noopener"
              data-m=""
            >
              <small>Studio</small>

              <span className="v">
                487/64, National Market, Peeragarhi,
                <br />
                Paschim Vihar, New Delhi 110087
              </span>

              <span className="act">Get directions ↗</span>
            </a>

            <div className="map" data-rev="">
              <iframe
                loading="lazy"
                title="Rippotai studio map"
                src="https://maps.google.com/maps?q=Rippotai+Architecture,+487/64,+National+Market,+Peeragarhi,+Paschim+Vihar,+New+Delhi&z=15&output=embed"
              />

              <svg className="mono pin" viewBox="150 -10 1360 1400" aria-hidden="true">
                <polyline className="gl" points="510,135 817,5 1150,137" />
                <ellipse className="gd" cx="830" cy="295" rx="165" ry="82" />
                <polygon className="dk a" points="176,287 835,605 832,1003 475,832 470,1192 172,1048" />
                <polygon className="dk b" points="1186,415 1486,265 1490,1052 834,1378 833,1004 1190,845" />
                <line className="ln" x1="835" y1="605" x2="1186" y2="415" />
                <line className="ln" x1="470" y1="1192" x2="834" y2="1374" />
              </svg>
            </div>

            <button
              className="card"
              id="copyMail"
              type="button"
              style={{
                textAlign: "left",
                background: "none",
                cursor: "pointer",
                font: "inherit",
                width: "100%",
              }}
              data-m=""
              onClick={() => {
                navigator.clipboard?.writeText("sagar@rippotai.in");
              }}
            >
              <small>Write</small>
              <span className="v">sagar@rippotai.in</span>
              <span className="act">Copy</span>
            </button>

            <a className="card" href="tel:+919911080605" data-m="">
              <small>Call</small>
              <span className="v">+91 99110 80605</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
