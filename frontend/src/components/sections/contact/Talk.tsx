import Link from "next/link";

export default function Talk() {
  return (
    <section id="talk">
      <div className="wrap">
        <div className="intent" data-rev="">
          <p>I'd like to…</p>
          <div className="chips" id="chips">
            <button className="chip on" data-p="project">
              <span>Start a project</span>
            </button>{" "}
            <button className="chip" data-p="consult">
              <span>Book a consultation</span>
            </button>{" "}
            <Link className="chip" href="/career" data-m="">
              <span>Join the team →</span>
            </Link>{" "}
            <button className="chip" data-p="hello">
              <span>Just say hello</span>
            </button>
          </div>
        </div>
        <div className="ct-stage">
          <div>
            <form className="panel on" id="fMain" noValidate>
              <div className="madlib">
                {" "}
                Hi Rippotai, my name is{" "}
                <span className="fld">
                  <input name="name" required placeholder="your name" data-auto="" />
                </span>
                , and I'd like to <span id="verb">start a project</span> — a{" "}
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
              <div className="send-row">
                <button className="send" type="submit" data-m="">
                  <svg viewBox="0 0 200 200">
                    <defs>
                      <path id="circ" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
                    </defs>
                    <text>
                      <textPath href="#circ">Send message · Rippotai · Send message · Rippotai ·</textPath>
                    </text>
                  </svg>{" "}
                  <span>Send</span>
                  <span className="ar">→</span>
                </button>
                <p className="progress-txt" id="prog">
                  <b>0 of 2</b> required details filled — name and email.
                </p>
              </div>
              <p className="note">
                Sending opens your email app with everything filled in, addressed to sagar@rippotai.in.
              </p>
            </form>
            <form className="panel" id="fCareer" noValidate>
              <div className="madlib">
                {" "}
                Hi, I'm{" "}
                <span className="fld">
                  <input name="name" required placeholder="full name" data-auto="" />
                </span>
                , currently a{" "}
                <span className="fld">
                  <input name="designation" placeholder="designation" data-auto="" />
                </span>
                , and I'd love to join you in{" "}
                <span className="fld">
                  <select name="interest">
                    <option>Architecture</option>
                    <option>Interior Design</option>
                    <option>Furniture Design</option>
                    <option>Project Management</option>
                    <option>3D Visualization</option>
                    <option>Other</option>
                  </select>
                </span>
                . Reach me at{" "}
                <span className="fld">
                  <input name="email" type="email" required placeholder="email address" data-auto="" />
                </span>{" "}
                or{" "}
                <span className="fld">
                  <input name="phone" type="tel" placeholder="phone number" data-auto="" />
                </span>
                .{" "}
              </div>
              <label className="file" data-m="">
                <input type="file" id="cv" accept=".pdf,.zip" />＋{" "}
                <span id="cvn">Choose portfolio / resume (PDF, ZIP)</span>
              </label>
              <div className="send-row">
                <button className="send" type="submit" data-m="">
                  <svg viewBox="0 0 200 200">
                    <defs>
                      <path id="circ2" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
                    </defs>
                    <text>
                      <textPath href="#circ2">Apply · Join Rippotai · Apply · Join Rippotai ·</textPath>
                    </text>
                  </svg>{" "}
                  <span>Apply</span>
                  <span className="ar">→</span>
                </button>
                <p className="progress-txt" id="prog2">
                  <b>0 of 2</b> required details filled — name and email.
                </p>
              </div>
              <p className="note">
                Sending opens your email app. Please attach your portfolio there — a browser can't attach files to email
                on its own.
              </p>
            </form>
            <div className="ct-done" id="done">
              <svg className="mono" viewBox="150 -10 1360 1400" aria-hidden="true">
                <polyline className="gl" points="510,135 817,5 1150,137" />
                <ellipse className="gd" cx="830" cy="295" rx="165" ry="82" />
                <polygon className="dk a" points="176,287 835,605 832,1003 475,832 470,1192 172,1048" />
                <polygon className="dk b" points="1186,415 1486,265 1490,1052 834,1378 833,1004 1190,845" />
                <line className="ln" x1="835" y1="605" x2="1186" y2="415" />
                <line className="ln" x1="470" y1="1192" x2="834" y2="1374" />
              </svg>
              <h3>
                Your note is <em>ready.</em>
              </h3>
              <p id="doneTxt">
                Your email app should have opened with the message filled in — just press send. If it didn't, write to
                sagar@rippotai.in or call +91 99110 80605.
              </p>
              <button id="again">Write another →</button>
            </div>
          </div>
          <aside className="ct-side">
            <a
              className="card"
              href={
                "https://www.google.com/maps/dir/?api=1&destination=Rippotai+Architecture,+487/64+National+Market,+Peeragarhi,+Paschim+Vihar,+New+Delhi+110087"
              }
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
                src={
                  "https://maps.google.com/maps?q=Rippotai+Architecture,+487/64,+National+Market,+Peeragarhi,+Paschim+Vihar,+New+Delhi&z=15&output=embed"
                }
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
              style={{ textAlign: "left", background: "none", cursor: "pointer", font: "inherit", width: "100%" }}
              data-m=""
            >
              <small>Write</small>
              <span className="v">sagar@rippotai.in</span>
              <span className="act">Copy</span>
              <span className="toast">Copied ✓</span>
            </button>{" "}
            <a className="card" href="tel:+919911080605" data-m="">
              <small>Call</small>
              <span className="v">+91 99110 80605</span>
              <span className="act">Call ↗</span>
            </a>{" "}
            <a className="card" href="https://wa.me/919911080605" target="_blank" rel="noopener" data-m="">
              <small>WhatsApp</small>
              <span className="v">Message the studio</span>
              <span className="act">Open ↗</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
