"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { subscribeUser, submitBusinessPartner } from "./actions";

/* ═══════════════════════════════════════════════════════
   Offpeak.pt — Landing Page
   ═══════════════════════════════════════════════════════ */

const DEALS = [
  {
    id: 1,
    category: "Padel",
    title: "Padel Court — Weekday Afternoons",
    discount: "50% off",
    time: "14:00–17:00",
    days: "Mon–Fri",
    image: "/hero-padel.png",
  },
  {
    id: 2,
    category: "Bowling",
    title: "Bowling — 2-for-1 Before 16:00",
    discount: "2 for 1",
    time: "Before 16:00",
    days: "Every day",
    image: "/card-bowling.png",
  },
  {
    id: 3,
    category: "Cinema",
    title: "Cinema — Afternoon Screenings",
    discount: "40% off",
    time: "13:00–16:00",
    days: "Mon–Thu",
    image: "/card-cinema.png",
  },
  {
    id: 4,
    category: "Fitness",
    title: "Gym Day Pass — Morning Hours",
    discount: "35% off",
    time: "06:00–10:00",
    days: "Mon–Fri",
    image: "/card-fitness.png",
  },
  {
    id: 5,
    category: "Wellness",
    title: "Spa Access — Midweek Relaxation",
    discount: "30% off",
    time: "10:00–15:00",
    days: "Tue–Thu",
    image: "/card-spa.png",
  },
];

