import fs from "fs/promises";
import path from "path";
import MapClient from "./MapClient";

export const metadata = {
  title: "Mapa de Ofertas | Offpeak.pt",
  description: "Descubra ofertas off-peak perto de si no mapa interativo.",
};

export default async function MapPage() {
  const dealsPath = path.join(process.cwd(), "app", "deals.json");
  const data = await fs.readFile(dealsPath, "utf-8");
  const deals = JSON.parse(data);
  const mappableDeals = deals.filter((d) => d.lat && d.lng);
  return <MapClient deals={mappableDeals} />;
}
