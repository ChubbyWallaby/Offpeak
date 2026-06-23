import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade | Offpeak.pt",
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
  title: {
    fontSize: "2rem",
    lineHeight: 1.15,
    margin: "0 0 12px",
  },
  intro: {
    margin: "0 0 28px",
    color: "#374151",
    lineHeight: 1.7,
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
  list: {
    margin: "10px 0 0 20px",
    padding: 0,
    color: "#374151",
    lineHeight: 1.75,
  },
  footer: {
    marginTop: "32px",
    paddingTop: "20px",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#6b7280",
    fontSize: "0.95rem",
  },
  link: {
    color: "#111827",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },
};

export default function PrivacyPage() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <Link href="/" style={styles.brand} aria-label="Voltar à página inicial da Offpeak.pt">
            <span>offpeak<span style={{display:'inline-block',width:'0.5rem',height:'0.5rem',borderRadius:'50%',background:'#22c55e',marginLeft:'0.05rem'}}></span>pt</span>
          </Link>
        </header>

        <h1 style={styles.title}>Política de Privacidade</h1>
        <p style={styles.intro}>
          Esta Política de Privacidade explica como a Offpeak.pt trata os dados pessoais dos utilizadores,
          em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a legislação aplicável
          em Portugal.
        </p>

        <section style={styles.section}>
          <h2 style={styles.h2}>1. Responsável pelo tratamento</h2>
          <p style={styles.p}>
            O responsável pelo tratamento dos seus dados pessoais é a entidade que opera a plataforma Offpeak.pt.
            Para efeitos de privacidade, pode contactar-nos em <a href="mailto:info@offpeak.pt">info@offpeak.pt</a>.
          </p>
          <p style={styles.p}>
            Contacto para questões de privacidade: <a href="mailto:info@offpeak.pt">info@offpeak.pt</a>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>2. Dados pessoais recolhidos</h2>
          <p style={styles.p}>Podemos recolher, consoante a interação com o site, os seguintes dados:</p>
          <ul style={styles.list}>
            <li>Endereço de e-mail, através de formulários de inscrição e subscrição;</li>
            <li>Dados de leads empresariais, como nome, e-mail, nome da empresa e tipo de actividade;</li>
            <li>Informações técnicas limitadas associadas ao funcionamento do site e métricas de utilização.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>3. Finalidade do tratamento</h2>
          <p style={styles.p}>Os dados pessoais são tratados para as seguintes finalidades:</p>
          <ul style={styles.list}>
            <li>Envio de notificações e comunicações da newsletter;</li>
            <li>Gestão de pedidos de contacto e oportunidades de parceria comercial;</li>
            <li>Resposta a contactos e acompanhamento de propostas de colaboração;</li>
            <li>Melhoria da experiência de utilização e análise agregada de desempenho do site.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>4. Base legal</h2>
          <p style={styles.p}>
            O tratamento dos dados pessoais baseia-se no <strong>consentimento do utilizador</strong>,
            prestado de forma livre, específica, informada e explícita através dos formulários disponíveis no site.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>5. Período de conservação</h2>
          <p style={styles.p}>
            Conservamos os dados apenas pelo período necessário para cumprir as finalidades para as quais foram
            recolhidos, ou até que o titular retire o consentimento, sem prejuízo de obrigações legais de retenção
            aplicáveis.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>6. Direitos do titular dos dados</h2>
          <p style={styles.p}>
            Nos termos da legislação aplicável, pode exercer os direitos de <strong>acesso</strong>,
            <strong> retificação</strong>, <strong>apagamento</strong>, <strong>portabilidade</strong> e
            <strong> oposição</strong>, bem como retirar o consentimento a qualquer momento.
          </p>
          <p style={styles.p}>
            Para exercer estes direitos, contacte-nos através de <a href="mailto:info@offpeak.pt">info@offpeak.pt</a>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>7. Contacto da autoridade de controlo</h2>
          <p style={styles.p}>
            Caso considere que o tratamento dos seus dados não está em conformidade com a legislação aplicável,
            pode apresentar reclamação junto da <strong>CNPD — Comissão Nacional de Proteção de Dados</strong>.
          </p>
          <p style={styles.p}>
            Website: <a href="https://www.cnpd.pt" target="_blank" rel="noreferrer">www.cnpd.pt</a>
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>8. Cookies e tecnologias de análise</h2>
          <p style={styles.p}>
            O site utiliza cookies e tecnologias semelhantes estritamente necessárias ao seu funcionamento,
            bem como <strong>Vercel Analytics</strong> para análise estatística agregada e melhoria do serviço.
            Sempre que aplicável, estas tecnologias são usadas com respeito pelas preferências do utilizador e
            com minimização de dados.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>9. Transferências internacionais</h2>
          <p style={styles.p}>
            Alguns serviços usados pela Offpeak.pt podem implicar transferências internacionais de dados para os
            Estados Unidos, nomeadamente <strong>Resend</strong> para envio de e-mails e <strong>Vercel</strong>
            para alojamento e infraestrutura.
          </p>
          <p style={styles.p}>
            Sempre que tal aconteça, a transferência é enquadrada por mecanismos legais adequados,
            incluindo as <strong>Cláusulas Contratuais-Tipo (SCCs)</strong> aprovadas pela Comissão Europeia,
            quando aplicável.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>10. Alterações a esta política</h2>
          <p style={styles.p}>
            A presente Política de Privacidade pode ser actualizada sempre que necessário. A versão em vigor será
            publicada nesta página.
          </p>
        </section>

        <p style={styles.p}>
          <Link href="/" style={styles.link}>← Voltar à página inicial</Link>
        </p>

        <footer style={styles.footer}>
          <span>© 2026 Offpeak.pt · Feito em Portugal</span>
          <a
            href="https://www.livroreclamacoes.pt/"
            target="_blank"
            rel="noreferrer"
            style={styles.link}
          >
            Livro de Reclamações
          </a>
        </footer>
      </div>
    </main>
  );
}
