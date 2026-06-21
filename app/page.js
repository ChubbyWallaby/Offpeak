"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { subscribeUser, submitBusinessPartner, getDeals } from "./actions";
import { translations } from "./translations";

/* ═══════════════════════════════════════════════════════
   Offpeak.pt — Landing Page
   ═══════════════════════════════════════════════════════ */

import DEALS from "./deals.json";
import { getDiscountText } from "./pricing";

/* ─── SVG Icons for How It Works Section ─── */
const CompassIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const CalendarCheckIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

const PartyPopperIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5.8 11.3 2 22l10.7-3.8" />
    <path d="M4 14h.01" />
    <path d="M22 2c-2.3 0-4.4.9-6 2.4L7.4 13.1c-.6.6-.9 1.4-.9 2.2V16h.7c.8 0 1.6-.3 2.2-.9L18 6.4c1.5-1.6 2.4-3.7 2.4-6Z" />
    <path d="M20 8h.01" />
    <path d="M16 11h.01" />
    <path d="M11 4h.01" />
    <path d="M13 14.7c.3.3.4.6.4 1V17h.3c.4 0 .7.1 1 .4l.9.9c.3.3.7.3 1 0l3-3c.3-.3.3-.7 0-1l-.9-.9c-.3-.3-.4-.6-.4-1V12h-.3c-.4 0-.7-.1-1-.4l-.9-.9c-.3-.3-.7-.3-1 0l-3 3c-.3.3-.3.7 0 1Z" />
  </svg>
);

const HERO_TIMES = {
  en: ["10AM", "11:30AM", "1PM", "4PM"],
  pt: ["10h", "11h30", "13h", "16h"]
};

function ClockChar({ char, forcePrevChar, isTransitioning }) {
  const [displayChar, setDisplayChar] = useState(char);
  const [prevChar, setPrevChar] = useState(forcePrevChar);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setPrevChar(forcePrevChar);
      setDisplayChar(char);
      setAnimating(true);
    } else {
      setAnimating(false);
    }
  }, [char, forcePrevChar, isTransitioning]);

  const isCurrentlyEmpty = !displayChar && !prevChar;

  if (isCurrentlyEmpty) {
    return null;
  }

  if (animating && prevChar !== displayChar) {
    return (
      <span className={styles.clockCharWrapper} data-animating="true">
        <span className={styles.clockCharScroll}>
          <span className={styles.clockCharOld}>{prevChar || " "}</span>
          <span className={styles.clockCharNew}>{displayChar || " "}</span>
        </span>
      </span>
    );
  }

  return (
    <span className={styles.clockCharWrapper} data-animating="false">
      <span className={styles.clockCharSingle}>{displayChar || " "}</span>
    </span>
  );
}

