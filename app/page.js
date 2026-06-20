"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { subscribeUser, submitBusinessPartner } from "./actions";
import { translations } from "./translations";

/* ═══════════════════════════════════════════════════════
   Offpeak.pt — Landing Page
   ═══════════════════════════════════════════════════════ */

const DEALS = [
  {
    id: 1,
    categoryKey: "padel",
    titleKey: "padel",
    discountKey: "halfOff",
    timeKey: "padel",
    daysKey: "weekday",
    image: "/hero-padel.png",
    isPartner: true,
  },
  {
    id: 2,
    categoryKey: "bowling",
    titleKey: "bowling",
    discountKey: "twoForOne",
    timeKey: "bowling",
    daysKey: "everyday",
    image: "/card-bowling.png",
  },
  {
    id: 3,
    categoryKey: "cinema",
    titleKey: "cinema",
    discountKey: "fortyOff",
    timeKey: "cinema",
    daysKey: "monThu",
    image: "/card-cinema.png",
  },
  {
    id: 4,
    categoryKey: "fitness",
    titleKey: "fitness",
    discountKey: "thirtyFiveOff",
    timeKey: "fitness",
    daysKey: "weekday",
    image: "/card-fitness.png",
  },
  {
    id: 5,
    categoryKey: "wellness",
    titleKey: "wellness",
    discountKey: "thirtyOff",
    timeKey: "wellness",
    daysKey: "tueThu",
    image: "/card-spa.png",
  },
];