export default function Home() {
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
        setUserError(res.error || "Could not subscribe. Please try again.");
      }
    } catch (err) {
      setUserError("A connection error occurred. Please try again.");
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
        setBusinessError(res.error || "Could not submit. Please try again.");
      }
    } catch (err) {
      setBusinessError("A connection error occurred. Please try again.");
    } finally {
      setIsSubmittingBusiness(false);
    }
  };

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
            <a href="#how-it-works" className={styles.navLink}>
              How it works
            </a>
            <a href="#deals" className={styles.navLink}>
              Deals
            </a>
            <a href="#for-business" className={styles.navLink}>
              For business
            </a>
            <a href="#signup" className={`btn btn-primary ${styles.navCta}`}>
              Get early access
            </a>
          </div>

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
      </nav>

      <main>
        {/* ─────────── Hero ─────────── */}
        <section id="hero" className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot}></span>
                Launching soon in Lisbon
              </div>

              <h1 className={styles.heroTitle}>
                Do more. Pay less.
                <br />
                <span className={styles.heroTitleHighlight}>Go off-peak.</span>
              </h1>

              <p className={styles.heroSubtitle}>
                Discover hidden off-peak discounts for padel, bowling, cinema,
                and more. Same great experiences — cheaper prices, fewer crowds.
              </p>

              <div className={styles.heroCtas}>
                <a href="#signup" className="btn btn-primary btn-large">
                  Get off-peak deals near you
                </a>
                <button
                  onClick={() => {
                    setBusinessSubmitted(false);
                    setIsBusinessModalOpen(true);
                  }}
                  className="btn btn-secondary btn-large"
                >
                  List your business — free
                </button>
              </div>

              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>Up to 50%</span>
                  <span className={styles.heroStatLabel}>Savings on activities</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>5+</span>
                  <span className={styles.heroStatLabel}>Activity categories</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>Lisbon</span>
                  <span className={styles.heroStatLabel}>First city</span>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroOrb}></div>
              <div className={styles.heroImageWrapper}>
                <Image
                  src="/hero-padel.png"
                  alt="Padel court bathed in golden afternoon light — the perfect off-peak moment"
                  width={520}
                  height={455}
                  priority
                />
              </div>
              <div className={styles.heroFloatingCard}>
                <div className={styles.heroFloatingIcon}>🎾</div>
                <div className={styles.heroFloatingText}>
                  <span className={styles.heroFloatingTitle}>Padel court</span>
                  <span className={styles.heroFloatingDiscount}>
                    50% off · 14:00–17:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── How It Works ─────────── */}
        <section
          id="how-it-works"
          className={`${styles.howItWorks} section`}
        >
          <div className="container" ref={addRevealRef}>
            <div className="reveal">
              <span className="section-label">How it works</span>
              <h2 className="section-title">Three steps to a better deal</h2>
              <p className="section-subtitle">
                No downloads, no apps, no fuss. Just find a deal and enjoy it.
              </p>
            </div>

            <div className={`${styles.stepsGrid} reveal`} ref={addRevealRef}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3 className={styles.stepTitle}>Choose your city</h3>
                <p className={styles.stepDesc}>
                  We start in Lisbon. More cities across Portugal are coming soon.
                </p>
                <div className={styles.stepConnector}></div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3 className={styles.stepTitle}>Discover off-peak deals</h3>
                <p className={styles.stepDesc}>
                  Browse real discounts from local businesses — padel, cinema,
                  bowling, and more.
                </p>
                <div className={styles.stepConnector}></div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3 className={styles.stepTitle}>Enjoy for less</h3>
                <p className={styles.stepDesc}>
                  Show up during off-peak hours and pay less. The same quality,
                  just at a better price.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── Why Off-Peak ─────────── */}
        <section className={`${styles.whyOffPeak} section`}>
          <div className="container" ref={addRevealRef}>
            <div className="reveal">
              <span className="section-label">Why off-peak?</span>
              <h2 className="section-title">
                It&#39;s not a compromise. It&#39;s a smarter choice.
              </h2>
              <p className="section-subtitle">
                Going off-peak means you get the same experience under better
                conditions — and for less money.
              </p>
            </div>

            <div className={`${styles.whyGrid} reveal`} ref={addRevealRef}>
              <div className={styles.whyCard}>
                <div className={`${styles.whyCardIcon} ${styles.save}`}>💰</div>
                <h3 className={styles.whyCardTitle}>Cheaper prices</h3>
                <p className={styles.whyCardDesc}>
                  Businesses already offer off-peak discounts. We just make them
                  easy to find. Save 20–50% on activities you already love.
                </p>
              </div>

              <div className={styles.whyCard}>
                <div className={`${styles.whyCardIcon} ${styles.crowd}`}>🧘</div>
                <h3 className={styles.whyCardTitle}>Less crowded</h3>
                <p className={styles.whyCardDesc}>
                  No queues. No waiting. No fighting for a lane, a court, or a
                  seat. Off-peak hours mean more space and more comfort.
                </p>
              </div>

              <div className={styles.whyCard}>
                <div className={`${styles.whyCardIcon} ${styles.quality}`}>✨</div>
                <h3 className={styles.whyCardTitle}>Same experience</h3>
                <p className={styles.whyCardDesc}>
                  The screen is the same size. The padel court is the same court.
                  The bowling pins don&#39;t care what time it is.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────── Example Deals ─────────── */}
        <section id="deals" className={`${styles.deals} section`}>
          <div className="container" ref={addRevealRef}>
            <div className="reveal">
              <span className={styles.dealsLabel}>✦ Example deals</span>
              <h2 className="section-title">
                What off-peak deals look like
              </h2>
              <p className="section-subtitle">
                These are illustrative examples of the kind of promotions
                you&#39;ll find on Offpeak.pt. Real deals will be added as
                businesses join.
              </p>
            </div>

            <div className={`${styles.dealsGrid} reveal`} ref={addRevealRef}>
              {DEALS.map((deal) => (
                <article key={deal.id} className={styles.dealCard}>
                  <div className={styles.dealImage}>
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      width={400}
                      height={250}
                    />
                    <span className={styles.dealBadge}>{deal.discount}</span>
                  </div>
                  <div className={styles.dealContent}>
                    <span className={styles.dealCategory}>{deal.category}</span>
                    <h3 className={styles.dealTitle}>{deal.title}</h3>
                    <div className={styles.dealMeta}>
                      <span>{deal.time}</span>
                      <span className={styles.dealMetaDot}></span>
                      <span>{deal.days}</span>
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
                <span className={styles.businessLabel}>For businesses</span>
                <h2 className={styles.businessTitle}>
                  Fill your empty hours. <br />
                  No cost, no commission.
                </h2>
                <p className={styles.businessSubtitle}>
                  You already have off-peak promotions. Let us help more people
                  find them — for free.
                </p>
              </div>

              <div className={`${styles.businessFeatures} reveal`} ref={addRevealRef}>
                <div className={styles.businessFeature}>
                  <div className={styles.businessFeatureIcon}>📅</div>
                  <div className={styles.businessFeatureText}>
                    <h4>Fill empty hours</h4>
                    <p>
                      Turn quiet mornings and weekday afternoons into revenue.
                      Reach people who are flexible with their schedule.
                    </p>
                  </div>
                </div>

                <div className={styles.businessFeature}>
                  <div className={styles.businessFeatureIcon}>📢</div>
                  <div className={styles.businessFeatureText}>
                    <h4>Promote existing discounts</h4>
                    <p>
                      You don&#39;t need to create new offers. We help you get the
                      word out about the promotions you already run.
                    </p>
                  </div>
                </div>

                <div className={styles.businessFeature}>
                  <div className={styles.businessFeatureIcon}>🤝</div>
                  <div className={styles.businessFeatureText}>
                    <h4>Free to join as an early partner</h4>
                    <p>
                      No listing fees, no commissions during our initial phase.
                      Join now and grow with us from the start.
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
                List your off-peak promotions
              </button>
            </div>

            <div className={styles.businessVisual} ref={addRevealRef}>
              <div className={`${styles.businessCard} reveal-scale`}>
                <h3 className={styles.businessCardTitle}>
                  Your off-peak potential
                </h3>
                <div className={styles.businessCardStats}>
                  <div className={styles.businessCardStat}>
                    <div className={styles.businessCardStatHeader}>
                      <span className={styles.businessCardStatLabel}>
                        Empty hours filled
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
                        New customers reached
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
                        Revenue from off-peak
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
                Be the first to know
              </h2>
              <p className={styles.signupSubtitle}>
                Get notified when new off-peak deals are available near you. No
                spam, just good deals.
              </p>
            </div>

            {submitted ? (
              <div className={`${styles.signupSuccess} reveal`}>
                <span>✓</span> You&#39;re in! We&#39;ll be in touch soon.
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
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.signupInput}
                  aria-label="Email address"
                />
                <button type="submit" disabled={isSubmittingUser} className={styles.signupBtn}>
                  {isSubmittingUser ? "Submitting..." : "Notify me"}
                </button>
              </form>
            )}

            {userError && (
              <p className={styles.modalError} style={{ marginTop: "1rem", display: "inline-block" }}>
                {userError}
              </p>
            )}

            <p className={`${styles.signupNote} reveal`} ref={addRevealRef}>
              Early access · Unsubscribe anytime
            </p>
          </div>
        </section>

        {/* ─────────── Trust Signals ─────────── */}
        <section className={`${styles.trust} section`} style={{ paddingBlock: "var(--space-2xl)" }}>
          <div className="container">
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <span className={`${styles.trustDot} ${styles.green}`}></span>
                Launching in Lisbon, Portugal
              </div>
              <div className={styles.trustItem}>
                <span className={`${styles.trustDot} ${styles.orange}`}></span>
                Early access — be first
              </div>
              <div className={styles.trustItem}>
                <span className={`${styles.trustDot} ${styles.teal}`}></span>
                Built for local businesses
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─────────── Footer ─────────── */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <span className={styles.footerCopy}>
            © 2026 Offpeak.pt · Made in Portugal
          </span>
          <div className={styles.footerLinks}>
            <a href="mailto:hello@offpeak.pt" className={styles.footerLink}>
              Contact
            </a>
            <a href="#" className={styles.footerLink}>
              Privacy
            </a>
          </div>
        </div>
      </footer>

      {/* ─────────── Business Lead Modal ─────────── */}
      <div className={`${styles.modalOverlay} ${isBusinessModalOpen ? styles.open : ""}`}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>List your business</h3>
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
              <h4 className={styles.modalSuccessTitle}>Listing request sent!</h4>
              <p className={styles.modalSuccessText}>
                Thank you for your interest. We will get in touch with you shortly to list your promotions.
              </p>
              <button
                onClick={() => setIsBusinessModalOpen(false)}
                className="btn btn-secondary"
                style={{ marginTop: "1rem" }}
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleBusinessSubmit} className={styles.modalForm}>
              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="biz-name">Business Name</label>
                <input
                  id="biz-name"
                  type="text"
                  required
                  placeholder="e.g. Lisbon Padel Club"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className={styles.modalInput}
                  disabled={isSubmittingBusiness}
                />
              </div>

              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="contact-name">Contact Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className={styles.modalInput}
                  disabled={isSubmittingBusiness}
                />
              </div>

              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="biz-email">Contact Email</label>
                <input
                  id="biz-email"
                  type="email"
                  required
                  placeholder="name@business.com"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className={styles.modalInput}
                  disabled={isSubmittingBusiness}
                />
              </div>

              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="activity-type">Activity Type</label>
                <select
                  id="activity-type"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className={styles.modalSelect}
                  disabled={isSubmittingBusiness}
                >
                  <option value="padel">Padel</option>
                  <option value="bowling">Bowling</option>
                  <option value="cinema">Cinema</option>
                  <option value="gym">Gym / Fitness</option>
                  <option value="spa">Spa / Wellness</option>
                  <option value="other">Other Leisure Experience</option>
                </select>
              </div>

              <div className={styles.modalGroup}>
                <label className={styles.modalLabel} htmlFor="biz-msg">Message (Optional)</label>
                <textarea
                  id="biz-msg"
                  placeholder="Tell us about your off-peak capacity..."
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
                {isSubmittingBusiness ? "Sending Request..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
