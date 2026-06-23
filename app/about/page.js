import Link from "next/link";

export const metadata = {
  title: "Sobre Nós | Offpeak.pt",
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
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
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
    margin: "0 0 16px",
  },
  lead: {
    margin: "0 0 28px",
    color: "#374151",
    lineHeight: 1.75,
  },
  section: {
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: "1px solid #f3f4f6",
  },
  h2: {
    fontSize: "1.15rem",
    margin: "0 0 10px",
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

export default function AboutPage() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <Link href="/" style={styles.brand} aria-label="Ir para a página inicial">
            <span>offpeak<span style={{display:'inline-block',width:'0.5rem',height:'0.5rem',borderRadius:'50%',background:'#22c55e',marginLeft:'0.05rem'}}></span>pt</span>
          </Link>
          <Link href="/" style={styles.backLink} aria-label="Voltar à página inicial">
            ← Voltar
          </Link>
        </header>

        <h1 style={styles.title}>Sobre a Offpeak</h1>
        <p style={styles.lead}>
          A Offpeak é uma startup baseada em Lisboa que está a construir uma
          plataforma para ligar pessoas com horários flexíveis a espaços de lazer
          durante as suas horas mais calmas. Nascemos da observação de que campos
          de padel, pistas de bowling, cinemas e spas ficam muitas vezes vazios
          durante as manhãs e tardes dos dias úteis, mas continuam a cobrar o preço
          total ao fim do dia.
        </p>

        <section style={styles.section}>
          <h2 style={styles.h2}>A nossa história</h2>
          <p style={styles.p}>
            Queremos tornar mais fácil descobrir boas experiências de lazer quando
            há mais disponibilidade, melhor serviço e preços mais baixos.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>A nossa missão</h2>
          <p style={styles.p}>
            Acreditamos que o lazer não devia custar mais só porque todos querem o
            mesmo horário.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>O que fazemos</h2>
          <p style={styles.p}>
            Ligamos consumidores a descontos off-peak, com poupanças que podem ir
            até 50%, em parceiros de Lisboa.
          </p>
          <p style={styles.p}>
            Estamos atualmente em fase de early access / pré-lançamento, com uma
            seleção inicial de parceiros e mais funcionalidades a caminho.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Equipa</h2>
          <p style={styles.p}>Equipa fundadora baseada em Lisboa.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>Contacto</h2>
          <p style={styles.p}>
            Se quiser falar connosco, escreva para <a href="mailto:info@offpeak.pt">info@offpeak.pt</a>.
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
