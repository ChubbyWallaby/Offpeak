import "./globals.css";

export const metadata = {
  title: "Offpeak.pt — Do More, Pay Less, Go Off-Peak",
  description:
    "Discover off-peak discounts for padel, bowling, cinema, and more. Offpeak.pt helps you find cheaper, quieter leisure activities in Portugal.",
  keywords: [
    "off-peak deals",
    "padel discounts",
    "bowling deals",
    "cinema discounts",
    "Portugal leisure",
    "cheap activities",
  ],
  openGraph: {
    title: "Offpeak.pt — Do More, Pay Less, Go Off-Peak",
    description:
      "Find hidden off-peak discounts for activities near you. Same fun, less money, fewer crowds.",
    type: "website",
    locale: "pt_PT",
    siteName: "Offpeak.pt",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
