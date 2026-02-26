import { useEffect, useMemo, useRef, useState } from "react";

const packageCards = [
  {
    type: "stationary",
    thumb: "/boss-siomai/package-thumbs/food-cart.jpg",
    name: "Food Cart Package",
    price: "From PHP 39,999",
    tag: "Best for: Mall / school kiosks",
    points: [
      "Cart + burner + uniforms",
      "Initial inventory included",
      "Training and opening support",
    ],
    poster: "/boss-siomai/posters/food-cart.jpg",
    cta: "Claim this package",
  },
  {
    type: "mobile",
    thumb: "/boss-siomai/package-thumbs/bike-cart.jpg",
    name: "Bike Cart Package",
    price: "From PHP 65,000",
    tag: "Best for: Mobile rounds / campuses",
    points: [
      "Bike cart with side tables",
      "Top storage + detachable roofing",
      "Starter inventory included",
    ],
    poster: "/boss-siomai/posters/bike-cart.jpg",
    cta: "Claim this package",
    popular: true,
  },
  {
    type: "stationary",
    thumb: "/boss-siomai/package-thumbs/kiosk.jpg",
    name: "Kiosk Package",
    price: "From PHP 99,000",
    tag: "Best for: Malls / terminals",
    points: [
      "Full kiosk body + service counter",
      "Electrical + lighting provisions",
      "Initial stock + uniforms",
    ],
    poster: "/boss-siomai/posters/kiosk.jpg",
    cta: "Claim this package",
  },
  {
    type: "reseller",
    thumb: "/boss-siomai/package-thumbs/reseller.jpg",
    name: "Reseller Package",
    price: "Only PHP 4,999",
    tag: "Best for: Home / side-income",
    points: [
      "Frozen siomai + sauces included",
      "No franchise + royalty fee",
      "Fast-moving products, easy start",
    ],
    poster: "/boss-siomai/posters/reseller.jpg",
    cta: "Become a reseller",
  },
];

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

