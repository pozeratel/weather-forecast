import { useEffect, useState } from "react";
import { getNews } from "../../API/NewsAPI/newsAPI";
import {
  NewsSection,
  NewsContainer,
  NewsHeader,
  NewsTitle,
  NewsList,
  NewsCard,
  NewsImage,
  NewsContent,
  NewsSource,
  NewsHeadline,
  NewsDescription,
  NewsStatus,
  SeeMoreButton,
} from "./News.styled";
import { PageContainer } from "../PageContainer/PageContainer.styled";

const fallbackImage = "/weather-forecast/images/news-fallback.svg";

export const News = ({ city = "Prague" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadNews = async () => {
      setLoading(true);
      setError(false);

      try {
        const nextArticles = await getNews(city);
        if (isCurrentRequest) {
          setArticles(nextArticles);
        }
      } catch (requestError) {
        console.error("Failed to load news:", requestError);
        if (isCurrentRequest) {
          setArticles([]);
          setError(true);
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      isCurrentRequest = false;
    };
  }, [city]);

  return (
    <NewsSection>
      <PageContainer>
        <NewsContainer> 
          <NewsHeader>
            <NewsTitle>Recent News</NewsTitle>
          </NewsHeader>
          {loading ? (
            <NewsStatus>Loading news...</NewsStatus>
          ) : error || !articles.length ? (
            <NewsStatus>News are currently unavailable.</NewsStatus>
          ) : (
            <NewsList>
              {articles.map((article) => (
                <NewsCard key={article.url}>
                  <NewsImage
                    src={article.urlToImage || fallbackImage}
                    alt=""
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = fallbackImage;
                    }}
                  />
                  <NewsContent>
                    <NewsSource>{article.source?.name || "News"}</NewsSource>
                    <NewsHeadline>{article.title}</NewsHeadline>
                    {article.description ? (
                      <NewsDescription>{article.description}</NewsDescription>
                    ) : null}
                  </NewsContent>
                </NewsCard>
              ))}
            </NewsList>
          )}
          {!loading && !error && articles.length ? (
            <SeeMoreButton href={articles[0].url} target="_blank" rel="noreferrer">
              See more
            </SeeMoreButton>
          ) : null}
        </NewsContainer>
      </PageContainer>
    </NewsSection>
  );
};