function ClockTicker({ time }) {
  const [displayTime, setDisplayTime] = useState(time);
  const [prevTime, setPrevTime] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentRef = useRef(time);

  useEffect(() => {
    if (time !== currentRef.current) {
      setPrevTime(currentRef.current);
      setDisplayTime(time);
      setIsTransitioning(true);
      currentRef.current = time;

      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const maxLength = isTransitioning 
    ? Math.max(prevTime.length, displayTime.length) 
    : displayTime.length;

  const chars = [];
  for (let i = 0; i < maxLength; i++) {
    const char = displayTime[i] || "";
    const prevChar = prevTime[i] || "";
    chars.push({ char, prevChar, index: i });
  }

  return (
    <span className={styles.clockTickerContainer}>
      {chars.map((item) => (
        <ClockChar 
          key={item.index} 
          char={item.char} 
          forcePrevChar={item.prevChar} 
          isTransitioning={isTransitioning}
        />
      ))}
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState("pt");
  const [dealsList, setDealsList] = useState(DEALS);
  const [timeIndex, setTimeIndex] = useState(0);

  // Load the latest deals dynamically on mount to stay in sync with the dashboard updates
  useEffect(() => {
    async function loadLatestDeals() {
      try {
        const res = await getDeals();
        if (res.success && res.deals) {
          setDealsList(res.deals);
        }
      } catch (err) {
        console.error("Failed to load latest deals:", err);
      }
    }
    loadLatestDeals();
  }, []);

  // Cycle the hours shown in the hero title
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeIndex((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);



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

  // Generate structured ItemList & LocalBusiness data for crawler SEO parsing
  const dealsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Active Offpeak Deals in Lisbon",
    "numberOfItems": DEALS.length,
    "itemListElement": DEALS.map((deal, idx) => {
      const titleText = deal.title.pt || deal.title.en;
      // Extract business name before any dash or em-dash
      const businessName = titleText.split("—")[0].split("-")[0].trim();
      const discountText = deal.discount.pt || deal.discount.en;
      const timeSlotText = deal.timeSlot.pt || deal.timeSlot.en;
      const daysText = deal.days.pt || deal.days.en;

      return {
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "LocalBusiness",
          "@id": `https://offpeak.pt/#deal-${deal.id}`,
          "name": businessName,
          "image": `https://offpeak.pt${deal.image}`,
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lisbon",
            "addressCountry": "PT"
          },
          "makesOffer": {
            "@type": "Offer",
            "name": titleText,
            "description": `${discountText} during ${timeSlotText} on ${daysText}`,
            "priceCurrency": "EUR",
            "eligibleRegion": {
              "@type": "Place",
              "name": "Lisbon"
            }
          }
        }
      };
    })
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
              className={`${styles.mobileMenuBtn} ${mobileOpen ? styles.mobileMenuBtnOpen : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`${styles.mobileDrawer} ${mobileOpen ? styles.mobileDrawerOpen : ""}`}>
          <a href="#deals" className={styles.mobileDrawerLink} onClick={() => setMobileOpen(false)}>
            {t.nav.deals}
          </a>
          <a href="#for-business" className={styles.mobileDrawerLink} onClick={() => setMobileOpen(false)}>
            {t.nav.forBusiness}
          </a>
          <a href="#how-it-works" className={styles.mobileDrawerLink} onClick={() => setMobileOpen(false)}>
            {t.nav.howItWorks}
          </a>
          <a href="#signup" className={`btn btn-primary ${styles.mobileDrawerCta}`} onClick={() => setMobileOpen(false)}>
            {t.nav.cta}
          </a>
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
                {t.hero.titleLine2Prefix}{" "}
                <ClockTicker time={HERO_TIMES[lang][timeIndex]} />.
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

              <p className={styles.heroReassurance}>{t.hero.reassurance}</p>

              <div className={styles.heroLiveStatus}>
                <span className={styles.liveIndicatorDot}></span>
                <span className={styles.liveStatusText}>{dealsList.length} {t.hero.liveDealsText}</span>
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
              <a href="/map" className={styles.mapLink}>
                📍 {lang === "pt" ? "Ver no Mapa" : "View on Map"}
              </a>
            </div>

            <div className={`${styles.dealsGrid} reveal`} ref={addRevealRef}>
              {dealsList.map((deal) => {
                return (
                  <article key={deal.id} className={styles.dealCard}>
                    <a href={`/deals/${deal.slug}`} className={styles.dealCardLink}>
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
                        <span className={styles.dealBadge}>
                          {getDiscountText(deal, lang)}
                        </span>
                      </div>
                      <div className={styles.dealContent}>
                        <span className={styles.dealCategory}>{deal.category[lang] || deal.category.en}</span>
                        <h3 className={styles.dealTitle}>{deal.title[lang] || deal.title.en}</h3>

                        <div className={styles.dealMeta}>
                          <span>{deal.timeSlot[lang] || deal.timeSlot.en}</span>
                          <span className={styles.dealMetaDot}></span>
                          <span>{deal.days[lang] || deal.days.en}</span>
                        </div>

                        <span className={`btn ${styles.simulateBtn}`}>
                          {t.deals.grabDealBtn}
                        </span>
                      </div>
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────── How It Works ─────────── */}
        <section id="how-it-works" className={`${styles.howSection} section`}>
          <div className="container" ref={addRevealRef}>
            <div className={`${styles.howHeader} reveal`}>
              <span className={styles.howLabel}>{t.how.tag}</span>
              <h2 className="section-title">{t.how.title}</h2>
            </div>

            <div className={`${styles.howGrid} reveal`} ref={addRevealRef}>
              {t.how.steps.map((step, i) => {
                const stepNum = i + 1;
                return (
                  <div key={i} className={styles.howStepCard}>
                    <div className={styles.howStepNumber}>0{stepNum}</div>
                    
                    <div className={`${styles.howIconWrapper} ${
                      i === 0 ? styles.color1 : i === 1 ? styles.color2 : styles.color3
                    }`}>
                      {i === 0 && <CompassIcon className={styles.howIcon} />}
                      {i === 1 && <CalendarCheckIcon className={styles.howIcon} />}
                      {i === 2 && <PartyPopperIcon className={styles.howIcon} />}
                    </div>

                    <h3 className={styles.howStepTitle}>{step.t}</h3>
                    <p className={styles.howStepDesc}>{step.d}</p>
                  </div>
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
                <p className={styles.businessCardDisclaimer}>{t.forBusiness.cardDisclaimer}</p>
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
            <a href="/about" className={styles.footerLink}>
              {t.footer.about}
            </a>
            <a href="/faq" className={styles.footerLink}>
              {t.footer.faq}
            </a>
            <a href="/para-negocios" className={styles.footerLink}>
              {t.footer.business}
            </a>
            <a href="mailto:hello@offpeak.pt" className={styles.footerLink}>
              {t.footer.contact}
            </a>
            <a href="/privacy" className={styles.footerLink}>
              {t.footer.privacy}
            </a>
            <a href="/terms" className={styles.footerLink}>
              {t.footer.terms}
            </a>
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              {t.footer.complaints}
            </a>
          </div>
          <div className={styles.footerSocial}>
            <a href="https://instagram.com/offpeak.pt" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.footerLink}>Instagram</a>
            <a href="https://facebook.com/offpeak.pt" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.footerLink}>Facebook</a>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dealsSchema)
        }}
      />
    </>
  );
}
