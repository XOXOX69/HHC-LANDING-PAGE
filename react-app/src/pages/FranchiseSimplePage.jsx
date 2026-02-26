import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { franchiseNav } from "./franchiseConfigs";

export default function FranchiseSimplePage({ config }) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!config) return undefined;
    document.body.classList.add("subpage", "bigstop-page", config.bodyClass);
    return () => {
      document.body.classList.remove("subpage", "bigstop-page", config.bodyClass);
    };
  }, [config]);

  if (!config) return null;

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <Link to="/boss-siomai" className="nav-brand">
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

      <main className="bigstop-layout">
        <section className="bigstop-showcase">
          <div className="container">
            <div className="bigstop-hero-grid">
              <div className="bigstop-hero-copy">
                <p className="bigstop-kicker">{config.kicker}</p>
                <h1>{config.heroTitle}</h1>
                <p>{config.heroText}</p>
                <a href="#contact-email" className="bigstop-hero-button">
                  {config.heroCtaText} <span>&rarr;</span>
                </a>
              </div>

              <aside className="bigstop-hero-card" aria-label={`${config.brand} featured visual`}>
                <div className="bigstop-hero-card-visual">
                  <img src={config.heroCardImage} alt={config.heroCardAlt} />
                </div>
                <a href="#contact-email" className="bigstop-card-button">
                  View Opportunities <span>&rarr;</span>
                </a>
              </aside>
            </div>

            <div className={`bigstop-proof-grid${config.proofGridClass ? ` ${config.proofGridClass}` : ""}`}>
              <div className={`bigstop-proof-media${config.mainImageWrapClass ? ` ${config.mainImageWrapClass}` : ""}`}>
                <img src={config.mainImage} alt={config.mainImageAlt} />
              </div>

              <div className={`bigstop-proof-side${config.sideClass ? ` ${config.sideClass}` : ""}`}>
                {config.sideImages?.map((img) => (
                  <div key={img.src} className={`bigstop-proof-media bigstop-proof-media-mini${img.wrapClass ? ` ${img.wrapClass}` : ""}`}>
                    <img src={img.src} alt={img.alt} className={img.className || ""} />
                  </div>
                ))}

                <p className={config.proofTextClass || ""}>{config.proofText}</p>
                <div className={`bigstop-stat-stack${config.statsClass ? ` ${config.statsClass}` : ""}`}>
                  {config.stats.map((stat) => (
                    <article className="bigstop-stat-card" key={stat.title}>
                      <strong>{stat.title}</strong>
                      <span>{stat.text}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {config.aboutFill && (
              <div className="noodle-about-fill">
                <article className="noodle-about-main">
                  <p className="section-kicker">{config.aboutFill.kicker}</p>
                  <h3>{config.aboutFill.title}</h3>
                  <p>{config.aboutFill.text}</p>
                </article>
                {config.aboutFill.points.map((point) => (
                  <article className="noodle-about-point" key={point.title}>
                    <strong>{point.title}</strong>
                    <span>{point.text}</span>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bigstop-reasons section">
          <div className="container">
            <div className="section-header bigstop-section-header">
              <p className="section-kicker">Why Partner With Us</p>
              <h2 className="section-title">{config.reasonsTitle}</h2>
            </div>
            <div className="bigstop-reasons-grid">
              {config.reasons.map((reason, index) => (
                <article className="bigstop-reason-card" key={reason.title}>
                  <span className="bigstop-reason-number">{index + 1}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bigstop-invest section">
          <div className="container">
            <div className="bigstop-invest-card">
              <h2>Investment Details</h2>
              <div className="bigstop-invest-grid">
                {config.investment.map((item) => (
                  <article key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bigstop-contact section" id="contact-email">
          <div className="container">
            <div className="bigstop-contact-grid">
              <div className="bigstop-contact-copy">
                <p className="section-kicker">Talk to the Team</p>
                <h2>{config.contactTitle}</h2>
                <p>{config.contactText}</p>
                <a href="#contact-email" className="btn-outline">
                  View All Franchises
                </a>
              </div>
              <form className="bigstop-form" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor={`${config.formPrefix}-name`} className="sr-only">
                  Name
                </label>
                <input id={`${config.formPrefix}-name`} type="text" name="name" placeholder="Name" />
                <label htmlFor={`${config.formPrefix}-phone`} className="sr-only">
                  Phone
                </label>
                <input id={`${config.formPrefix}-phone`} type="tel" name="phone" placeholder="Phone" />
                <label htmlFor={`${config.formPrefix}-message`} className="sr-only">
                  Comment
                </label>
                <textarea id={`${config.formPrefix}-message`} name="message" rows="4" placeholder="Comment"></textarea>
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
            <Link to="/boss-siomai">Home</Link>
            <a href="#contact-email">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 HHC Franchise Hub Solutions Corp. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
