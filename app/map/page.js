import MapClient from "./MapClient";
import { getDeals } from "../actions";

export const metadata = {
  title: "Mapa de Ofertas | Offpeak.pt",
  description: "Descubra ofertas off-peak perto de si no mapa interativo.",
};

export default async function MapPage() {
  const res = await getDeals();
  const deals = res.success ? res.deals : [];
  const mappableDeals = deals.filter((d) => d.lat && d.lng);
  return <MapClient deals={mappableDeals} />;
}
