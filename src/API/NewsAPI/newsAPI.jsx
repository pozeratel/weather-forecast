const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = "https://newsapi.org/v2/everything";
const ANIMAL_TITLE_PATTERN =
  /\b(animal|pet|dog|pupp(?:y|ies)|cat|kitten|bird|fish|turtle|wildlife|zoo|conservation|endangered)\b/i;

export const getNews = async (city = "Prague") => {
  if (!API_KEY) {
    throw new Error("VITE_NEWS_API_KEY is not configured");
  }

  const query = city.trim() || "Prague";
  const params = new URLSearchParams({
    q: `${query} OR animal OR pet OR dog OR cat OR wildlife OR bird OR turtle`,
    language: "en",
    sortBy: "publishedAt",
    pageSize: "8",
    apiKey: API_KEY,
  });

  const response = await fetch(`${API_URL}?${params}`);
  const data = await response.json();

  if (!response.ok || data.status !== "ok") {
    throw new Error(data.message || "Failed to load news");
  }

  return data.articles
    .filter(
      (article) =>
        article.title &&
        article.url &&
        article.title !== "[Removed]" &&
        ANIMAL_TITLE_PATTERN.test(article.title),
    )
    .slice(0, 4);
};
