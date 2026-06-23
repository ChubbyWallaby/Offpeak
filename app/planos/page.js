export const metadata = {
  title: "Planos para Parceiros | Offpeak.pt",
  description:
    "Escolha o plano ideal para o seu negócio. Sem risco com 10% por reserva, subscrição com preços dinâmicos e reservas por WhatsApp, ou plano gratuito (em breve).",
  openGraph: {
    title: "Planos para Parceiros | Offpeak.pt",
    description:
      "Três planos flexíveis para listar o seu espaço na Offpeak.pt. Sem contratos de permanência.",
    type: "website",
    locale: "pt_PT",
    siteName: "Offpeak.pt",
    url: "https://offpeak.pt/planos",
  },
  alternates: {
    canonical: "https://offpeak.pt/planos",
  },
};

const C = {
  bg: "#f8f9fc",
  surface: "#ffffff",
  border: "#e2e4ea",
  borderLight: "#eef0f5",
  text: "#1e2235",
  textMuted: "#5e6478",
  textLight: "#8b8f9e",
  accent: "#1e2235",
  indigo: "#6235dc",
  indigoBg: "#f0ecfb",
  green: "#22c55e",
  greenDark: "#166534",
  greenBg: "#f0fdf4",
  greenBorder: "#bbf7d0",
};

const F = {
  base: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  mono: "'SF Mono', 'Fira Code', monospace",
};

const plans = [
  {
    name: "Sem Risco",
    badge: "Recomendado",
    price: "0",
    priceLabel: "€/mês",
    commission: "10%",
    commissionLabel: "por reserva",
    description:
      "Ideal para quem quer experimentar sem compromisso. Sem custos fixos — paga apenas quando recebe clientes.",
    features: [
      { text: "Sem mensalidades", included: true },
      { text: "Sem contratos de permanência", included: true },
      { text: "Listagem na plataforma", included: true },
      { text: "Reservas por formulário", included: true },
      { text: "Suporte por e-mail", included: true },
      { text: "Reservas por WhatsApp / link externo", included: false },
      { text: "Preços dinâmicos automáticos", included: false },
      { text: "Listagem prioritária", included: false },
    ],
    cta: "Começar agora",
    highlighted: true,
  },
  {
    name: "Subscrição",
    badge: null,
    price: "19,99",
    priceLabel: "€/mês",
    commission: "5%",
    commissionLabel: "por reserva",
    description:
      "Para negócios que querem maximizar resultados com preços dinâmicos, múltiplos canais de reserva e comissão reduzida.",
    features: [
      { text: "Comissão reduzida de 5%", included: true },
      { text: "Sem contratos de permanência", included: true },
      { text: "Listagem prioritária na plataforma", included: true },
      { text: "Reservas por formulário", included: true },
      { text: "Reservas por WhatsApp / link externo", included: true },
      { text: "Preços dinâmicos automáticos", included: true },
      { text: "Suporte prioritário", included: true },
    ],
    cta: "Escolher Subscrição",
    highlighted: false,
  },
  {
    name: "Grátis",
    badge: "Em breve",
    price: "0",
    priceLabel: "€/mês",
    commission: "0%",
    commissionLabel: "comissão direta",
    description:
      "Sem custos para o parceiro. Os pagamentos são processados pela Offpeak.pt, que aplica preços dinâmicos e retém a diferença.",
    features: [
      { text: "Sem mensalidades nem comissão direta", included: true },
      { text: "Sem contratos de permanência", included: true },
      { text: "Listagem na plataforma", included: true },
      { text: "Pagamentos processados pela Offpeak.pt", included: true },
      { text: "Preços dinâmicos geridos pela Offpeak.pt", included: true },
      { text: "Suporte por e-mail", included: true },
    ],
    cta: "Notifiquem-me",
    highlighted: false,
    comingSoon: true,
  },
];

