import { getDeals } from "./actions";

export default async function sitemap() {
  const baseUrl = "https://offpeak.pt";
  const today = new Date().toISOString().split("T")[0];

  let dealEntries = [];
  try {
    const res = await getDeals();
    const deals = res.success ? res.deals : [];
    dealEntries = deals
      .filter((d) => d.slug)
      .map((deal) => ({
        url: `${baseUrl}/deals/${deal.slug}`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.7,
      }));
  } catch (_) {}

  return [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/map`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/para-negocios`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/planos`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...dealEntries,
    {
      url: `${baseUrl}/about`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/grupos`,
      lastModified: today,
      changeFrequency: "hourly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/grupos/criar`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
