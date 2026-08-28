import { useEffect, useMemo, useState } from "react";
import { FiHeart, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { getCurrentWeather } from "../../API/Weather APi/weatherAPI";
import {
  CityWeatherSection,
  ForecastGrid,
  WeatherCard,
  CardHeader,
  CardTitle,
  CardSubtitle,
  TimeValue,
  ToggleRow,
  ToggleButton,
  ToggleButtonActive,
  DateRow,
  DateText,
  DayText,
  WeatherVisual,
  SunIcon,
  Temperature,
  CardFooter,
  FavoriteButton,
  SeeMoreButton,
  RemoveButton,
  RefreshButton,
} from "./CItyWeather.styled";
import { PageContainer } from "../PageContainer/PageContainer.styled";

const countryNames = {
  CZ: "Czech Republic",
  UA: "Ukraine",
  US: "United States",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  PL: "Poland",
};

const normalizeCityName = (city = "") => city.trim().toLowerCase();

const formatWeatherCard = (weather = {}, updatedAt = Date.now()) => {
  const timestamp = (weather.dt || Date.now() / 1000) * 1000;
  const cityName = weather.name || "Prague";

  return {
    city: cityName,
    cityKey: normalizeCityName(cityName),
    country: countryNames[weather.sys?.country] || "Czech Republic",
    time: new Date(timestamp).toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    date: new Date(timestamp).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    day: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(timestamp),
    ),
    temp: `${Math.round(weather.main?.temp ?? 0)}°C`,
    updatedAt,
  };
};

export const CityWeather = ({
  searchTerm = "",
  cities = [],
  selectedForecast,
  onForecastSelect,
  selectedDetailsCity,
  onDetailsSelect,
  favoriteCities = [],
  onFavoriteToggle,
  onCityRemove,
}) => {
  const [cards, setCards] = useState([]);
  const [loadingCities, setLoadingCities] = useState({});

  useEffect(() => {
    let isCurrentRequest = true;

    const loadWeather = async () => {
      if (!cities.length) {
        if (isCurrentRequest) {
          setCards([]);
        }
        return;
      }

      try {
        const responses = await Promise.allSettled(
          cities.map((city) => getCurrentWeather(city)),
        );

        if (!isCurrentRequest) {
          return;
        }

        const nextCards = responses.flatMap((result) =>
          result.status === "fulfilled" ? [formatWeatherCard(result.value)] : [],
        );

        setCards(nextCards);
      } catch {
        if (isCurrentRequest) {
          setCards([]);
        }
      }
    };

    loadWeather();

    return () => {
      isCurrentRequest = false;
    };
  }, [cities]);

  const handleRefresh = async (city) => {
    const normalizedCity = normalizeCityName(city);
    setLoadingCities((prev) => ({ ...prev, [normalizedCity]: true }));

    try {
      const weather = await getCurrentWeather(city);
      const updatedCard = formatWeatherCard(weather, Date.now());

      setCards((prev) =>
        prev.map((card) =>
          normalizeCityName(card.city) === normalizedCity
            ? { ...card, ...updatedCard, city: updatedCard.city, cityKey: updatedCard.cityKey }
            : card,
        ),
      );
    } catch (error) {
      console.error("Failed to refresh weather:", error);
    } finally {
      setLoadingCities((prev) => ({ ...prev, [normalizedCity]: false }));
    }
  };

  const favoriteSet = useMemo(
    () => new Set(favoriteCities.map((city) => normalizeCityName(city))),
    [favoriteCities],
  );

  const filteredCards = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return cards;
    }

    return cards.filter(({ city, country }) =>
      `${city} ${country}`.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [cards, searchTerm]);

  return (
    <CityWeatherSection>
      <PageContainer>
        <ForecastGrid>
          {filteredCards.length > 0 ? (
            filteredCards.map(({ city, cityKey, country, time, date, day, temp }) => {
              const isFavorite = favoriteSet.has(cityKey || normalizeCityName(city));

              return (
                <WeatherCard key={cityKey || city}>
                  <CardHeader>
                    <div>
                      <CardTitle>{city}</CardTitle>
                      <CardSubtitle>{country}</CardSubtitle>
                    </div>
                    <RefreshButton
                      type="button"
                      onClick={() => handleRefresh(city)}
                      disabled={loadingCities[cityKey || normalizeCityName(city)]}
                      aria-label={`Refresh ${city} weather`}
                      title="Оновити інформацію"
                    >
                      <FiRefreshCw />
                    </RefreshButton>
                  </CardHeader>

                  <TimeValue>{time}</TimeValue>

                  <ToggleRow>
                    {selectedForecast?.type === "hourly" &&
                    selectedForecast.city === city ? (
                      <ToggleButtonActive
                        type="button"
                        onClick={() => onForecastSelect("hourly", city)}
                      >
                        Hourly forecast
                      </ToggleButtonActive>
                    ) : (
                      <ToggleButton
                        type="button"
                        onClick={() => onForecastSelect("hourly", city)}
                      >
                        Hourly forecast
                      </ToggleButton>
                    )}
                    {selectedForecast?.type === "weekly" &&
                    selectedForecast.city === city ? (
                      <ToggleButtonActive
                        type="button"
                        onClick={() => onForecastSelect("weekly", city)}
                      >
                        Weekly forecast
                      </ToggleButtonActive>
                    ) : (
                      <ToggleButton
                        type="button"
                        onClick={() => onForecastSelect("weekly", city)}
                      >
                        Weekly forecast
                      </ToggleButton>
                    )}
                  </ToggleRow>

                  <DateRow>
                    <DateText>{date}</DateText>
                    <DayText>{day}</DayText>
                  </DateRow>

                  <WeatherVisual aria-label={`${city} weather`}>
                    <SunIcon />
                  </WeatherVisual>

                  <Temperature>{temp}</Temperature>

                  <CardFooter>
                    <FavoriteButton
                      type="button"
                      $isFavorite={isFavorite}
                      onClick={() => onFavoriteToggle(city)}
                      aria-label={
                        isFavorite ? `Remove ${city} from favorites` : `Add ${city} to favorites`
                      }
                      aria-pressed={isFavorite}
                      title={
                        isFavorite ? "Remove from favorites" : "Add to favorites"
                      }
                    >
                      <FiHeart />
                    </FavoriteButton>

                    <SeeMoreButton
                      type="button"
                      onClick={() => onDetailsSelect(city)}
                      aria-expanded={selectedDetailsCity === city}
                    >
                      See more
                    </SeeMoreButton>

                    <RemoveButton
                      type="button"
                      onClick={() => onCityRemove(city)}
                      aria-label={`Remove ${city}`}
                      title="Remove card"
                    >
                      <FiTrash2 />
                    </RemoveButton>
                  </CardFooter>
                </WeatherCard>
              );
            })
          ) : (
            <p>No matching cities or countries found.</p>
          )}
        </ForecastGrid>
      </PageContainer>
    </CityWeatherSection>
  );
};
