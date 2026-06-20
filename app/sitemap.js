export default function sitemap() {
  return [
    {
      url: "https://offpeak.pt",
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
