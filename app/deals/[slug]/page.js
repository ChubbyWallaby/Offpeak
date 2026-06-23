import Link from "next/link";
import { notFound } from "next/navigation";
import { calculateDiscountPercent } from "../../pricing";
import BookingButton from "../../components/BookingButton";
import { getDeals } from "../../actions";

async function fetchDeals() {
  const res = await getDeals();
  return res.success ? res.deals : [];
}

export async function generateStaticParams() {
  const deals = await fetchDeals();
  return deals.map((deal) => ({ slug: deal.slug }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const deals = await fetchDeals();
  const deal = deals.find((d) => d.slug === params.slug);
  if (!deal) return { title: "Oferta não encontrada | Offpeak.pt" };

  const location = deal.location || "";
  const category = deal.category?.pt || "";
  const discount = deal.baseDiscountPercent || "";

  const title = location
    ? `${category} em ${location} com ${discount}% desconto | Offpeak.pt`
    : `${deal.title.pt} | Offpeak.pt`;

  const description = location
    ? `${deal.title.pt} — até ${discount}% de desconto em horários off-peak em ${location}. ${deal.description?.pt || "Reserve agora na Offpeak.pt."}`
    : deal.description?.pt || `${discount}% de desconto em horários off-peak.`;

  return {
    title,
    description,
    keywords: [
      category.toLowerCase(),
      location.toLowerCase(),
      `${category.toLowerCase()} ${location.toLowerCase()}`,
      `${category.toLowerCase()} barato`,
      `desconto ${category.toLowerCase()}`,
      "offpeak",
      "horários off-peak",
    ].filter(Boolean),
    alternates: {
      canonical: `https://offpeak.pt/deals/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_PT",
      siteName: "Offpeak.pt",
      url: `https://offpeak.pt/deals/${params.slug}`,
      images: deal.image ? [{ url: `https://offpeak.pt${deal.image}`, width: 800, height: 600, alt: deal.title.pt }] : [],
    },
  };
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#1e2235",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "24px 20px 64px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    paddingBottom: "20px",
    marginBottom: "28px",
    borderBottom: "1px solid #e2e4ea",
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    color: "#1e2235",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "1.05rem",
  },
  hero: {
    display: "flex",
    gap: "28px",
    alignItems: "flex-start",
    marginBottom: "32px",
  },
  heroImageCol: {
    position: "relative",
    flex: "0 0 320px",
    maxWidth: "320px",
    borderRadius: "14px",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
  },
  partnerBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "#22c55e",
    color: "#ffffff",
    fontSize: "0.75rem",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "6px",
    letterSpacing: "0.02em",
  },
  heroInfo: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 800,
    lineHeight: 1.2,
    margin: "0 0 12px",
    letterSpacing: "-0.5px",
  },
  discountBadge: {
    display: "inline-block",
    background: "#f0fdf4",
    color: "#22c55e",
    border: "1px solid #bbf7d0",
    fontSize: "0.85rem",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "6px",
    marginBottom: "14px",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  categoryBadge: {
    background: "#eef0f5",
    color: "#5e6478",
    fontSize: "0.8rem",
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: "6px",
  },
  scheduleChip: {
    color: "#5e6478",
    fontSize: "0.85rem",
  },
  sectionHeading: {
    fontSize: "1.1rem",
    fontWeight: 700,
    margin: "0 0 10px",
    color: "#1e2235",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  sectionText: {
    margin: 0,
    lineHeight: 1.75,
    color: "#5e6478",
    fontSize: "0.97rem",
  },
  termsBox: {
    background: "#f8f9fc",
    border: "1px solid #e2e4ea",
    borderRadius: "10px",
    padding: "16px 18px",
  },
  termsText: {
    margin: 0,
    lineHeight: 1.7,
    color: "#8b8f9e",
    fontSize: "0.9rem",
  },
  mapFrame: {
    width: "100%",
    height: "300px",
    borderRadius: "12px",
    border: "none",
    display: "block",
  },
  priceCard: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "12px",
    padding: "16px 20px",
  },
  priceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "12px",
    flexWrap: "wrap",
  },
  priceOriginal: {
    fontSize: "1.1rem",
    color: "#9ca3af",
    textDecoration: "line-through",
  },
  priceCurrent: {
    fontSize: "1.8rem",
    fontWeight: 800,
    color: "#22c55e",
  },
  priceSavings: {
    fontSize: "0.82rem",
    color: "#22c55e",
    fontWeight: 600,
    marginTop: "4px",
  },
  section: {
    marginBottom: "24px",
  },
  sectionLast: {
    marginBottom: "24px",
  },
};

