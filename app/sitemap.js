export default function sitemap() {
  const baseUrl = "https://offpeak.pt";
  const today = new Date().toISOString().split("T")[0];

  return [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/para-negocios`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
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