export default function BossSiomaiPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [countdown, setCountdown] = useState(getCountdownText);
  const [packageFilter, setPackageFilter] = useState("all");
  const [posterOpen, setPosterOpen] = useState(false);
  const [posterSrc, setPosterSrc] = useState("");
  const audioRef = useRef(null);

  const shownPackages = useMemo(() => {
    if (packageFilter === "all") return packageCards;
    return packageCards.filter((pkg) => pkg.type === packageFilter);
  }, [packageFilter]);

  useEffect(() => {
    document.body.classList.add("subpage", "bigstop-page", "siomai-page");
    return () => {
      document.body.classList.remove("subpage", "bigstop-page", "siomai-page", "modal-open");
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownText());
    }, 1000);
    return () => clearInterval(timer);
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
    const onEsc = (e) => {
      if (e.key === "Escape") setPosterOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", posterOpen);
    if (!posterOpen) setPosterSrc("");
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
      <audio ref={audioRef} src="/boss-siomai/audio/jingle.mp3" preload="auto" loop />
      <button
        id="audioToggle"
        className="audio-toggle"
        type="button"
        aria-pressed={playing.toString()}
        onClick={onAudioToggle}
      >
        {playing ? "Pause Music" : "Play Music"}
      </button>

      <header className="site-header">
        <div className="container nav">
          <a href="#top" className="nav-brand">
            <span className="nav-brand-text">
              <span>HHC Franchise Hub</span>
              <span>Franchise Solutions</span>
            </span>
          </a>

          <ul className={`nav-links${navOpen ? " open" : ""}`} id="navLinks">
            <li><a href="#top" className="nav-link">Home</a></li>
            <li><a href="#master-franchise" className="nav-link">Master Franchise</a></li>
            <li><a href="#packages" className="nav-link">Packages</a></li>
            <li><a href="#contact-email" className="nav-link">Contact</a></li>
          </ul>

          <div className="nav-cta">
            <a href="#packages" className="btn-outline">View Opportunities</a>
            <a href="#contact-email" className="btn-primary">Franchise Now <span>&rarr;</span></a>
          </div>

          <button
            className={`nav-toggle${navOpen ? " open" : ""}`}
            id="navToggle"
            aria-label="Toggle menu"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div className="timer-bar">
        <strong>LIMITED TIME OFFER</strong> - Ends in: <strong id="countdown">{countdown}</strong> | Only a few slots remaining!
      </div>

      <main id="top" className="bigstop-layout">
        <section className="bigstop-showcase">
          <div className="container">
            <div className="bigstop-hero-grid">
              <div className="bigstop-hero-copy">
                <p className="bigstop-kicker">Boss Siomai Franchise</p>
                <h1>Bossing sa Lasa, Swak sa Bulsa</h1>
                <p>
                  Launch a high-demand food stall brand loved by Filipino customers for flavor, value, and repeat daily sales in busy commercial locations.
                </p>
                <a href="#contact-email" className="bigstop-hero-button">
                  Request Franchise Details <span>&rarr;</span>
                </a>
              </div>
              <aside className="bigstop-hero-card" aria-label="Boss Siomai featured visual">
                <div className="bigstop-hero-card-visual">
                  <img src="/boss-siomai/images/logo-horizontal.png" alt="Boss Siomai logo" />
                </div>
                <a href="#packages" className="bigstop-card-button">
                  View Opportunities <span>&rarr;</span>
                </a>
              </aside>
            </div>

            <div className="bigstop-proof-grid">
              <div className="bigstop-proof-media">
                <img src="/boss-siomai/images/menu.jpg" alt="Boss Siomai menu and combo offer display" />
              </div>
              <div className="bigstop-proof-side">
                <div className="bigstop-proof-media bigstop-proof-media-mini">
                  <img src="/boss-siomai/images/header.jpg" alt="Boss Siomai product lineup and promo visual" />
                </div>
                <div className="bigstop-proof-media bigstop-proof-media-mini">
                  <img src="/boss-siomai/images/highlight.jpg" alt="Boss Siomai product highlight" />
                </div>
                <p>
                  With multiple best-selling variants and affordable combo pricing, Boss Siomai is built for fast turnover and strong repeat purchases in high-foot-traffic sites.
                </p>
                <div className="bigstop-stat-stack">
                  <article className="bigstop-stat-card">
                    <strong>6+</strong>
                    <span>popular siomai variants customers already know</span>
                  </article>
                  <article className="bigstop-stat-card">
                    <strong>5+1 Promo</strong>
                    <span>high-conversion offer model for daily volume</span>
                  </article>
                  <article className="bigstop-stat-card">
                    <strong>Stall-ready</strong>
                    <span>compact setup suitable for malls, schools, and terminals</span>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bigstop-reasons section">
          <div className="container">
            <div className="section-header bigstop-section-header">
              <p className="section-kicker">Why Partner With Us</p>
              <h2 className="section-title">4 Reasons Why Boss Siomai Is a Smart Franchise Pick</h2>
            </div>
            <div className="bigstop-reasons-grid">
              {[
                ["Strong Brand Recall", "A familiar and trusted snack brand with broad appeal across age groups and locations."],
                ["Easy Operations", "Straightforward food prep and service flow that is simple to train and maintain."],
                ["Repeatable Demand", "Affordable daily pricing supports frequent repeat orders and consistent customer traffic."],
                ["Launch Support", "Guidance from setup to opening, including equipment, branding, and supply coordination."],
              ].map(([title, text], i) => (
                <article className="bigstop-reason-card" key={title}>
                  <span className="bigstop-reason-number">{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="siomai-packages section" id="packages">
          <div className="container">
            <div className="siomai-packages-logo">
              <img src="/boss-siomai/images/logo-horizontal.png" alt="Boss Siomai logo" />
            </div>
            <div className="section-header">
              <p className="section-kicker">Package Visuals</p>
              <h2 className="section-title">Choose the Boss Siomai setup that fits you</h2>
            </div>
            <div className="package-filters" aria-label="Package quick filter">
              {["all", "mobile", "stationary", "reseller"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`pill${packageFilter === filter ? " active" : ""}`}
                  onClick={() => setPackageFilter(filter)}
                >
                  {filter === "all" ? "All" : filter[0].toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            <div className="siomai-packages-grid">
              {shownPackages.map((pkg) => (
                <article
                  key={pkg.name}
                  className={`siomai-package-card${pkg.popular ? " popular" : ""}`}
                  data-package-type={pkg.type}
                >
                  <div className="package-thumb">
                    <img src={pkg.thumb} alt={`${pkg.name} poster thumbnail`} loading="lazy" />
                  </div>
                  <div className="package-top">
                    <div className="package-name">{pkg.name}</div>
                    <div className="package-price">{pkg.price}</div>
                    <div className="package-tag">{pkg.tag}</div>
                  </div>
                  <ul className="package-points">
                    {pkg.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  <div className="package-actions">
                    <button
                      className="btn-primary-ghost package-preview"
                      onClick={() => {
                        setPosterSrc(pkg.poster);
                        setPosterOpen(true);
                      }}
                    >
                      View full poster
                    </button>
                    <a className="btn-solid" href="#contact-email">{pkg.cta}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="siomai-master section" id="master-franchise">
          <div className="container">
            <div className="siomai-master-shell">
              <div className="siomai-master-topbar">
                <div className="siomai-master-brand">
                  <span className="siomai-master-brand-mark">BS</span>
                  <div>
                    <p>BOSS SIOMAI</p>
                    <small>Master Franchise Opportunity</small>
                  </div>
                </div>
                <nav className="siomai-master-nav" aria-label="Master franchise quick navigation">
                  <a href="#master-overview">Overview</a>
                  <a href="#master-rights">Rights</a>
                  <a href="#master-cart-income">Cart Income</a>
                  <a href="#master-distribution">Distribution</a>
                  <a href="#master-package">Package</a>
                </nav>
              </div>

              <div className="siomai-master-hero" id="master-overview">
                <article className="siomai-master-hero-copy">
                  <p className="siomai-master-eyebrow">Investment and Revenue Model</p>
                  <h2>Master Franchise Web Page for Boss Siomai</h2>
                  <p>A modern presentation layout for investor meetings, franchise discovery calls, and branch expansion discussions.</p>
                  <ul className="siomai-master-pill-row">
                    <li>Responsive Layout</li>
                    <li>Sales-Presentation Ready</li>
                    <li>Mobile Friendly</li>
                    <li>Easy to Customize</li>
                  </ul>
                  <div className="siomai-master-actions">
                    <a href="#master-rights" className="siomai-master-btn primary">View Investment Overview</a>
                    <a href="#master-cart-income" className="siomai-master-btn ghost">See Income Samples</a>
                  </div>
                </article>

                <article className="siomai-master-snapshot">
                  <div className="siomai-master-snapshot-head">
                    <h3>Quick Snapshot</h3>
                    <span>Master Franchise</span>
                  </div>
                  <div className="siomai-master-snapshot-grid">
                    <div><p>Package Cost</p><strong>PHP 2,000,000</strong></div>
                    <div><p>Contract Term</p><strong>5 Years</strong><small>Renewable</small></div>
                    <div className="full"><p>Estimated Monthly Net (3 Carts / 26 Days)</p><strong>PHP 76,050</strong><small>Based on PHP 975 clean profit per cart/day</small></div>
                  </div>
                  <ul className="siomai-master-note-list">
                    <li>Exclusive rights within city or municipality.</li>
                    <li>Authority to recruit and manage sub-franchise networks.</li>
                    <li>Operate branches and support sub-franchisees.</li>
                    <li>Multiple revenue streams: cart and distribution model.</li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bigstop-contact section" id="contact-email">
          <div className="container">
            <div className="bigstop-contact-grid">
              <div className="bigstop-contact-copy">
                <p className="section-kicker">Talk to the Team</p>
                <h2>Discuss Your Boss Siomai Franchise Plan</h2>
                <p>Send your target location and budget range. We will help you match the right stall package and rollout plan.</p>
              </div>
              <form className="bigstop-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="siomai-name" className="sr-only">Name</label>
                <input id="siomai-name" type="text" name="name" placeholder="Name" />
                <label htmlFor="siomai-phone" className="sr-only">Phone</label>
                <input id="siomai-phone" type="tel" name="phone" placeholder="Phone" />
                <label htmlFor="siomai-message" className="sr-only">Comment</label>
                <textarea id="siomai-message" name="message" rows="4" placeholder="Comment"></textarea>
                <button type="submit">Send Inquiry</button>
                <small>By sending this form, you agree to the processing of your personal data.</small>
              </form>
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
            <a href="#top">Home</a>
            <a href="#master-franchise">Master Franchise</a>
            <a href="#packages">Packages</a>
            <a href="#contact-email">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 HHC Franchise Hub Solutions Corp. All rights reserved.</p>
        </div>
      </footer>

      <div className={`package-modal${posterOpen ? " open" : ""}`} id="packageModal" aria-hidden={!posterOpen} role="dialog">
        <div className="package-modal-backdrop" onClick={() => setPosterOpen(false)}></div>
        <div className="package-modal-content">
          <button className="package-modal-close" type="button" aria-label="Close poster" onClick={() => setPosterOpen(false)}>
            &times;
          </button>
          {posterSrc && <img id="packageModalImg" src={posterSrc} alt="Package poster preview" />}
        </div>
      </div>
    </>
  );
}