export default function Home() {
  const [lang, setLang] = useState("pt");
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const revealRefs = useRef([]);

  /* ── User newsletter state ── */
  const [email, setEmail] = useState("");
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userError, setUserError] = useState("");

  /* ── Business lead modal state ── */
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [activityType, setActivityType] = useState("padel");
  const [businessMessage, setBusinessMessage] = useState("");
  const [isSubmittingBusiness, setIsSubmittingBusiness] = useState(false);
  const [businessSubmitted, setBusinessSubmitted] = useState(false);
  const [businessError, setBusinessError] = useState("");

  /* ── Auto-detect user browser language on mount ── */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLang = navigator.language || navigator.userLanguage;
      if (userLang && userLang.toLowerCase().startsWith("en")) {
        setLang("en");
      }
    }
  }, []);

  /* ── Scroll listener for nav shadow ────────────────── */
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── JS fallback reveal for browsers w/o scroll-driven animations ── */
  useEffect(() => {
    const supportsScrollTimeline = CSS.supports("animation-timeline", "view()");
    if (supportsScrollTimeline) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealRefs.current.forEach((el) => {
      if (el) {
        el.classList.add("js-reveal");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  /* ── Submit Handlers ────────────────────────────────── */
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmittingUser(true);
    setUserError("");

    const formData = new FormData();
    formData.append("email", email);

    try {
      const res = await subscribeUser(formData);
      if (res.success) {
        setSubmitted(true);
        setEmail("");
      } else {
        setUserError(res.error || (lang === "pt" ? "Não foi possível subscrever. Tente novamente." : "Could not subscribe. Please try again."));
      }
    } catch (err) {
      setUserError(lang === "pt" ? "Erro de ligação. Tente novamente." : "A connection error occurred. Please try again.");
    } finally {
      setIsSubmittingUser(false);
    }
  };

  const handleBusinessSubmit = async (e) => {
    e.preventDefault();
    if (!businessName.trim() || !contactName.trim() || !businessEmail.trim()) return;

    setIsSubmittingBusiness(true);
    setBusinessError("");

    const formData = new FormData();
    formData.append("businessName", businessName);
    formData.append("contactName", contactName);
    formData.append("email", businessEmail);
    formData.append("activityType", activityType);
    formData.append("message", businessMessage);

    try {
      const res = await submitBusinessPartner(formData);
      if (res.success) {
        setBusinessSubmitted(true);
        setBusinessName("");
        setContactName("");
        setBusinessEmail("");
        setBusinessMessage("");
      } else {
        setBusinessError(res.error || (lang === "pt" ? "Não foi possível submeter o pedido. Tente novamente." : "Could not submit. Please try again."));
      }
    } catch (err) {
      setBusinessError(lang === "pt" ? "Erro de ligação. Tente novamente." : "A connection error occurred. Please try again.");
    } finally {
      setIsSubmittingBusiness(false);
    }
  };

  const t = translations[lang] || translations.en;

  return (
    <>
      {/* ─────────── Navigation ─────────── */}
      <nav
        id="nav"
        className={`${styles.nav} ${navScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.navInner}>
          <a href="#" className={styles.logo}>
            offpeak<span className={styles.logoDot}></span>pt
          </a>

          <div className={styles.navLinks}>
            <a href="#deals" className={styles.navLink}>
              {t.nav.deals}
            </a>
            <a href="#for-business" className={styles.navLink}>
              {t.nav.forBusiness}
            </a>
            
            <button
              onClick={() => setLang(lang === "en" ? "pt" : "en")}
              className={styles.langToggle}
              aria-label="Toggle language"
            >
              {lang === "en" ? "PT" : "EN"}
            </button>

            <a href="#signup" className={`btn btn-primary ${styles.navCta}`}>
              {t.nav.cta}
            </a>
          </div>

          <div className={styles.navRightMobile}>
            <button
              onClick={() => setLang(lang === "en" ? "pt" : "en")}
              className={styles.langToggle}
              aria-label="Toggle language"
            >
              {lang === "en" ? "PT" : "EN"}
            </button>
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* ─────────── Hero ─────────── */}
        <section id="hero" className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot}></span>
                {t.hero.badge}
              </div>

              <h1 className={styles.heroTitle}>
                {t.hero.title}
                <br />
                <span className={styles.heroTitleHighlight}>{t.hero.highlight}</span>
              </h1>

              <p className={styles.heroSubtitle}>
                {t.hero.subtitle}
              </p>

              <div className={styles.heroCtas}>
                <a href="#signup" className="btn btn-primary btn-large">
                  {t.hero.ctaPrimary}
                </a>
                <button
                  onClick={() => {
                    setBusinessSubmitted(false);
                    setIsBusinessModalOpen(true);
                  }}
                  className="btn btn-secondary btn-large"
                >
                  {t.hero.ctaSecondary}
                </button>
              </div>

              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>{t.hero.stat1Value}</span>
                  <span className={styles.heroStatLabel}>{t.hero.stat1Label}</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>{t.hero.stat2Value}</span>
                  <span className={styles.heroStatLabel}>{t.hero.stat2Label}</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>{t.hero.stat3Value}</span>
                  <span className={styles.heroStatLabel}>{t.hero.stat3Label}</span>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroOrb}></div>
              <div className={styles.heroImageWrapper}>
                <Image
                  src="/hero-padel.png"
                  alt="Lisbon Padel Club court - Offpeak.pt official partner"
                  width={520}
                  height={455}
                  priority
                />
              </div>
              <div className={styles.heroFloatingCard}>
                <div className={styles.heroFloatingIcon}>🎾</div>
                <div className={styles.heroFloatingText}>
                  <span className={styles.heroFloatingTitle}>{t.hero.floatingTitle}</span>
                  <span className={styles.heroFloatingDiscount}>
                    {t.hero.floatingDiscount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── Example Deals & Partners ─────────── */}
        <section id="deals" className={`${styles.deals} section`}>
          <div className="container" ref={addRevealRef}>
            <div className="reveal">
              <span className={styles.dealsLabel}>{t.deals.label}</span>
              <h2 className="section-title">
                {t.deals.title}
              </h2>
              <p className="section-subtitle">
                {t.deals.subtitle}
              </p>
            </div>

            <div className={`${styles.dealsGrid} reveal`} ref={addRevealRef}>
              {DEALS.map((deal) => (
                <article key={deal.id} className={styles.dealCard}>
                  <div className={styles.dealImage}>
                    <Image
                      src={deal.image}
                      alt={t.deals.titles[deal.titleKey]}
                      width={400}
                      height={250}
                    />
                    {deal.isPartner && (
                      <span className={styles.partnerBadge}>
                        {t.deals.partnerBadge}
                      </span>
                    )}
                    <span className={styles.dealBadge}>{t.deals.discounts[deal.discountKey]}</span>
                  </div>
                  <div className={styles.dealContent}>
                    <span className={styles.dealCategory}>{t.deals.categories[deal.categoryKey]}</span>
                    <h3 className={styles.dealTitle}>{t.deals.titles[deal.titleKey]}</h3>
                    <div className={styles.dealMeta}>
                      <span>{t.deals.timeSlots[deal.timeKey]}</span>
                      <span className={styles.dealMetaDot}></span>
                      <span>{t.deals.days[deal.daysKey]}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────── For Businesses ─────────── */}
        <section id="for-business" className={`${styles.forBusiness} section`}>
          <div className={`container ${styles.businessContainer}`}>
            <div className={styles.businessContent} ref={addRevealRef}>
              <div className="reveal">
                <span className={styles.businessLabel}>{t.forBusiness.label}</span>
                <h2 className={styles.businessTitle}>
                  {t.forBusiness.title}
                </h2>
                <p className={styles.businessSubtitle}>
                  {t.forBusiness.subtitle}
                </p>
              </div>

              <div className={`${styles.businessFeatures} reveal`} ref={addRevealRef}>
                <div className={styles.businessFeature}>
                  <div className={styles.businessFeatureIcon}>📅</div>
                  <div className={styles.businessFeatureText}>
                    <h4>{t.forBusiness.feature1Title}</h4>
                    <p>
                      {t.forBusiness.feature1Desc}
                    </p>
                  </div>
                </div>

                <div className={styles.businessFeature}>
                  <div className={styles.businessFeatureIcon}>📢</div>
                  <div className={styles.businessFeatureText}>
                    <h4>{t.forBusiness.feature2Title}</h4>
                    <p>
                      {t.forBusiness.feature2Desc}
                    </p>
                  </div>
                </div>

                <div className={styles.businessFeature}>
                  <div className={styles.businessFeatureIcon}>🤝</div>
                  <div className={styles.businessFeatureText}>
                    <h4>{t.forBusiness.feature3Title}</h4>
                    <p>
                      {t.forBusiness.feature3Desc}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setBusinessSubmitted(false);
                  setIsBusinessModalOpen(true);
                }}
                className="btn btn-primary btn-large"
              >
                {t.forBusiness.cta}
              </button>
            </div>

            <div className={styles.businessVisual} ref={addRevealRef}>
              <div className={`${styles.businessCard} reveal-scale`}>
                <h3 className={styles.businessCardTitle}>
                  {t.forBusiness.cardTitle}
                </h3>
                <div className={styles.businessCardStats}>
                  <div className={styles.businessCardStat}>
                    <div className={styles.businessCardStatHeader}>
                      <span className={styles.businessCardStatLabel}>
                        {t.forBusiness.cardStat1Label}
                      </span>
                      <span className={styles.businessCardStatValue}>+68%</span>
                    </div>
                    <div className={styles.businessCardBar}>
                      <div
                        className={styles.businessCardBarFill}
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.businessCardStat}>
                    <div className={styles.businessCardStatHeader}>
                      <span className={styles.businessCardStatLabel}>
                        {t.forBusiness.cardStat2Label}
                      </span>
                      <span className={styles.businessCardStatValue}>+45%</span>
                    </div>
                    <div className={styles.businessCardBar}>
                      <div
                        className={styles.businessCardBarFill}
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.businessCardStat}>
                    <div className={styles.businessCardStatHeader}>
                      <span className={styles.businessCardStatLabel}>
                        {t.forBusiness.cardStat3Label}
                      </span>
                      <span className={styles.businessCardStatValue}>+32%</span>
                    </div>
                    <div className={styles.businessCardBar}>
                      <div
                        className={styles.businessCardBarFill}
                        style={{ width: "32%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── Email Signup ─────────── */}
        <section id="signup" className={`${styles.signup} section`}>
          <div className={styles.signupOrb}></div>
          <div className={`container ${styles.signupInner}`} ref={addRevealRef}>
            <div className="reveal">
              <h2 className={styles.signupTitle}>
                {t.signup.title}
              </h2>
              <p className={styles.signupSubtitle}>
                {t.signup.subtitle}
              </p>
            </div>

            {submitted ? (
              <div className={`${styles.signupSuccess} reveal`}>
                <span>✓</span> {t.signup.success}
              </div>
            ) : (
              <form
                onSubmit={handleUserSubmit}
                className={`${styles.signupForm} reveal`}
                ref={addRevealRef}
              >
                <input
                  id="email-input"
                  type="email"
                  required
                  disabled={isSubmittingUser}
                  placeholder={t.signup.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.signupInput}
                  aria-label="Email address"
                />
                <button type="submit" disabled={isSubmittingUser} className={styles.signupBtn}>
                  {isSubmittingUser ? t.signup.submitting : t.signup.cta}
                </button>
              </form>
            )}

            {userError && (
              <p className={styles.modalError} style={{ marginTop: "1rem", display: "inline-block" }}>
                {userError}
              </p>
            )}

            <p className={`${styles.signupNote} reveal`} ref={addRevealRef}>
              {t.signup.subtext}
            </p>
          </div>
        </section>

        {/* ─────────── Trust Signals ─────────── */}
        <section className={`${styles.trust} section`} style={{ paddingBlock: "var(--space-2xl)" }}>
          <div className="container">
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <span className={`${styles.trustDot} ${styles.green}`}></span>
                {t.trust.launch}
              </div>
              <div className={styles.trustItem}>
                <span className={`${styles.trustDot} ${styles.orange}`}></span>
                {t.trust.early}
              </div>
              <div className={styles.trustItem}>
                <span className={`${styles.trustDot} ${styles.teal}`}></span>
                {t.trust.local}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─────────── Footer ─────────── */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span className={styles.footerCopy}>
            {t.footer.copy}
          </span>
          <div className={styles.footerLinks}>
            <a href="mailto:hello@offpeak.pt" className={styles.footerLink}>
              {t.footer.contact}
            </a>
            <a href="#" className={styles.footerLink}>
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </footer>

      {/* ─────────── Business Lead Modal ─────────── */}
      <div className={`${styles.modalOverlay} ${isBusinessModalOpen ? styles.open : ""}`}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{t.modal.title}</h3>
            <button
              onClick={() => setIsBusinessModalOpen(false)}
              className={styles.modalClose}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          {businessSubmitted ? (
            <div className={styles.modalSuccess}>
              <div className={styles.modalSuccessIcon}>✓</div>
              <h4 className={styles.modalSuccessTitle}>{t.modal.successTitle}</h4>
              <p className={styles.modalSuccessText}>
                {t.modal.successText}
              </p>
              <button
                onClick={() => setIsBusinessModalOpen(false)}
                className="btn btn-secondary"
                style={{ marginTop: "1rem" }}
              >
                {t.modal.closeBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleBusinessSubmit} className={styles.modalForm}>
              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="biz-name">{t.modal.bizName}</label>
                <input
                  id="biz-name"
                  type="text"
                  required
                  placeholder={t.modal.bizNamePlac}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={styles.modalInput}
                  disabled={isSubmittingBusiness}
                />
              </div>

              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="contact-name">{t.modal.contactName}</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder={t.modal.contactNamePlac}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={styles.modalInput}
                  disabled={isSubmittingBusiness}
                />
              </div>

              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="biz-email">{t.modal.contactEmail}</label>
                <input
                  id="biz-email"
                  type="email"
                  required
                  placeholder={t.modal.contactEmailPlac}
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className={styles.modalInput}
                  disabled={isSubmittingBusiness}
                />
              </div>

              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="activity-type">{t.modal.activityType}</label>
                <select
                  id="activity-type"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className={styles.modalSelect}
                  disabled={isSubmittingBusiness}
                >
                  <option value="padel">{t.modal.activityTypes.padel}</option>
                  <option value="bowling">{t.modal.activityTypes.bowling}</option>
                  <option value="cinema">{t.modal.activityTypes.cinema}</option>
                  <option value="gym">{t.modal.activityTypes.fitness}</option>
                  <option value="spa">{t.modal.activityTypes.spa}</option>
                  <option value="other">{t.modal.activityTypes.other}</option>
                </select>
              </div>

              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="biz-msg">{t.modal.message}</label>
                <textarea
                  id="biz-msg"
                  placeholder={t.modal.messagePlac}
                  value={businessMessage}
                  onChange={(e) => setBusinessMessage(e.target.value)}
                  className={styles.modalTextarea}
                  disabled={isSubmittingBusiness}
                />
              </div>

              {businessError && (
                <div className={styles.modalError}>
                  {businessError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingBusiness}
                className={styles.modalSubmit}
              >
                {isSubmittingBusiness ? t.modal.submitBtnPending : t.modal.submitBtn}
              </button>
            </form>
          )}
        </div>
      </div>
      
      {/* ─────────── JSON-LD Structured Data for Search Engine Optimization ─────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Offpeak.pt",
            "url": "https://offpeak.pt",
            "description": "Descontos fora de horas para Padel, Bowling e Lazer em Portugal.",
            "inLanguage": ["pt-PT", "en-US"],
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://offpeak.pt/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Offpeak",
            "url": "https://offpeak.pt",
            "logo": "https://offpeak.pt/favicon.ico",
            "email": "hello@offpeak.pt",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lisbon",
              "addressCountry": "PT"
            }
          })
        }}
      />
    </>
  );
}
