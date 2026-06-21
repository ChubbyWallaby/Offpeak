import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getDeals() {
  const filePath = path.join(process.cwd(), "app", "deals.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function generateStaticParams() {
  const deals = await getDeals();
  return deals.map((deal) => ({ slug: deal.slug }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const deals = await getDeals();
  const deal = deals.find((d) => d.slug === params.slug);
  if (!deal) return { title: "Oferta não encontrada | Offpeak.pt" };
  return {
    title: `${deal.title.pt} | Offpeak.pt`,
    description: deal.description?.pt ?? `${deal.baseDiscountPercent}% de desconto em horários off-peak.`,
  };
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111827",
  },
  container: {
    maxWidth: "720px",
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
    borderBottom: "1px solid #e5e7eb",
  },
  brand: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "1.05rem",
  },
  logo: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "#111827",
    color: "#ffffff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.95rem",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: "#6b7280",
    textDecoration: "none",
    fontSize: "0.95rem",
    marginBottom: "20px",
  },
  heroWrapper: {
    position: "relative",
    marginBottom: "28px",
  },
  heroImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "12px",
    display: "block",
  },
  partnerBadge: {
    position: "absolute",
    top: "14px",
    left: "14px",
    background: "#059669",
    color: "#ffffff",
    fontSize: "0.78rem",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "20px",
    letterSpacing: "0.03em",
  },
  titleRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.2,
    margin: 0,
    flex: 1,
    minWidth: "200px",
  },
  discountBadge: {
    background: "#d1fae5",
    color: "#059669",
    fontWeight: 700,
    fontSize: "1rem",
    padding: "6px 14px",
    borderRadius: "20px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "28px",
    alignItems: "center",
  },
  categoryBadge: {
    background: "#f3f4f6",
    color: "#374151",
    fontSize: "0.85rem",
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: "20px",
  },
  scheduleChip: {
    background: "#eff6ff",
    color: "#1d4ed8",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "4px 12px",
    borderRadius: "20px",
  },
  section: {
    marginBottom: "28px",
    paddingBottom: "24px",
    borderBottom: "1px solid #f3f4f6",
  },
  sectionLast: {
    marginBottom: "28px",
  },
  sectionHeading: {
    fontSize: "1.1rem",
    fontWeight: 700,
    margin: "0 0 10px",
    color: "#111827",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  sectionText: {
    margin: 0,
    lineHeight: 1.75,
    color: "#374151",
    fontSize: "0.97rem",
  },
  termsBox: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "16px 18px",
  },
  termsText: {
    margin: 0,
    lineHeight: 1.7,
    color: "#6b7280",
    fontSize: "0.9rem",
  },
  mapFrame: {
    width: "100%",
    height: "300px",
    borderRadius: "12px",
    border: "none",
    display: "block",
  },
  ctaButton: {
    display: "block",
    width: "100%",
    padding: "16px",
    background: "#059669",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "1.05rem",
    textAlign: "center",
    borderRadius: "12px",
    textDecoration: "none",
    marginTop: "12px",
    letterSpacing: "0.01em",
  },
};

export default async function DealPage(props) {
  const params = await props.params;
  const deals = await getDeals();
  const deal = deals.find((d) => d.slug === params.slug);

  if (!deal) notFound();

  const hasMap = deal.lat && deal.lng;
  const mapUrl = hasMap
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${deal.lng - 0.005},${deal.lat - 0.003},${deal.lng + 0.005},${deal.lat + 0.003}&layer=mapnik&marker=${deal.lat},${deal.lng}`
    : null;

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <Link href="/" style={styles.brand} aria-label="Voltar à página inicial da Offpeak.pt">
            <span style={styles.logo}>O</span>
            <span>Offpeak.pt</span>
          </Link>
        </header>

        <Link href="/" style={styles.backLink}>
          ← Voltar às ofertas
        </Link>

        <div style={styles.heroWrapper}>
          <img
            src={deal.image}
            alt={deal.title.pt}
            style={styles.heroImage}
          />
          {deal.isPartner && (
            <span style={styles.partnerBadge}>Parceiro Oficial</span>
          )}
        </div>

        <div style={styles.titleRow}>
          <h1 style={styles.title}>{deal.title.pt}</h1>
          <span style={styles.discountBadge}>
            {deal.baseDiscountPercent}% desc.
          </span>
        </div>

        <div style={styles.metaRow}>
          <span style={styles.categoryBadge}>{deal.category.pt}</span>
          {deal.timeSlot?.pt && deal.days?.pt && (
            <span style={styles.scheduleChip}>
              {deal.timeSlot.pt} · {deal.days.pt}
            </span>
          )}
        </div>

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

        <Link href="/" style={styles.ctaButton}>
          Reservar com Desconto
        </Link>
      </div>
    </main>
  );
}
