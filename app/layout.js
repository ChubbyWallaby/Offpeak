import "./globals.css";

export const metadata = {
  title: "Offpeak.pt — Descontos Fora de Horas | Padel, Bowling e Lazer",
  description:
    "Descubra promoções escondidas em horários off-peak para campos de padel, bowling, cinema e mais em Lisboa e Portugal. Poupe até 50% em lazer fora de horas.",
  keywords: [
    "descontos padel lisboa",
    "campos de padel baratos",
    "reserva padel off-peak",
    "bowling barato lisboa",
    "promoções lazer portugal",
    "actividades baratas lisboa",
    "offpeak.pt",
    "descontos fora de horas",
  ],
  openGraph: {
    title: "Offpeak.pt — Descontos Fora de Horas em Padel, Bowling e Lazer",
    description:
      "Aproveite as suas atividades favoritas por metade do preço. Descubra campos de padel, pistas de bowling e cinemas em Lisboa com descontos off-peak.",
    type: "website",
    locale: "pt_PT",
    siteName: "Offpeak.pt",
    url: "https://offpeak.pt",
  },
  alternates: {
    canonical: "https://offpeak.pt",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