export default function PlanosPage() {
  return (
    <div
      style={{
        fontFamily: F.base,
        background: C.bg,
        color: C.text,
        minHeight: "100vh",
        lineHeight: 1.6,
      }}
    >
      <nav
        style={{
          borderBottom: `1px solid ${C.border}`,
          background: C.surface,
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "0 24px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            style={{
              fontWeight: 700,
              fontSize: "17px",
              color: C.text,
              textDecoration: "none",
              letterSpacing: "-0.3px",
            }}
          >
            offpeak<span style={{display:'inline-block',width:'0.5rem',height:'0.5rem',borderRadius:'50%',background:'#22c55e',marginLeft:'0.05rem'}}></span>pt
          </a>
          <a
            href="/para-negocios"
            style={{
              fontSize: "14px",
              color: C.textMuted,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "16px" }}>&#8592;</span>
            Para Negócios
          </a>
        </div>
      </nav>

      <section
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "80px 24px 24px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-1.5px",
            margin: "0 0 16px",
          }}
        >
          Planos para parceiros
        </h1>
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            color: C.textMuted,
            maxWidth: "540px",
            margin: "0 auto 56px",
            lineHeight: 1.65,
          }}
        >
          Três modelos, um objetivo: preencher os seus horários vazios. Escolha
          o que faz mais sentido para o seu negócio.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            maxWidth: "960px",
            margin: "0 auto 80px",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: C.surface,
                border: plan.highlighted
                  ? `2px solid ${C.text}`
                  : `1px solid ${C.border}`,
                borderRadius: "16px",
                padding: "36px 28px",
                textAlign: "left",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                opacity: plan.comingSoon ? 0.75 : 1,
              }}
            >
              {plan.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "24px",
                    background: plan.comingSoon ? C.textLight : C.text,
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "12px",
                    letterSpacing: "0.3px",
                  }}
                >
                  {plan.badge}
                </span>
              )}

              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  letterSpacing: "-0.4px",
                }}
              >
                {plan.name}
              </h2>

              <div style={{ marginBottom: "8px" }}>
                <span
                  style={{
                    fontSize: "42px",
                    fontWeight: 800,
                    letterSpacing: "-2px",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    color: C.textMuted,
                    marginLeft: "4px",
                  }}
                >
                  {plan.priceLabel}
                </span>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: C.greenBg,
                  border: `1px solid ${C.greenBorder}`,
                  borderRadius: "16px",
                  padding: "4px 12px",
                  marginBottom: "20px",
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: C.greenDark,
                  }}
                >
                  {plan.commission}
                </span>
                <span style={{ fontSize: "13px", color: C.greenDark }}>
                  {plan.commissionLabel}
                </span>
              </div>

              <p
                style={{
                  fontSize: "15px",
                  color: C.textMuted,
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}
              >
                {plan.description}
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                  flex: 1,
                }}
              >
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    style={{
                      fontSize: "14px",
                      color: f.included ? C.text : C.textLight,
                      padding: "8px 0",
                      borderBottom: `1px solid ${C.borderLight}`,
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      textDecoration: f.included ? "none" : "line-through",
                    }}
                  >
                    <span style={{ color: f.included ? C.green : C.textLight, fontSize: "16px", flexShrink: 0 }}>
                      {f.included ? "\u2713" : "\u2014"}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <a
                href={plan.comingSoon ? "mailto:info@offpeak.pt?subject=Plano%20Gr%C3%A1tis%20%E2%80%94%20Interesse" : "/para-negocios#registar"}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: plan.highlighted ? C.text : "transparent",
                  color: plan.highlighted ? "#ffffff" : C.text,
                  border: plan.highlighted
                    ? "none"
                    : `1.5px solid ${C.border}`,
                  padding: "14px 24px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "15px",
                  textDecoration: "none",
                  letterSpacing: "-0.2px",
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: C.surface,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            padding: "72px 24px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.6px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            Comparação detalhada
          </h2>
          <p
            style={{
              color: C.textMuted,
              textAlign: "center",
              fontSize: "16px",
              marginBottom: "40px",
            }}
          >
            Tudo o que está incluído em cada plano.
          </p>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      borderBottom: `2px solid ${C.border}`,
                      color: C.textLight,
                      fontWeight: 600,
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  ></th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      borderBottom: `2px solid ${C.border}`,
                      fontWeight: 700,
                    }}
                  >
                    Sem Risco
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      borderBottom: `2px solid ${C.border}`,
                      fontWeight: 700,
                    }}
                  >
                    Subscrição
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      padding: "12px 16px",
                      borderBottom: `2px solid ${C.border}`,
                      fontWeight: 700,
                      color: C.textLight,
                    }}
                  >
                    Grátis
                    <span style={{ display: "block", fontSize: "10px", fontWeight: 500, marginTop: "2px" }}>Em breve</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Custo mensal", norisk: "\u20ac0", sub: "\u20ac19,99", free: "\u20ac0" },
                  { feature: "Comissão por reserva", norisk: "10%", sub: "5%", free: "0%" },
                  { feature: "Modelo de receita", norisk: "Comissão", sub: "Comissão", free: "Offpeak retém a diferença de preço" },
                  { feature: "Contrato mínimo", norisk: "Nenhum", sub: "Nenhum", free: "Nenhum" },
                  { feature: "Listagem na plataforma", norisk: "\u2713", sub: "\u2713", free: "\u2713" },
                  { feature: "Listagem prioritária", norisk: "\u2014", sub: "\u2713", free: "\u2014" },
                  { feature: "Reservas por formulário", norisk: "\u2713", sub: "\u2713", free: "\u2014" },
                  { feature: "Reservas WhatsApp / link externo", norisk: "\u2014", sub: "\u2713", free: "\u2014" },
                  { feature: "Pagamento processado pela Offpeak", norisk: "\u2014", sub: "\u2014", free: "\u2713" },
                  { feature: "Preços dinâmicos", norisk: "\u2014", sub: "\u2713", free: "Gerido pela Offpeak" },
                  { feature: "Suporte", norisk: "E-mail", sub: "Prioritário", free: "E-mail" },
                ].map(({ feature, norisk, sub, free }) => (
                  <tr key={feature}>
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: `1px solid ${C.borderLight}`,
                        fontWeight: 500,
                        color: C.text,
                      }}
                    >
                      {feature}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: `1px solid ${C.borderLight}`,
                        textAlign: "center",
                        color: C.textMuted,
                      }}
                    >
                      {norisk}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: `1px solid ${C.borderLight}`,
                        textAlign: "center",
                        color: C.textMuted,
                      }}
                    >
                      {sub}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        borderBottom: `1px solid ${C.borderLight}`,
                        textAlign: "center",
                        color: C.textLight,
                        fontSize: "13px",
                      }}
                    >
                      {free}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "72px 24px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "-0.6px",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          Perguntas sobre planos
        </h2>
        <p
          style={{
            color: C.textMuted,
            textAlign: "center",
            fontSize: "16px",
            marginBottom: "40px",
          }}
        >
          Dúvidas comuns sobre os nossos modelos de parceria.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            {
              q: "Posso mudar de plano a qualquer momento?",
              a: "Sim. Pode alternar entre planos sempre que quiser. Basta contactar-nos por e-mail e a mudança é aplicada no início do ciclo seguinte.",
            },
            {
              q: "Como é que a comissão é cobrada?",
              a: "Nos planos Sem Risco e Subscrição, a comissão é calculada sobre o valor de cada reserva concretizada. Emitimos uma fatura mensal com o resumo. No plano Grátis, não há comissão — a Offpeak.pt aplica preços dinâmicos e retém a diferença entre o preço publicado e o preço base do parceiro.",
            },
            {
              q: "O que são preços dinâmicos?",
              a: "Os preços dinâmicos ajustam o valor da oferta automaticamente com base na procura, horário e ocupação. No plano Subscrição, o parceiro tem controlo total sobre esta funcionalidade. No plano Grátis, os preços são geridos pela Offpeak.pt.",
            },
            {
              q: "Existe um período de fidelização?",
              a: "Não. Todos os planos funcionam sem contrato de permanência. Pode cancelar a qualquer momento sem penalizações, custos adicionais ou perguntas.",
            },
            {
              q: "Quando estará disponível o plano Grátis?",
              a: "O plano Grátis está em fase de preparação. Se tiver interesse, envie-nos um e-mail para info@offpeak.pt e será notificado assim que estiver disponível.",
            },
          ].map(({ q, a }, i) => (
            <div
              key={i}
              style={{
                borderBottom: `1px solid ${C.border}`,
                padding: "24px 0",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  letterSpacing: "-0.2px",
                  lineHeight: 1.45,
                }}
              >
                {q}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: C.textMuted,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: C.text,
          color: "#ffffff",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "72px 24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-0.8px",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Pronto para preencher as suas horas vazias?
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#8b8f9e",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}
          >
            Registe-se em menos de 5 minutos. A equipa Offpeak.pt entra em
            contacto em 48 horas.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/para-negocios#registar"
              style={{
                display: "inline-block",
                background: "#ffffff",
                color: C.text,
                padding: "14px 32px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                letterSpacing: "-0.2px",
              }}
            >
              Registar o meu negócio
            </a>
            <a
              href="mailto:info@offpeak.pt"
              style={{
                display: "inline-block",
                background: "transparent",
                color: "#ffffff",
                padding: "14px 32px",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "16px",
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.2)",
                letterSpacing: "-0.2px",
              }}
            >
              Falar connosco
            </a>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: `1px solid ${C.border}`,
          background: C.surface,
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <a
            href="/"
            style={{
              fontWeight: 700,
              fontSize: "16px",
              color: C.text,
              textDecoration: "none",
              letterSpacing: "-0.3px",
            }}
          >
            offpeak.pt
          </a>

          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              { label: "Página principal", href: "/" },
              { label: "Para Negócios", href: "/para-negocios" },
              { label: "Termos", href: "/terms" },
              { label: "Privacidade", href: "/privacy" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: "13px",
                  color: C.textMuted,
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <p
            style={{
              fontSize: "12px",
              color: C.textLight,
              margin: 0,
            }}
          >
            &copy; {new Date().getFullYear()} Offpeak.pt &mdash; Lisboa, Portugal
          </p>
        </div>
      </footer>
    </div>
  );
}
