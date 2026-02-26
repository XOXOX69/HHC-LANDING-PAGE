import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { franchiseNav } from "./franchiseConfigs";

function getCountdownText() {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  let diff = Math.max(0, end - now);
  const hrs = String(Math.floor(diff / 3600000)).padStart(2, "0");
  diff %= 3600000;
  const mins = String(Math.floor(diff / 60000)).padStart(2, "0");
  diff %= 60000;
  const secs = String(Math.floor(diff / 1000)).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

const branchCards = [
  { src: "/legacy/BRANCHES/BANLIC.png", name: "BANLIC Branch", region: "BANLIC", className: "is-left-2" },
  { src: "/legacy/BRANCHES/BATAAN.png", name: "BATAAN Branch", region: "BATAAN", className: "is-left-1" },
  { src: "/legacy/BRANCHES/CROSSING.png", name: "CROSSING Branch", region: "CROSSING", className: "is-active" },
  { src: "/legacy/BRANCHES/PACIANO.png", name: "PACIANO Branch", region: "PACIANO", className: "is-right-1" },
  { src: "/legacy/BRANCHES/TUGUEGARAO.png", name: "TUGUEGARAO Branch", region: "TUGUEGARAO", className: "is-right-2" },
];

export default function BigstopPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [countdown, setCountdown] = useState(getCountdownText);
  const [posterOpen, setPosterOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("subpage", "bigstop-page");
    return () => {
      document.body.classList.remove("subpage", "bigstop-page", "modal-open");
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownText());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === "Escape") setPosterOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () =>
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));

    tryPlay();

    const resume = () => {
      tryPlay();
      if (!audio.paused) {
        document.removeEventListener("click", resume, true);
        document.removeEventListener("touchstart", resume, true);
        document.removeEventListener("keydown", resume, true);
      }
    };

    document.addEventListener("click", resume, { capture: true });
    document.addEventListener("touchstart", resume, { capture: true });
    document.addEventListener("keydown", resume, { capture: true });

    return () => {
      document.removeEventListener("click", resume, true);
      document.removeEventListener("touchstart", resume, true);
      document.removeEventListener("keydown", resume, true);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", posterOpen);
  }, [posterOpen]);

  const onAudioToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/legacy/MUSIC/BIGSTOP.mp3" preload="auto" loop />
      <button className="audio-toggle" type="button" aria-pressed={playing.toString()} onClick={onAudioToggle}>
        {playing ? "Pause Music" : "Play Music"}
      </button>

      <header className="site-header">
        <div className="container nav">
          <Link to="/bigstop" className="nav-brand">
            <img src="/legacy/logo.png" alt="HHC Franchise Hub" className="nav-logo" />
          </Link>

          <ul className={`nav-links${navOpen ? " open" : ""}`} id="navLinks">
            <li>
              <Link to="/boss-siomai" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-dropdown">
              <span className="nav-link nav-dropdown-toggle">
                Franchises
                <svg className="dropdown-arrow" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <ul className="nav-dropdown-menu">
                {franchiseNav.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="dropdown-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href="#contact-email" className="nav-link">
                Contact
              </a>
            </li>
          </ul>

          <div className="nav-cta">
            <a href="#contact-email" className="btn-outline">
              View Opportunities
            </a>
            <a href="#contact-email" className="btn-primary">
              Franchise Now <span>&rarr;</span>
            </a>
          </div>

          <button className={`nav-toggle${navOpen ? " open" : ""}`} aria-label="Toggle menu" onClick={() => setNavOpen((v) => !v)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className="timer-bar">
        <strong>LIMITED TIME OFFER</strong> - Ends in: <strong>{countdown}</strong> | Only a few slots remaining!
      </div>

      <main className="bigstop-layout">
        <section className="hero-banner bigstop-hero-banner" id="hero">
          <img src="/legacy/Bigstop header.jpg" alt="BIGSTOP hero" className="hero-banner-img" loading="lazy" />
          <div className="bigstop-hero-overlay">
            <div className="container">
              <div className="hero-content-wrapper">
                <div className="bigstop-hero-panel">
                  <div className="bigstop-growth-card">
                    <p className="bigstop-growth-kicker">BIGSTOP FRANCHISE</p>
                    <h1 className="bigstop-growth-title">Unlock growth with BIGSTOP</h1>
                    <p className="bigstop-growth-copy">
                      Build a 6-in-1 convenience hub with daily essentials, quick bites, pharmacy support, and payment services for your community.
                    </p>
                    <div className="bigstop-growth-actions">
                      <a className="bigstop-growth-btn primary" href="#contact-email">
                        Get started
                      </a>
                      <a className="bigstop-growth-btn secondary" href="#contact-email">
                        Talk to a human
                      </a>
                    </div>
                  </div>
                </div>

                <div className="hero-video-thumb" aria-label="HHC intro video">
                  <div className="hero-video-frame">
                    <video src="/legacy/assets/videos/intro-hhc.mp4" autoPlay loop playsInline muted controls preload="auto"></video>
                  </div>
                  <span className="hero-video-label">View the reel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bigstop-why section" id="why-bigstop">
          <div className="container">
            <div className="why-grid">
              <button className="why-intro glass-tile" type="button" onClick={() => setPosterOpen(true)}>
                <p className="section-kicker">Why Choose BIGSTOP?</p>
                <h2 className="why-title">One Franchise, Multiple Income Streams</h2>
                <p className="why-sub">
                  Layer six proven earners in one footprint: food, pharmacy, bills pay, ATM, quick bites, and daily essentials backed by nationwide support.
                </p>
                <div className="why-tags">
                  <span className="pill">6-in-1 model</span>
                  <span className="pill">Nationwide rollout</span>
                  <span className="pill">Fast ROI</span>
                </div>
              </button>

              <div className="why-cards">
                {[
                  ["6-in-1 Business Model", "Convenience Store, Quick Bites, Herrera Pharmacy, Ramyun Station, Payment Center, and ATM Services in one destination."],
                  ["Affordable Investment", "Total capital at PHP 3.5M with a PHP 350K franchise fee including FDA license and brand use."],
                  ["Fast ROI", "Target return in 18 to 24 months with multi-stream daily revenue."],
                  ["Nationwide Coverage", "Formats built for communities, commercial areas, and high-traffic sites across the country."],
                  ["Strong Franchise Support", "Site evaluation, staff training, marketing playbooks, and ongoing operations coaching."],
                  ["Community Impact", "Filipino-owned brand serving communities the Filipino way."],
                ].map(([title, text], index) => (
                  <article className="why-card" key={title}>
                    <div className="why-number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="why-body">
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bigstop-reasons section">
          <div className="container">
            <div className="section-header bigstop-section-header">
              <p className="section-kicker">Why Partner With Us</p>
              <h2 className="section-title">4 Reasons Why BIGSTOP Is Built for Growth</h2>
            </div>
            <div className="bigstop-reasons-grid">
              <article className="bigstop-reason-card reason-proven-quality">
                <span className="bigstop-reason-number">1</span>
                <h3>Proven Quality</h3>
                <p>Validated store operations and merchandising standards that protect brand trust over time.</p>
              </article>
              <article className="bigstop-reason-card reason-fast-launch">
                <span className="bigstop-reason-number">2</span>
                <h3>Fast Launch</h3>
                <p>End-to-end setup playbook covering site prep, store activation, and opening support.</p>
              </article>
              <article className="bigstop-reason-card reason-flexible-formats">
                <span className="bigstop-reason-number">3</span>
                <h3>Flexible Formats</h3>
                <p>Store models that adapt to neighborhoods, transport hubs, and commercial districts.</p>
              </article>
              <article className="bigstop-reason-card reason-accessible-investment">
                <span className="bigstop-reason-number">4</span>
                <h3>Accessible Investment</h3>
                <p>Package options that make expansion feasible across multiple city and provincial markets.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="bigstop-invest section" id="investment">
          <div className="container invest-container stacked">
            <div className="invest-header stacked">
              <div>
                <p className="section-kicker">Investment Details</p>
                <h2 className="invest-title">Franchise Packages at a Glance</h2>
                <p className="invest-sub">Compare capital, coverage, and support modules in one view.</p>
              </div>
            </div>

            <div className="package-section">
              <div className="section-bar">
                <div>
                  <p className="package-eyebrow">Foundation</p>
                  <h3>Franchise Fee</h3>
                  <p className="package-sub">Everything bundled in the base fee to get your store launch-ready.</p>
                </div>
                <div className="bar-meta">
                  <span className="price-tag">PHP 350,000</span>
                </div>
              </div>
              <div className="summary-grid">
                <div className="summary-card">
                  <p className="summary-label">Royalty (first 3 months)</p>
                  <p className="summary-value">PHP 0</p>
                </div>
                <div className="summary-card">
                  <p className="summary-label">Launch support</p>
                  <p className="summary-value">PHP 5,000 FB ads boost</p>
                </div>
                <div className="summary-card">
                  <p className="summary-label">Training</p>
                  <p className="summary-value">Owner + staff included</p>
                </div>
              </div>
              <div className="note-box">
                <p>Marketing support worth PHP 5,000 for FB ads is built in. Royalty fee starts only after the third month.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bigstop-branches section">
          <div className="container">
            <div className="section-header bigstop-section-header">
              <p className="section-kicker">Branch Rollout</p>
              <h2 className="section-title">Where BIGSTOP Is Opening Next</h2>
              <p className="section-subtitle">Priority territories for the 2026 expansion wave.</p>
            </div>
            <div className="bigstop-branches-coverflow">
              <div className="bigstop-branches-stage" aria-live="polite">
                <div className="bigstop-branches-track">
                  {branchCards.map((branch) => (
                    <article className={`bigstop-branch-card ${branch.className}`} key={branch.name}>
                      <img className="bigstop-branch-image" src={branch.src} alt={branch.name} loading="lazy" />
                      <div className="branch-card-meta">
                        <span className="branch-region-label">{branch.region}</span>
                        <span className="branch-status open">Open</span>
                      </div>
                      <p className="branch-name-caption">{branch.name}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="bigstop-branches-cta">
              <a className="btn-outline" href="#contact-email">
                View full branch map
              </a>
              <a className="btn-primary" href="#contact-email">
                Reserve my territory &rarr;
              </a>
            </div>
          </div>
        </section>

        <section className="bigstop-contact section" id="contact-email">
          <div className="container">
            <div className="bigstop-contact-shell">
              <div className="bigstop-contact-grid">
                <div className="bigstop-contact-copy">
                  <p className="section-kicker">Talk to the Team</p>
                  <h2>Discuss Your BIGSTOP Franchise Plan</h2>
                  <p>Share your preferred location and setup timeline. Our team will walk you through next steps and package options.</p>
                  <div className="contact-stack">
                    <div className="contact-tile">
                      <div className="contact-tile-icon" aria-hidden="true">
                        &#9993;
                      </div>
                      <div className="contact-tile-body">
                        <span className="contact-tile-label">Email</span>
                        <span className="contact-tile-value">salesbigstop@gmail.com</span>
                        <span className="contact-tile-value">fhoperationsdept@gmail.com</span>
                      </div>
                    </div>
                    <div className="contact-tile">
                      <div className="contact-tile-icon" aria-hidden="true">
                        &#128222;
                      </div>
                      <div className="contact-tile-body">
                        <span className="contact-tile-label">Phone / Viber</span>
                        <span className="contact-tile-value">
                          <a href="tel:09566549829" style={{ color: "inherit", textDecoration: "none" }}>
                            0956 654 9829
                          </a>
                        </span>
                        <span className="contact-tile-value subtle">
                          <a href="tel:+639566549829" style={{ color: "inherit", textDecoration: "none" }}>
                            +63 956 654 9829
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="bigstop-form" onSubmit={(event) => event.preventDefault()}>
                  <label htmlFor="bigstop-name" className="sr-only">
                    Name
                  </label>
                  <input id="bigstop-name" type="text" name="name" placeholder="Name" />
                  <label htmlFor="bigstop-phone" className="sr-only">
                    Phone
                  </label>
                  <input id="bigstop-phone" type="tel" name="phone" placeholder="Phone" />
                  <label htmlFor="bigstop-message" className="sr-only">
                    Comment
                  </label>
                  <textarea id="bigstop-message" name="message" rows="4" placeholder="Comment"></textarea>
                  <button type="submit">Send Inquiry</button>
                  <small>By sending this form, you agree to the processing of your personal data.</small>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h3>HHC Franchise Hub</h3>
            <p>Business for the Filipino</p>
          </div>
          <div className="footer-links">
            <Link to="/bigstop">Home</Link>
            <a href="#investment">Investment</a>
            <a href="#contact-email">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 HHC Franchise Hub Solutions Corp. All rights reserved.</p>
        </div>
      </footer>

      <div className={`why-modal${posterOpen ? " open" : ""}`} aria-hidden={!posterOpen} role="dialog" aria-label="Bigstop poster">
        <div className="why-modal-backdrop" onClick={() => setPosterOpen(false)}></div>
        <div className="why-modal-content">
          <button className="why-modal-close" type="button" aria-label="Close poster" onClick={() => setPosterOpen(false)}>
            &times;
          </button>
          <img src="/legacy/Bigstop WHAT WE OFFER.jpg" alt="BIGSTOP Convenience Store poster" />
        </div>
      </div>
    </>
  );
}
