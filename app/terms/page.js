import Link from 'next/link';

export const metadata = {
  title: 'Termos e Condições | Offpeak.pt',
};

export default function TermsPage() {
  return (
    <main>
      <header>
        <nav aria-label="Navegação principal">
          <Link href="/" aria-label="Ir para a página inicial">
            Offpeak.pt
          </Link>
        </nav>
      </header>

      <section>
        <h1>Termos e Condições</h1>
        <p>
          Estes Termos e Condições regulam o acesso e a utilização da plataforma
          Offpeak.pt. Ao utilizar o site, o utilizador declara que leu,
          compreendeu e aceita o presente documento.
        </p>
      </section>

      <section>
        <h2>1. Identificação do prestador</h2>
        <p>
          O serviço é prestado por <strong>[NOME DA EMPRESA, LDA]</strong>, com
          NIF <strong>[A PREENCHER]</strong>, sede em <strong>[MORADA A PREENCHER]</strong>,
          e contacto eletrónico em <a href="mailto:hello@offpeak.pt">hello@offpeak.pt</a>.
        </p>
      </section>

      <section>
        <h2>2. Objeto do serviço</h2>
        <p>
          A Offpeak.pt é uma plataforma de descoberta que liga consumidores a
          negócios de lazer que disponibilizam descontos em períodos de menor
          afluência. Neste momento, a Offpeak.pt não processa pagamentos nem
          realiza reservas diretamente.
        </p>
        <p>
          O objetivo do serviço é facilitar o encontro entre utilizadores e
          parceiros comerciais, sem prejuízo de os termos finais da relação
          comercial poderem ser definidos entre o utilizador e o parceiro.
        </p>
      </section>

      <section>
        <h2>3. Condições de utilização</h2>
        <p>
          A utilização da plataforma é reservada a pessoas com idade igual ou
          superior a 18 anos. O utilizador compromete-se a fornecer informação
          verdadeira, atualizada e completa sempre que tal seja solicitado,
          respondendo pela sua exatidão.
        </p>
        <p>
          O utilizador obriga-se ainda a usar a plataforma de forma lícita,
          responsável e conforme a boa-fé, abstendo-se de práticas que possam
          prejudicar a Offpeak.pt, os seus parceiros ou terceiros.
        </p>
      </section>

      <section>
        <h2>4. Responsabilidade</h2>
        <p>
          A Offpeak.pt atua como intermediária na divulgação de ofertas e não é
          responsável pela execução dos serviços prestados pelos parceiros,
          incluindo a respetiva qualidade, disponibilidade, segurança, higiene,
          atendimento ou cumprimento de condições comerciais específicas.
        </p>
        <p>
          Quaisquer reclamações relativas ao serviço efetivamente prestado por um
          parceiro devem ser dirigidas ao respetivo operador, sem prejuízo da
          colaboração razoável da Offpeak.pt na mediação de contactos quando tal
          seja possível.
        </p>
      </section>

      <section>
        <h2>5. Propriedade intelectual</h2>
        <p>
          Todos os conteúdos disponibilizados na Offpeak.pt, incluindo textos,
          marcas, logótipos, imagens, grafismos, estrutura, seleção e organização
          de conteúdos, são propriedade da Offpeak.pt ou de terceiros que tenham
          autorizado o seu uso, estando protegidos pela legislação aplicável.
        </p>
        <p>
          É proibida a reprodução, distribuição, transformação, comunicação ao
          público ou qualquer outra utilização não autorizada dos conteúdos,
          salvo consentimento expresso e por escrito.
        </p>
      </section>

      <section>
        <h2>6. Proteção de dados</h2>
        <p>
          O tratamento de dados pessoais é efetuado nos termos da legislação
          aplicável. Para mais informação sobre as categorias de dados tratados,
          finalidades, bases legais e direitos dos titulares, o utilizador deve
          consultar a <Link href="/privacy">Política de Privacidade</Link>.
        </p>
      </section>

      <section>
        <h2>7. Comunicações comerciais</h2>
        <p>
          Ao fornecer o seu endereço de correio eletrónico, o utilizador consente
          em receber comunicações promocionais e informativas da Offpeak.pt sobre
          campanhas, novidades e oportunidades relevantes. O utilizador pode
          cancelar estas comunicações a qualquer momento através do mecanismo de
          unsubscribe incluído nas mensagens ou por contacto para hello@offpeak.pt.
        </p>
      </section>

      <section>
        <h2>8. Alterações aos termos</h2>
        <p>
          A Offpeak.pt poderá alterar estes Termos e Condições a qualquer momento,
          sempre que tal se justifique por razões legais, operacionais ou
          comerciais. Quando exista alteração material, os utilizadores poderão
          ser notificados por correio eletrónico, sem prejuízo da publicação da
          versão atualizada no site.
        </p>
      </section>

      <section>
        <h2>9. Lei aplicável</h2>
        <p>
          Os presentes Termos e Condições são regidos pela lei portuguesa. Para
          a resolução de quaisquer litígios emergentes da utilização da plataforma
          que não sejam solucionados por acordo, é competente o foro da comarca de
          Lisboa, com renúncia expressa a qualquer outro.
        </p>
      </section>

      <section>
        <h2>10. Resolução alternativa de litígios</h2>
        <p>
          Em caso de litígio de consumo, o utilizador pode recorrer ao Livro de
          Reclamações físico ou eletrónico e à Plataforma Europeia de Resolução de
          Litígios em Linha (ODR), disponível em{' '}
          <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>.
        </p>
      </section>

      <section>
        <p>
          <Link href="/">Voltar à página inicial</Link>
        </p>
      </section>

      <footer>
        <p>© 2026 Offpeak.pt · Feito em Portugal</p>
      </footer>
    </main>
  );
}
