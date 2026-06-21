# Offpeak.pt — Improvement Plan

## Phase 0: Critical Fixes (Day 1-2)

### Security

- [ ] Move Resend API key from `actions.js` to environment variable (`RESEND_API_KEY`)
- [ ] Remove hardcoded personal email (`brunomvaraujo1997@gmail.com`) from `deals.json` and `actions.js` — use `hello@offpeak.pt` for all internal routing
- [ ] Rotate the exposed API key (current key is compromised since it's in git history)
- [ ] Add `.env.local` to `.gitignore` if not already present

### Legal Compliance (Portugal-Specific)

- [ ] Add Privacy Policy page (`/privacy`) — currently links to `href="#"` (broken)
- [ ] Add Terms of Service page (`/terms`)
- [ ] Add cookie consent banner (RGPD-compliant: reject button must be equally visible as accept)
- [ ] Add **Livro de Reclamacoes** link in footer (mandatory under Decreto-Lei 74/2017) — link to `livroreclamacoes.pt`
- [ ] Display company NIF (tax ID) in footer
- [ ] Display physical registered address in footer
- [ ] Display company registration number in footer

### Broken Functionality

- [ ] Fix mobile hamburger menu — currently toggles `mobileOpen` state but renders no drawer/menu
- [ ] Remove fake "142 ofertas ativas" claim — replace with real count ("6 parceiros e a crescer") or remove entirely
- [ ] Fix Ubbo Bowling deal image — currently uses `/hero-padel.png` (a padel court photo for a bowling venue)

---

## Phase 1: Copy & CTA Overhaul (Week 1)

### Tu/Voce Consistency

- [ ] Audit all Portuguese copy for register consistency
- [ ] Standardize on implicit 3rd-person verb forms (Portuguese web standard): "Pode explorar..." not "Voce pode..." or "Tu podes..."
- [ ] Fix hero subtitle: "Aproveite" (voce) → align with chosen register
- [ ] Fix How It Works section: "Descobre... Explora... diverte-te" (tu) → align with chosen register
- [ ] Fix Business section: "Rentabilize as suas horas" (voce) → align with chosen register

### Hero Section Rewrite

- [ ] Replace badge "O segredo mais bem guardado de Lisboa" → something that doesn't contradict mass-market goals (e.g., "Novo em Lisboa" or "Os lisboetas ja estao a poupar")
- [ ] Rewrite subtitle from generic "plataforma de descoberta para as horas calmas" → concrete benefit copy: "Padel, bowling, spa e cinema — tudo com ate 50% de desconto nas horas em que ninguem vai."
- [ ] Replace fake live status "142 ofertas ativas" → honest metric (real waitlist count or real partner count)

### CTA Improvements

| Location | Current | New | Rationale |
|---|---|---|---|
| Hero button | "Aderir ao Clube" | "Ver Ofertas em Lisboa" | Benefit-first, zero commitment |
| Nav bar | "Acesso antecipado" | "Registar Gratis" | Clear, signals no cost |
| Deal cards | "Simular Reserva" | "Reservar" or "Ver Detalhes" | Remove "simulation" language |
| Bottom signup | "Notificar-me" | "Quero Receber Ofertas" | Active voice, benefit-clear |
| Business section | "Divulgar promocoes do meu negocio" | Keep (already good) or shorten for mobile: "Registar o Meu Negocio" | — |

### Reassurance Lines (Add Below CTAs)

- [ ] Below hero CTA: "Sem pagamento. Cancele quando quiser."
- [ ] Below signup form: "Sem spam — apenas boas ofertas perto de si."
- [ ] Below business CTA: "Sem taxas. Sem compromisso. Ativo em 24h."

### English Copy Polish

- [ ] Rewrite hero subtitle: "Discovery platform for the city's quiet hours" → "50% off padel, bowling and spas — available right now while everyone else is at the office."
- [ ] Review all English translations for natural, conversational tone
- [ ] Ensure CTAs match the Portuguese improvements in spirit

---

## Phase 2: Trust & Social Proof (Week 2)

### Founder/Team Credibility

- [ ] Add "About" section or page with founder photo, name, and background
- [ ] Include brief founder story — why off-peak, what problem being solved
- [ ] Add LinkedIn link(s) for team credibility

### Social Proof Elements

- [ ] Add real waitlist/signup counter below hero CTA: "Junte-se a X lisboetas" (real number, even if small)
- [ ] Add partner logos strip (Lisboa Padel Club logo, Ubbo Bowling logo) — not just text badges
- [ ] Replace fabricated statistics (+68%, +45%, +32%) with either real data, qualified projections ("potencial estimado"), or remove entirely
- [ ] Add at least 1 real partner testimonial/quote (even a one-liner from Lisboa Padel Club)
- [ ] Place social proof near the CTA (above fold), not isolated at bottom

### Trust Signals (Portugal-Specific)

- [ ] Add payment method icons in footer/booking area: MB Way, Multibanco, Visa (in that priority order)
- [ ] Add "Confio.pt" badge application (estimated +15-25% conversion)
- [ ] Add social media links: Instagram (minimum), Facebook (critical for Portuguese market), LinkedIn
- [ ] Consider adding "Feito em Portugal" or "Empresa portuguesa" badge more prominently

---

## Phase 3: Technical & SEO Fixes (Week 2-3)

### SSR & Performance

- [ ] Convert `page.js` from full `"use client"` to a hybrid approach — extract static sections (hero, how-it-works, for-business, footer) into server components
- [ ] Move structured data (JSON-LD) to server-rendered `layout.js` or `page.js` metadata export
- [ ] Ensure deals section can be server-rendered with client interactivity only where needed

### Language/i18n

- [ ] Implement URL-based language switching (`/en` route or `?lang=en` consumed server-side)
- [ ] Ensure `hreflang` tags point to properly indexed alternate URLs
- [ ] Make language preference persist (cookie or URL) so shared links open in correct language

### SEO Infrastructure

- [ ] Expand sitemap.js beyond single URL — include `/privacy`, `/terms`, `/para-negocios`, future deal pages
- [ ] Create individual deal pages (`/deals/[slug]`) for each partner — each page is a new SEO surface
- [ ] Create category landing pages (`/padel`, `/bowling`, `/wellness`) for keyword targeting
- [ ] Create neighborhood pages (`/alcantara`, `/sintra`) for local SEO
- [ ] Add blog infrastructure (`/blog`) for content marketing
- [ ] Register on Portuguese directories: Paginas Amarelas, Portugálio, Cylex, Empresas.pt (identical NAP data)
- [ ] Claim and optimize Google Business Profile for "Activities Off-Peak Lisboa"
- [ ] Add `Event` schema markup for time-slot deals (helps AI Overviews extraction)

### Technical Debt

- [ ] Remove client-side fake traffic simulation (lines 186-208 in page.js) — damages trust if discovered
- [ ] Add proper error boundaries
- [ ] Add loading/skeleton states for deal cards
- [ ] Add proper 404 page (currently uses Next.js default)
- [ ] Set up proper analytics: Google Analytics 4 + Facebook Pixel (critical for Portuguese market)
- [ ] Add conversion tracking for email signups and business lead submissions

---

## Phase 4: Information Architecture & Pages (Week 3-4)

### New Pages Required

- [ ] `/privacy` — Privacy Policy (legal requirement)
- [ ] `/terms` — Terms of Service (legal requirement)
- [ ] `/about` — Team, story, mission, contact info
- [ ] `/para-negocios` — Dedicated B2B landing page (separate from consumer journey)
- [ ] `/faq` — Frequently asked questions ("Is it really 50% off?", "How do I cancel?", "What if the venue is full?")
- [ ] `/contact` — Dedicated contact page with form + email + social links
- [ ] `/deals/[slug]` — Individual deal detail pages (photos, map, hours, reviews placeholder, T&C)

### Navigation Restructure

- [ ] Add working mobile menu with full navigation links
- [ ] Add footer navigation: About, FAQ, Contact, Terms, Privacy, Livro de Reclamacoes, Social links
- [ ] Consider adding category filter tabs above deal cards
- [ ] Add breadcrumbs on sub-pages for SEO

### Dual-Sided Routing

- [ ] Separate consumer and business messaging — main page is 100% consumer-focused
- [ ] Move business pitch to dedicated `/para-negocios` page
- [ ] Add subtle above-fold routing: "E proprietario de um negocio?" link on main page
- [ ] Tailor B2B page with: case study, ROI calculator, partner onboarding steps, dedicated CTA

---

## Phase 5: Feature Development (Month 2)

### Booking Flow (MVP)

- [ ] Replace "Simular Reserva" with intent-capture flow: click → email capture → manual partner coordination
- [ ] Or: Redirect to WhatsApp/phone with pre-filled message for the specific deal
- [ ] Add "Reserve Agora, Pague Depois" option when payment is ready (tested pattern in Portugal)
- [ ] Show transparent cancellation policy: "Cancelamento gratis ate X dias antes"

### User Accounts

- [ ] Email-based registration (progressive — signup via deal interest, not separate flow)
- [ ] Save favorites / wishlist
- [ ] Booking history
- [ ] Notification preferences (email frequency, push, WhatsApp)

### Map & Location

- [ ] Add map view showing deal locations (Mapbox or Google Maps)
- [ ] "Deals near me" geolocation feature
- [ ] Neighborhood/area filtering

### Payment Integration

- [ ] MB Way integration (45% of Portuguese online transactions — non-negotiable)
- [ ] Multibanco reference payment (25% market share)
- [ ] Visa/Mastercard with 3DS2 (PSD2 compliance)
- [ ] Apple Pay / Google Pay (convenience layer)

---

## Phase 6: Growth & Retention (Month 3+)

### Content Marketing

- [ ] Launch blog with SEO-targeted posts: "Melhores campos de padel em Lisboa", "O que fazer em Lisboa a tarde", "Guia off-peak Lisboa"
- [ ] Publish 2-4 posts/month targeting long-tail keywords
- [ ] Create "Lisboa Off-Peak Guide" as lead magnet

### Social Media

- [ ] Launch Instagram account (lifestyle/leisure brand presence)
- [ ] Launch Facebook page (critical for Portuguese deal distribution)
- [ ] Consider TikTok for younger audience
- [ ] Run Facebook carousel ads: "Experiencias baratas esta semana"
- [ ] Use Facebook Messenger for customer support (high usage in Portugal)

### Retention Mechanics

- [ ] Referral program: "Convida um amigo, ambos ganham 10% extra"
- [ ] Loyalty/rewards program (gamification for repeat usage)
- [ ] Push notifications for new deals in user's preferred categories
- [ ] WhatsApp alerts (high engagement in Portuguese market)
- [ ] Weekly email digest with personalized deal recommendations

### Marketplace Growth

- [ ] Partner success stories / case studies (video if possible)
- [ ] Automated partner onboarding flow
- [ ] Partner dashboard improvements (real-time analytics, slot management)
- [ ] Multi-city expansion teaser: "Porto em breve"
- [ ] Gift cards / vouchers (revenue driver + user acquisition)
- [ ] Reviews & ratings system (user-generated social proof)
- [ ] Real-time slot availability from partner systems
- [ ] Calendar view for browsing deals by date

### Urgency & Scarcity (Honest)

- [ ] Countdown timers on time-limited deals
- [ ] "Apenas X slots disponiveis" with real availability data
- [ ] "X pessoas a ver este deal" (only if real)
- [ ] "Deal expira em Xh" for genuinely time-bound offers
- [ ] Price history: "Preco mais baixo dos ultimos 30 dias" (builds trust with skeptical Portuguese consumers)

---

## Success Metrics by Phase

| Phase | Metric | Target |
|---|---|---|
| Phase 0 | Security incidents | 0 |
| Phase 0 | Legal compliance | 100% (no fines risk) |
| Phase 1 | Hero-to-signup conversion | +5-8% lift |
| Phase 2 | Bounce rate | -10-15% reduction |
| Phase 3 | Organic search impressions | +50% in 30 days |
| Phase 4 | Pages indexed by Google | 10+ (from current 1) |
| Phase 5 | Booking intent captures | 50+/week |
| Phase 6 | Monthly active users | 500+ |

---

## Key Principles

1. **Honesty over inflation** — Portuguese consumers are the most deal-skeptical in Europe (36% trust promotions). Transparency is the only currency that works.
2. **Benefit-first CTAs** — Every button answers "What do I get?" not "What do I do?"
3. **Local trust signals** — MB Way, Livro de Reclamacoes, NIF, Confio.pt badge matter more than generic security badges.
4. **One audience per page** — Consumer journey and business pitch must be separated.
5. **Real > simulated** — Remove all fake metrics, simulated traffic, and "simulate booking" language. Even honest small numbers outperform inflated fake ones.
