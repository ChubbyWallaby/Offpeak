export const metadata = {
  title: "Para Negócios — Preencha Horas Vazias | Offpeak.pt",
  description:
    "Registe o seu espaço de lazer na Offpeak.pt e atraia clientes nos horários com menor procura. Comissão a partir de 5% por reserva. Padel, bowling, ginásios, restaurantes e mais.",
  keywords: [
    "parceiros offpeak.pt",
    "listar negócio offpeak",
    "descontos off-peak negócios",
    "preencher horas vazias",
    "atrair clientes horários baixa procura",
    "promoções padel bowling",
    "gestão ocupação lazer lisboa",
  ],
  openGraph: {
    title: "Para Negócios — Preencha Horas Vazias | Offpeak.pt",
    description:
      "Transforme os seus horários de baixa procura em receita. Registe o seu espaço de lazer gratuitamente na Offpeak.pt.",
    type: "website",
    locale: "pt_PT",
    siteName: "Offpeak.pt",
    url: "https://offpeak.pt/para-negocios",
  },
  alternates: {
    canonical: "https://offpeak.pt/para-negocios",
  },
};

import PartnerForm from "./PartnerForm";
import YieldCalculator from "./YieldCalculator";

const C = {
  bg: "#f8f9fc",
  surface: "#ffffff",
  border: "#e2e4ea",
  borderLight: "#eef0f5",
  text: "#1e2235",
  textMuted: "#5e6478",
  textLight: "#8b8f9e",
  accent: "#1e2235",
  accentBg: "#eef0f5",
  green: "#166534",
  greenBg: "#f0fdf4",
  greenBorder: "#bbf7d0",
  indigo: "#6235dc",
  indigoBg: "#f0ecfb",
};

const F = {
  base: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  mono: "'SF Mono', 'Fira Code', monospace",
};

const card = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: "12px",
  padding: "28px 32px",
};