export default async function DealPage(props) {
  const params = await props.params;
  const deals = await fetchDeals();
  const deal = deals.find((d) => d.slug === params.slug);

  if (!deal) notFound();

  const hasMap = deal.lat && deal.lng;
  const mapUrl = hasMap
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${deal.lng - 0.005},${deal.lat - 0.003},${deal.lng + 0.005},${deal.lat + 0.003}&layer=mapnik&marker=${deal.lat},${deal.lng}`
    : null;

  const discountPercent = calculateDiscountPercent(deal);
  const hasPrice = typeof deal.price === "number" && deal.price > 0 && discountPercent !== null;
  const discountedPrice = hasPrice ? deal.price * (1 - discountPercent / 100) : null;
  const savings = hasPrice ? deal.price - discountedPrice : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: deal.title.pt,
    description: deal.description?.pt || "",
    image: deal.image ? `https://offpeak.pt${deal.image}` : undefined,
    url: `https://offpeak.pt/deals/${deal.slug}`,
    ...(deal.address?.pt && {
      address: {
        "@type": "PostalAddress",
        streetAddress: deal.address.pt,
        addressLocality: deal.location || "",
        addressCountry: "PT",
      },
    }),
    ...(deal.lat && deal.lng && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: deal.lat,
        longitude: deal.lng,
      },
    }),
    ...(hasPrice && {
      makesOffer: {
        "@type": "Offer",
        name: deal.title.pt,
        price: discountedPrice.toFixed(2),
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        priceValidUntil: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
        ...(deal.price && {
          priceSpecification: {
            "@type": "PriceSpecification",
            price: deal.price.toFixed(2),
            priceCurrency: "EUR",
            valueAddedTaxIncluded: true,
          },
        }),
      },
    }),
  };

  return (
    <main style={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={styles.container}>
        <header style={styles.header}>
          <Link href="/" style={styles.brand} aria-label="Voltar à página inicial da Offpeak.pt">
            <span>offpeak<span style={{display:'inline-block',width:'0.5rem',height:'0.5rem',borderRadius:'50%',background:'#22c55e',marginLeft:'0.05rem'}}></span>pt</span>
          </Link>
        </header>

        <Link href="/" style={{ color: "#5e6478", fontSize: "0.9rem", textDecoration: "none", display: "inline-block", marginBottom: "24px" }}>
          ← Voltar às ofertas
        </Link>

        <div style={styles.hero} data-hero="">
          <div style={styles.heroImageCol} data-hero-img="">
            <img
              src={deal.image}
              alt={deal.title.pt}
              style={styles.heroImage}
            />
            {deal.isPartner && (
              <span style={styles.partnerBadge}>Parceiro Oficial</span>
            )}
          </div>

          <div style={styles.heroInfo}>
            <h1 style={styles.title}>{deal.title.pt}</h1>
            <span style={styles.discountBadge}>
              {discountPercent ?? deal.baseDiscountPercent}% desc.
            </span>

            <div style={styles.metaRow}>
              <span style={styles.categoryBadge}>{deal.category.pt}</span>
              {deal.timeSlot?.pt && deal.days?.pt && (
                <span style={styles.scheduleChip}>
                  {deal.timeSlot.pt} · {deal.days.pt}
                </span>
              )}
            </div>

            {hasPrice && (
              <div style={styles.priceCard}>
                <div style={styles.priceRow}>
                  <span style={styles.priceOriginal}>€{deal.price.toFixed(2)}</span>
                  <span style={styles.priceCurrent}>€{discountedPrice.toFixed(2)}</span>
                </div>
                <p style={styles.priceSavings}>
                  Poupa €{savings.toFixed(2)} ({discountPercent}% de desconto)
                </p>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            [data-hero] {
              flex-direction: column !important;
            }
            [data-hero-img] {
              flex: unset !important;
              max-width: 100% !important;
            }
          }
        `}</style>

        {deal.description?.pt && (
          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>Sobre a oferta</h2>
            <p style={styles.sectionText}>{deal.description.pt}</p>
          </section>
        )}

        {deal.hours?.pt && (
          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>
              <span aria-hidden="true">🕐</span> Horário de funcionamento
            </h2>
            <p style={styles.sectionText}>{deal.hours.pt}</p>
          </section>
        )}

        {deal.address?.pt && (
          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>
              <span aria-hidden="true">📍</span> Morada
            </h2>
            <p style={styles.sectionText}>{deal.address.pt}</p>
          </section>
        )}

        {hasMap && (
          <section style={styles.section}>
            <h2 style={styles.sectionHeading}>Localização</h2>
            <iframe
              src={mapUrl}
              style={styles.mapFrame}
              title={`Mapa — ${deal.title.pt}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </section>
        )}

        {deal.terms?.pt && (
          <section style={styles.sectionLast}>
            <h2 style={styles.sectionHeading}>Termos e condições</h2>
            <div style={styles.termsBox}>
              <p style={styles.termsText}>{deal.terms.pt}</p>
            </div>
          </section>
        )}

        <BookingButton deal={deal} />
      </div>
    </main>
  );
}
