import Link from "next/link";

export const metadata = {
  title: "Contacto | Offpeak.pt",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#111827",
  },
  container: {
    maxWidth: "920px",
    margin: "0 auto",
    padding: "24px 20px 56px",
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
    color: "#111827",
    textDecoration: "none",
    fontWeight: 700,
  },
  backLink: {
    color: "#111827",
    textDecoration: "none",
    fontWeight: 600,
  },
  title: {
    fontSize: "2rem",
    lineHeight: 1.15,
    margin: "0 0 20px",
  },
  card: {
    padding: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    background: "#f9fafb",
    marginBottom: "18px",
  },
  h2: {
    margin: "0 0 10px",
    fontSize: "1.1rem",
  },
  p: {
    margin: "0 0 10px",
    lineHeight: 1.75,
    color: "#374151",
  },
  footer: {
    marginTop: "32px",
    paddingTop: "20px",
    borderTop: "1px solid #e5e7eb",
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: 1.7,
  },
  footerLink: {
    color: "#111827",
    textDecoration: "none",
  },
};

export default function ContactPage() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <Link href="/" style={styles.brand} aria-label="Ir para a página inicial">
            offpeak.pt
          </Link>
          <Link href="/" style={styles.backLink} aria-label="Voltar à página inicial">
            ← Voltar
          </Link>
        </header>

        <h1 style={styles.title}>Contacte-nos</h1>

        <section style={styles.card}>
          <h2 style={styles.h2}>Email</h2>
          <p style={styles.p}>
            <a href="mailto:info@offpeak.pt">info@offpeak.pt</a>
          </p>
          <p style={styles.p}>Respondemos em 24-48 horas úteis.</p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>Localização</h2>
          <p style={styles.p}>Lisboa, Portugal</p>
        </section>

        <section style={styles.card}>
          <h2 style={styles.h2}>Negócios parceiros</h2>
          <p style={styles.p}>
            Quer listar o seu negócio? Visite a nossa página principal.
          </p>
          <p style={styles.p}>
            <Link href="/">Ir para a página principal</Link>
          </p>
          <p style={styles.p}>
            Livro de Reclamações: <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noreferrer">https://www.livroreclamacoes.pt</a>
          </p>
        </section>

        <footer style={styles.footer}>
          © 2026 Offpeak.pt · Feito em Portugal |{" "}
          <Link href="/privacy" style={styles.footerLink}>
            Privacidade
          </Link>{" "}|{" "}
          <Link href="/terms" style={styles.footerLink}>
            Termos
          </Link>{" "}|{" "}
          <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noreferrer" style={styles.footerLink}>
            Livro de Reclamações
          </a>
        </footer>
      </div>
    </main>
  );
}