export default function ParaNegociosPage() {
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
            href="/"
            style={{
              fontSize: "14px",
              color: C.textMuted,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "16px" }}>←</span>
            Página principal
          </a>
        </div>
      </nav>

      <section
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "80px 24px 72px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: C.greenBg,
            color: C.green,
            border: `1px solid ${C.greenBorder}`,
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 600,
            padding: "5px 14px",
            marginBottom: "28px",
            letterSpacing: "0.2px",
          }}
        >
          Comissão a partir de 5% — sem contratos
        </span>

        <h1
          style={{
            fontSize: "clamp(36px, 5.5vw, 56px)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-1.5px",
            margin: "0 0 24px",
            color: C.text,
          }}
        >
          Rentabilize as suas{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #1e2235 0%, #4a4e68 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            horas vazias
          </span>
        </h1>

        <p
          style={{
            fontSize: "clamp(17px, 2.2vw, 20px)",
            color: C.textMuted,
            maxWidth: "600px",
            margin: "0 auto 40px",
            lineHeight: 1.65,
          }}
        >
          A Offpeak.pt liga os seus horários de baixa ocupação a clientes com
          horários flexíveis que procuram boas propostas. Publique as suas
          promoções existentes e preencha espaços que de outra forma ficariam
          vazios.
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
            href="#registar"
            style={{
              display: "inline-block",
              background: C.text,
              color: "#ffffff",
              padding: "14px 32px",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "16px",
              textDecoration: "none",
              letterSpacing: "-0.2px",
            }}
          >
            Registar o meu negócio →
          </a>
          <a
            href="/planos"
            style={{
              display: "inline-block",
              background: "transparent",
              color: C.text,
              padding: "14px 32px",
              borderRadius: "8px",
              fontWeight: 500,
              fontSize: "16px",
              textDecoration: "none",
              border: `1.5px solid ${C.border}`,
              letterSpacing: "-0.2px",
            }}
          >
            Ver planos e preços
          </a>
        </div>

        <YieldCalculator />
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
            maxWidth: "960px",
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
            Como funciona
          </h2>
          <p
            style={{
              color: C.textMuted,
              textAlign: "center",
              fontSize: "16px",
              marginBottom: "52px",
            }}
          >
            Três passos simples para começar a receber clientes nos seus
            horários livres.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                step: "1",
                title: "Registe-se",
                desc: "Preencha um breve formulário com os dados do seu espaço — nome, localização, categoria e horários habituais. Demora menos de 5 minutos.",
              },
              {
                step: "2",
                title: "Publique horários",
                desc: "Indique os horários que pretende promover e o desconto que está disposto a oferecer. Pode ajustar ou pausar a qualquer momento.",
              },
              {
                step: "3",
                title: "Receba clientes",
                desc: "O seu espaço fica visível para utilizadores que procuram ofertas off-peak. Os interessados contactam-no diretamente ou reservam pelo seu método habitual.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                style={{
                  ...card,
                  position: "relative",
                  paddingTop: "40px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-18px",
                    left: "32px",
                    width: "36px",
                    height: "36px",
                    background: C.text,
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "15px",
                    fontFamily: F.mono,
                  }}
                >
                  {step}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "10px",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: C.textMuted,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: "960px",
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
          Porquê aderir à Offpeak.pt
        </h2>
        <p
          style={{
            color: C.textMuted,
            textAlign: "center",
            fontSize: "16px",
            marginBottom: "52px",
          }}
        >
          Uma plataforma pensada para funcionar sem fricção para os parceiros.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              icon: "€",
              title: "Planos flexíveis",
              desc: "Escolha o modelo ideal: sem risco com 10% por reserva e formulário de reservas, ou subscrição a €19,99/mês com 5%, preços dinâmicos e reservas por WhatsApp. Sem contratos.",
            },
            {
              icon: "🏷",
              title: "Promova descontos existentes",
              desc: "Não é preciso criar novas ofertas do zero. Se já pratica preços reduzidos em certos horários, basta torná-los visíveis a quem os procura.",
            },
            {
              icon: "🎯",
              title: "Alcance novos clientes",
              desc: "Chegamos a pessoas com horários flexíveis — estudantes, freelancers, trabalhadores por turnos — que procuram ativamente boas propostas em lazer.",
            },
            {
              icon: "⚙",
              title: "Controlo total",
              desc: "Define os seus próprios preços, horários e disponibilidade. Pode atualizar ou desativar a listagem quando quiser, sem penalizações.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={card}>
              <div
                style={{
                  fontSize: "26px",
                  marginBottom: "14px",
                  lineHeight: 1,
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  letterSpacing: "-0.2px",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: C.textMuted,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: C.accentBg,
          borderTop: `1px solid ${C.borderLight}`,
          borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        <div
          style={{
            maxWidth: "960px",
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
            Quem pode aderir
          </h2>
          <p
            style={{
              color: C.textMuted,
              textAlign: "center",
              fontSize: "16px",
              maxWidth: "560px",
              margin: "0 auto 48px",
              lineHeight: 1.65,
            }}
          >
            Qualquer espaço de lazer ou entretenimento com horários de baixa
            ocupação é bem-vindo. Alguns exemplos:
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            {[
              "Campos de padel",
              "Pistas de bowling",
              "Cinemas",
              "Ginásios",
              "Spas e centros de bem-estar",
              "Restaurantes",
              "Campos de golfe",
              "Piscinas",
              "Salas de escape",
              "Karting",
              "Campos de ténis",
              "Espaços de lazer indoor",
            ].map((item) => (
              <span
                key={item}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: "20px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: C.text,
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              color: C.textMuted,
              fontSize: "14px",
              marginTop: "28px",
            }}
          >
            Tem um espaço que não está na lista?{" "}
            <a
              href="mailto:info@offpeak.pt"
              style={{ color: C.text, fontWeight: 600 }}
            >
              Entre em contacto
            </a>{" "}
            — provavelmente encaixamos.
          </p>
        </div>
      </section>

      <section
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div
          id="registar"
          style={{
            background: C.surface,
            borderRadius: "16px",
            border: `1px solid ${C.border}`,
            padding: "60px 40px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 800,
              letterSpacing: "-0.8px",
              marginBottom: "8px",
              lineHeight: 1.15,
              textAlign: "center",
            }}
          >
            Registe o seu negócio
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: C.textMuted,
              maxWidth: "460px",
              margin: "0 auto 36px",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Preencha o formulário abaixo. A equipa Offpeak.pt entra em contacto em menos de 48 horas.
          </p>
          <PartnerForm />
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
            Perguntas frequentes
          </h2>
          <p
            style={{
              color: C.textMuted,
              textAlign: "center",
              fontSize: "16px",
              marginBottom: "52px",
            }}
          >
            O que os parceiros costumam querer saber antes de aderir.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {[
              {
                q: "Qual é o modelo de preços para os parceiros?",
                a: "A Offpeak.pt oferece três planos: Sem Risco (10% por reserva, sem custos fixos), Subscrição (€19,99/mês + 5%, com preços dinâmicos e reservas por WhatsApp/link externo), e Grátis (em breve — sem comissão, a Offpeak.pt retém a diferença de preço dinâmico). Todos sem contrato de permanência.",
              },
              {
                q: "Como funciona na prática para o meu negócio?",
                a: "Após o registo, a equipa Offpeak.pt configura a listagem em conjunto consigo. Os clientes interessados veem a sua oferta na plataforma e contactam-no ou reservam pelo método que já utiliza — não mudamos o fluxo operacional do seu negócio.",
              },
              {
                q: "Quanto tempo preciso de dedicar?",
                a: "O esforço inicial é mínimo: um formulário de registo e uma breve troca de e-mails para validar os detalhes. Depois, só precisa de nos avisar quando quiser atualizar horários ou descontos. Não requer gestão diária.",
              },
              {
                q: "Que informações são necessárias para listar o meu espaço?",
                a: "Nome do espaço, morada ou zona, categoria (padel, bowling, ginásio, etc.), horários que pretende promover, desconto ou preço off-peak, e o melhor contacto para os clientes. Fotografia do espaço é opcional mas recomendada.",
              },
              {
                q: "Posso remover ou pausar a listagem?",
                a: "Sim, a qualquer momento. Basta enviar um e-mail para info@offpeak.pt e tratamos do resto. Não existem contratos de permanência nem penalizações por sair.",
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
              { label: "Termos de Utilização", href: "/terms" },
              { label: "Política de Privacidade", href: "/privacy" },
              { label: "Contacto", href: "mailto:info@offpeak.pt" },
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
            © {new Date().getFullYear()} Offpeak.pt — Lisboa, Portugal
          </p>
        </div>
      </footer>
    </div>
  );
}
