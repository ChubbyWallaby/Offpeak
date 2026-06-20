"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { subscribeUser, submitBusinessPartner } from "./actions";
import { translations } from "./translations";

/* ═══════════════════════════════════════════════════════
   Offpeak.pt — Landing Page
   ═══════════════════════════════════════════════════════ */

import DEALS from "./deals.json";
import { getDiscountText, calculateDiscountPercent } from "./pricing";

export default function Home() {
  const [lang, setLang] = useState("pt");
  const [dealsList, setDealsList] = useState(DEALS);
  const [animatedDealId, setAnimatedDealId] = useState(null);

  // Simulates a booking for a specific deal (decreasing discount based on demand)
  const simulateBooking = (dealId) => {
    setDealsList((prevDeals) =>
      prevDeals.map((d) => {
        if (d.id === dealId) {
          // Trigger the badge flash/pulse CSS animation
          setAnimatedDealId(dealId);
          setTimeout(() => setAnimatedDealId(null), 1000);
          
          return {
            ...d,
            bookings: (d.bookings || 0) + 1,
            views: (d.views || 0) + 3, // Bookings imply additional page views
          };
        }
        return d;
      })
    );
  };

  // Simulate subtle live browsing traffic (occasionally incrementing views in the background)
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * dealsList.length);
      const targetDeal = dealsList[randomIndex];
      
      setDealsList((prevDeals) =>
        prevDeals.map((d) => {
          if (d.id === targetDeal.id) {
            const oldText = getDiscountText(d, lang);
            const updated = { ...d, views: (d.views || 0) + Math.floor(Math.random() * 2) + 1 };
            const newText = getDiscountText(updated, lang);
            
            // If the view increment triggers a discount drop, flash the badge
            if (oldText !== newText) {
              setAnimatedDealId(d.id);
              setTimeout(() => setAnimatedDealId(null), 1000);
            }
            
            return updated;
          }
          return d;
        })
      );
    }, 15000); // Subtle 15-second intervals

    return () => clearInterval(interval);
  }, [dealsList, lang]);

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
                {t.hero.badge}
              </div>

              <h1 className={styles.heroTitle}>
                {t.hero.titleLine1}
                <br />
                <span className={styles.heroTitleHighlight}>{t.hero.titleHighlight}</span>
                <br />
                {t.hero.titleLine2}
              </h1>

              <p className={styles.heroSubtitle}>
                {t.hero.subtitle}
              </p>

              {submitted ? (
                <div className={styles.heroSuccess}>
                  <span>✓</span> {t.signup.success}
                </div>
              ) : (
                <form onSubmit={handleUserSubmit} className={styles.heroForm}>
                  <input
                    type="email"
                    required
                    disabled={isSubmittingUser}
                    placeholder={t.hero.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.heroInput}
                    aria-label="Email address"
                  />
                  <button type="submit" disabled={isSubmittingUser} className={styles.heroBtn}>
                    {isSubmittingUser ? t.signup.submitting : t.hero.ctaPrimary}
                  </button>
                </form>
              )}

              {userError && (
                <p className={styles.modalError} style={{ marginTop: "0.5rem" }}>
                  {userError}
                </p>
              )}

              <div className={styles.heroLiveStatus}>
                <span className={styles.liveIndicatorDot}></span>
                <span className={styles.liveStatusText}>{t.hero.liveDealsText}</span>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroOrb}></div>
              <div className={styles.heroImageWrapper}>
                <Image
                  src="/hero-padel.png"
                  alt="Lisboa Padel Club court - Offpeak.pt official partner"
                  width={520}
                  height={455}
                  priority
                />
              </div>
              
              {/* Dynamic simulated floating card matching Image 2 style */}
              <div className={styles.heroPriceCard}>
                <div className={styles.priceCardHeader}>
                  <span className={styles.priceCardTitle}>{t.hero.floatingTitle}</span>
                  <span className={styles.priceCardBadge}>{t.hero.floatingDiscount}</span>
                </div>
                <div className={styles.priceCardLocation}>
                  {t.hero.floatingLocation}
                </div>
                <div className={styles.priceCardFooter}>
                  <div className={styles.priceCardPriceGroup}>
                    <span className={styles.priceCardNewPrice}>{t.hero.floatingPrice}</span>
                    <span className={styles.priceCardOldPrice}>{t.hero.floatingOldPrice}</span>
                  </div>
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
              {dealsList.map((deal) => {
                const currentPercent = calculateDiscountPercent(deal);
                const isHighDiscount = currentPercent >= 40;
                const isMediumDiscount = currentPercent >= 25 && currentPercent < 40;
                
                let demandText = t.deals.demandLow;
                let demandClass = styles.demandLow;
                if (isMediumDiscount) {
                  demandText = t.deals.demandMedium;
                  demandClass = styles.demandMedium;
                } else if (!isHighDiscount) {
                  demandText = t.deals.demandHigh;
                  demandClass = styles.demandHigh;
                }

                return (
                  <article key={deal.id} className={styles.dealCard}>
                    <div className={styles.dealImage}>
                      <Image
                        src={deal.image}
                        alt={deal.title[lang] || deal.title.en}
                        width={400}
                        height={250}
                      />
                      {deal.isPartner && (
                        <span className={styles.partnerBadge}>
                          {t.deals.partnerBadge}
                        </span>
                      )}
                      <span className={`${styles.dealBadge} ${animatedDealId === deal.id ? styles.badgeFlash : ""}`}>
                        {getDiscountText(deal, lang)}
                      </span>
                    </div>
                    <div className={styles.dealContent}>
                      <span className={styles.dealCategory}>{deal.category[lang] || deal.category.en}</span>
                      <h3 className={styles.dealTitle}>{deal.title[lang] || deal.title.en}</h3>
                      
                      {/* Live demand indicators (preparing for adaptive pricing) */}
                      <div className={styles.livePricingWrapper}>
                        <div className={styles.liveDemand}>
                          <span className={`${styles.liveDot} ${demandClass}`}></span>
                          <span className={styles.liveDemandText}>
                            {t.deals.demandLabel} <strong>{demandText}</strong>
                          </span>
                        </div>
                        <div className={styles.liveMetrics}>
                          <span>{deal.views || 0} {t.deals.viewsLabel}</span>
                          <span className={styles.liveMetricsSeparator}>•</span>
                          <span>{deal.bookings || 0} {t.deals.bookingsLabel}</span>
                        </div>
                      </div>

                      <div className={styles.dealMeta}>
                        <span>{deal.timeSlot[lang] || deal.timeSlot.en}</span>
                        <span className={styles.dealMetaDot}></span>
                        <span>{deal.days[lang] || deal.days.en}</span>
                      </div>

                      <button
                        onClick={() => simulateBooking(deal.id)}
                        className={`btn ${styles.simulateBtn}`}
                        aria-label="Simulate booking this slot"
                      >
                        ⚡ {t.deals.grabDealBtn}
                      </button>
                    </div>
                  </article>
                );
              })}
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
