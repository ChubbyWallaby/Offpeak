import { Analytics } from "@vercel/analytics/next";
import CookieConsent from "./components/CookieConsent";
import { AuthProvider } from "./components/AuthProvider";
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
    images: [
      {
        url: "https://offpeak.pt/og-image.png",
        width: 1200,
        height: 630,
        alt: "Offpeak.pt — Descontos Fora de Horas em Padel, Bowling e Lazer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offpeak.pt — Descontos Fora de Horas em Padel, Bowling e Lazer",
    description:
      "Aproveite as suas atividades favoritas por metade do preço. Descubra campos de padel, pistas de bowling e cinemas em Lisboa com descontos off-peak.",
    images: ["https://offpeak.pt/og-image.png"],
  },
  alternates: {
    canonical: "https://offpeak.pt",
    languages: {
      "pt-PT": "https://offpeak.pt",
      "en-US": "https://offpeak.pt?lang=en",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
          <CookieConsent />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
