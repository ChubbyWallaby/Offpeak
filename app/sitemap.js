import fs from "fs";
import path from "path";

export default function sitemap() {
  const baseUrl = "https://offpeak.pt";
  const today = new Date().toISOString().split("T")[0];

  const dealsPath = path.join(process.cwd(), "app", "deals.json");
  let dealEntries = [];
  try {
    const data = fs.readFileSync(dealsPath, "utf-8");
    const deals = JSON.parse(data);
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
  ];
}
