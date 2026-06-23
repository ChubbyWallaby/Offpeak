import Link from "next/link";

export const metadata = {
  title: "Perguntas Frequentes | Offpeak.pt",
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
  item: {
    marginBottom: "18px",
    paddingBottom: "18px",
    borderBottom: "1px solid #f3f4f6",
  },
  question: {
    margin: "0 0 8px",
    fontSize: "1.05rem",
  },
  answer: {
    margin: 0,
    color: "#374151",
    lineHeight: 1.75,
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

const faqs = [
  [
    "O que é a Offpeak.pt?",
    "É uma plataforma portuguesa que ajuda pessoas a descobrir ofertas de lazer com preços mais baixos em horários de menor procura. Estamos em early access e a oferta continua a crescer.",
  ],
  [
    "Os descontos são reais?",
    "Sim, os descontos vêm dos parceiros que aderem à plataforma. Neste momento, a seleção é limitada e estamos a validar novas ofertas antes do lançamento completo.",
  ],
  [
    "Como funciona a reserva?",
    "A funcionalidade de reserva ainda está a ser desenvolvida. Por agora, a Offpeak.pt serve sobretudo para descoberta de ofertas e para indicar onde existem condições off-peak.",
  ],
  [
    "Preciso pagar para me registar?",
    "Não. O registo para utilizadores será gratuito. Algumas funcionalidades poderão ser introduzidas gradualmente, mas o acesso base não terá custo.",
  ],
  [
    "Posso cancelar a minha subscrição?",
    "Sim. Quando a subscrição estiver disponível, poderá cancelar a qualquer momento. Se já estiver inscrito nas comunicações, pode pedir remoção por e-mail.",
  ],
  [
    "Que tipo de atividades estão disponíveis?",
    "Trabalhamos com atividades de lazer como padel, bowling, cinema, spa e outras experiências semelhantes em Lisboa.",
  ],
  [
    "A Offpeak está disponível fora de Lisboa?",
    "Ainda não. Estamos concentrados em Lisboa enquanto validamos o produto e adicionamos parceiros. Outras cidades poderão ser consideradas mais tarde.",
  ],
  [
    "Como posso listar o meu negócio?",
    "Envie-nos um e-mail para info@offpeak.pt com a informação do seu espaço, horários mais calmos e a oferta que pretende divulgar.",
  ],
  [
    "Os meus dados estão seguros?",
    "Tratamos os dados de forma cuidadosa e limitada ao necessário. Ainda assim, como estamos em pré-lançamento, continuamos a reforçar processos e medidas de segurança.",
  ],
  [
    "Como contactar o suporte?",
    "Pode contactar-nos por e-mail através de info@offpeak.pt. Respondemos normalmente em 24-48 horas úteis.",
  ],
];

export default function FaqPage() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <Link href="/" style={styles.brand} aria-label="Ir para a página inicial">
            offpeak<span style={{display:'inline-block',width:'0.5rem',height:'0.5rem',borderRadius:'50%',background:'#22c55e',marginLeft:'0.05rem'}}></span>pt
          </Link>
          <Link href="/" style={styles.backLink} aria-label="Voltar à página inicial">
            ← Voltar
          </Link>
        </header>

        <h1 style={styles.title}>Perguntas Frequentes</h1>

        {faqs.map(([question, answer]) => (
          <section key={question} style={styles.item}>
            <h2 style={styles.question}>{question}</h2>
            <p style={styles.answer}>{answer}</p>
          </section>
        ))}

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
