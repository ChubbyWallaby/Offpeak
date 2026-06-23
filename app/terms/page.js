import Link from "next/link";

export const metadata = {
  title: "Termos e Condições | Offpeak.pt",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#1e2235",
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
  logo: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    background: "#1e2235",
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
    color: "#5e6478",
    lineHeight: 1.7,
  },
  section: {
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: "1px solid #eef0f5",
  },
  h2: {
    fontSize: "1.15rem",
    margin: "0 0 10px",
  },
  p: {
    margin: "0 0 10px",
    lineHeight: 1.75,
    color: "#5e6478",
  },
  footer: {
    marginTop: "32px",
    paddingTop: "20px",
    borderTop: "1px solid #e2e4ea",
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#8b8f9e",
    fontSize: "0.95rem",
  },
  link: {
    color: "#1e2235",
    textDecoration: "underline",
    textUnderlineOffset: "2px",
  },
};

export default function TermsPage() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <Link href="/" style={styles.brand} aria-label="Voltar à página inicial da Offpeak.pt">
            <span>offpeak<span style={{display:'inline-block',width:'0.5rem',height:'0.5rem',borderRadius:'50%',background:'#22c55e',marginLeft:'0.05rem'}}></span>pt</span>
          </Link>
        </header>

        <h1 style={styles.title}>Termos e Condições</h1>
        <p style={styles.intro}>
          Estes Termos e Condições regulam o acesso e a utilização da plataforma
          Offpeak.pt. Ao utilizar o site, o utilizador declara que leu,
          compreendeu e aceita o presente documento.
        </p>

        <section style={styles.section}>
          <h2 style={styles.h2}>1. Identificação do prestador</h2>
          <p style={styles.p}>
            O serviço é prestado pela entidade que opera a plataforma Offpeak.pt,
            com contacto eletrónico em{" "}
            <a href="mailto:info@offpeak.pt" style={styles.link}>info@offpeak.pt</a>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>2. Objeto do serviço</h2>
          <p style={styles.p}>
            A Offpeak.pt é uma plataforma de descoberta que liga consumidores a
            negócios de lazer que disponibilizam descontos em períodos de menor
            afluência. Neste momento, a Offpeak.pt não processa pagamentos nem
            realiza reservas diretamente.
          </p>
          <p style={styles.p}>
            O objetivo do serviço é facilitar o encontro entre utilizadores e
            parceiros comerciais, sem prejuízo de os termos finais da relação
            comercial poderem ser definidos entre o utilizador e o parceiro.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>3. Condições de utilização</h2>
          <p style={styles.p}>
            A utilização da plataforma é reservada a pessoas com idade igual ou
            superior a 18 anos. O utilizador compromete-se a fornecer informação
            verdadeira, atualizada e completa sempre que tal seja solicitado,
            respondendo pela sua exatidão.
          </p>
          <p style={styles.p}>
            O utilizador obriga-se ainda a usar a plataforma de forma lícita,
            responsável e conforme a boa-fé, abstendo-se de práticas que possam
            prejudicar a Offpeak.pt, os seus parceiros ou terceiros.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>4. Responsabilidade</h2>
          <p style={styles.p}>
            A Offpeak.pt atua como intermediária na divulgação de ofertas e não é
            responsável pela execução dos serviços prestados pelos parceiros,
            incluindo a respetiva qualidade, disponibilidade, segurança, higiene,
            atendimento ou cumprimento de condições comerciais específicas.
          </p>
          <p style={styles.p}>
            Quaisquer reclamações relativas ao serviço efetivamente prestado por um
            parceiro devem ser dirigidas ao respetivo operador, sem prejuízo da
            colaboração razoável da Offpeak.pt na mediação de contactos quando tal
            seja possível.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>5. Propriedade intelectual</h2>
          <p style={styles.p}>
            Todos os conteúdos disponibilizados na Offpeak.pt, incluindo textos,
            marcas, logótipos, imagens, grafismos, estrutura, seleção e organização
            de conteúdos, são propriedade da Offpeak.pt ou de terceiros que tenham
            autorizado o seu uso, estando protegidos pela legislação aplicável.
          </p>
          <p style={styles.p}>
            É proibida a reprodução, distribuição, transformação, comunicação ao
            público ou qualquer outra utilização não autorizada dos conteúdos,
            salvo consentimento expresso e por escrito.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>6. Proteção de dados</h2>
          <p style={styles.p}>
            O tratamento de dados pessoais é efetuado nos termos da legislação
            aplicável. Para mais informação sobre as categorias de dados tratados,
            finalidades, bases legais e direitos dos titulares, o utilizador deve
            consultar a{" "}
            <Link href="/privacy" style={styles.link}>Política de Privacidade</Link>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>7. Comunicações comerciais</h2>
          <p style={styles.p}>
            Ao fornecer o seu endereço de correio eletrónico, o utilizador consente
            em receber comunicações promocionais e informativas da Offpeak.pt sobre
            campanhas, novidades e oportunidades relevantes. O utilizador pode
            cancelar estas comunicações a qualquer momento através do mecanismo de
            unsubscribe incluído nas mensagens ou por contacto para{" "}
            <a href="mailto:info@offpeak.pt" style={styles.link}>info@offpeak.pt</a>.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>8. Alterações aos termos</h2>
          <p style={styles.p}>
            A Offpeak.pt poderá alterar estes Termos e Condições a qualquer momento,
            sempre que tal se justifique por razões legais, operacionais ou
            comerciais. Quando exista alteração material, os utilizadores poderão
            ser notificados por correio eletrónico, sem prejuízo da publicação da
            versão atualizada no site.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>9. Lei aplicável</h2>
          <p style={styles.p}>
            Os presentes Termos e Condições são regidos pela lei portuguesa. Para
            a resolução de quaisquer litígios emergentes da utilização da plataforma
            que não sejam solucionados por acordo, é competente o foro da comarca de
            Lisboa, com renúncia expressa a qualquer outro.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>10. Resolução alternativa de litígios</h2>
          <p style={styles.p}>
            Em caso de litígio de consumo, o utilizador pode recorrer ao Livro de
            Reclamações físico ou eletrónico e à Plataforma Europeia de Resolução de
            Litígios em Linha (ODR), disponível em{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" style={styles.link}>
              https://ec.europa.eu/consumers/odr
            </a>.
          </p>
        </section>

        <footer style={styles.footer}>
          <span>&copy; {new Date().getFullYear()} Offpeak.pt</span>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link href="/" style={styles.link}>Início</Link>
            <Link href="/privacy" style={styles.link}>Privacidade</Link>
            <Link href="/contact" style={styles.link}>Contacto</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
