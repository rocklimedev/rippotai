export default function Apply() {
  return (
    <section className="apply" id="apply">
      <div className="wrap">
        <h2 data-rev="">
          Apply in <em>three steps.</em>
        </h2>
        <div className="wz">
          <div>
            <ol className="wz-steps" id="wzs">
              <li className="on">
                <i>1</i>
                <span>About you</span>
              </li>
              <li>
                <i>2</i>
                <span>Your role</span>
              </li>
              <li>
                <i>3</i>
                <span>Your work</span>
              </li>
            </ol>
            <div className="wz-bar">
              <b id="wzb" />
            </div>
          </div>
          <form className="wz-card" id="wz" noValidate>
            <div className="pane on" data-p="0">
              <h3>First, who are you?</h3>
              <div className="fl">
                <input name="name" placeholder=" " required />
                <label>Full name</label>
              </div>
              <div className="fl">
                <input name="email" type="email" placeholder=" " required />
                <label>Email</label>
              </div>
              <div className="fl">
                <input name="phone" type="tel" placeholder=" " />
                <label>Phone number</label>
              </div>
              <div className="nav-row">
                <span />
                <button type="button" className="nxt" data-go="1" data-m="">
                  Next <span>→</span>
                </button>
              </div>
            </div>
            <div className="pane" data-p="1">
              <h3>What do you do?</h3>
              <div className="fl">
                <input name="designation" placeholder=" " />
                <label>Current designation</label>
              </div>
              <p className="note" style={{ margin: "0 0 10px" }}>
                Interested in
              </p>
              <div className="dchips" id="dchips">
                <label>
                  <input type="radio" name="interest" value="Architecture" defaultChecked />
                  <span>Architecture</span>
                </label>
                <label>
                  <input type="radio" name="interest" value="Interior Design" />
                  <span>Interior Design</span>
                </label>
                <label>
                  <input type="radio" name="interest" value="Furniture Design" />
                  <span>Furniture Design</span>
                </label>
                <label>
                  <input type="radio" name="interest" value="Project Management" />
                  <span>Project Management</span>
                </label>
                <label>
                  <input type="radio" name="interest" value="3D Visualization" />
                  <span>3D Visualization</span>
                </label>
                <label>
                  <input type="radio" name="interest" value="Other" />
                  <span>Other</span>
                </label>
              </div>
              <div className="nav-row">
                <button type="button" className="back" data-go="0">
                  ← Back
                </button>
                <button type="button" className="nxt" data-go="2" data-m="">
                  Next <span>→</span>
                </button>
              </div>
            </div>
            <div className="pane" data-p="2">
              <h3>Show us your work.</h3>
              <label className="drop" id="drop" data-m="">
                <input type="file" id="cv" accept=".pdf,.zip" />
                <span id="cvn">Drop your portfolio / resume here, or click to choose</span>
                <small>PDF or ZIP · max 5 MB recommended</small>
              </label>
              <div className="fl">
                <textarea name="note" rows={2} placeholder=" " />
                <label>Anything you’d like us to know (optional)</label>
              </div>
              <div className="summary" id="sum" />
              <div className="nav-row">
                <button type="button" className="back" data-go="1">
                  ← Back
                </button>
                <button type="submit" className="nxt" data-m="">
                  Submit application <span>→</span>
                </button>
              </div>
              <p className="note">
                Submitting opens your email app with your application filled in, addressed to sagar@rippotai.in. Attach
                your portfolio there — a browser can’t attach files to email on its own.
              </p>
            </div>
            <div className="pane sent" data-p="3">
              <svg className="mono" viewBox="150 -10 1360 1400" aria-hidden="true">
                <polyline className="gl" points="510,135 817,5 1150,137" />
                <ellipse className="gd" cx="830" cy="295" rx="165" ry="82" />
                <polygon className="dk a" points="176,287 835,605 832,1003 475,832 470,1192 172,1048" />
                <polygon className="dk b" points="1186,415 1486,265 1490,1052 834,1378 833,1004 1190,845" />
                <line className="ln" x1="835" y1="605" x2="1186" y2="415" />
                <line className="ln" x1="470" y1="1192" x2="834" y2="1374" />
              </svg>
              <h3>
                Thank you, <em id="thx">friend</em>.
              </h3>
              <p className="note" style={{ fontSize: "15px" }}>
                Your email app should have opened with the application ready — attach your portfolio and press send. We
                read every one.
              </p>
              <div className="nav-row">
                <button type="button" className="back" data-go="0">
                  Start another
                </button>
                <span />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
