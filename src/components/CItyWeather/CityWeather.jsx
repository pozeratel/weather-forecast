import { useEffect, useState } from "react";
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

const formatWeatherCard = (weather) => {
  const timestamp = weather.dt * 1000;

  return {
    city: weather.name || "Prague",
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
    temp: `${Math.round(weather.main.temp)}°C`,
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
    const loadWeather = async () => {
      if (!cities.length) {
        setCards([]);
        return;
      }

      try {
        const responses = await Promise.all(
          cities.map((city) => getCurrentWeather(city)),
        );

        const nextCards = responses.map((weather) => formatWeatherCard(weather));

        setCards(nextCards);
      } catch {
        setCards([]);
      }
    };

    loadWeather();
  }, [cities]);

  const handleRefresh = async (city) => {
    setLoadingCities((prev) => ({ ...prev, [city]: true }));
    try {
      const weather = await getCurrentWeather(city);
      const updatedCard = formatWeatherCard(weather);
      setCards((prev) => [
        ...prev.map((card) => 
          card.city === city ? { ...updatedCard } : card
        ),
      ]);
    } catch (error) {
      console.error("Failed to refresh weather:", error);
    } finally {
      setLoadingCities((prev) => ({ ...prev, [city]: false }));
    }
  };

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredCards = normalizedSearchTerm
    ? cards.filter(({ city, country }) =>
        `${city} ${country}`.toLowerCase().includes(normalizedSearchTerm),
      )
    : cards;

  return (
    <CityWeatherSection>
      <PageContainer>
        <ForecastGrid>
        {filteredCards.length > 0 ? (
          filteredCards.map(({ city, country, time, date, day, temp }) => (
            <WeatherCard key={city}>
              <CardHeader>
                <div>
                  <CardTitle>{city}</CardTitle>
                  <CardSubtitle>{country}</CardSubtitle>
                </div>
                <RefreshButton
                  type="button"
                  onClick={() => handleRefresh(city)}
                  disabled={loadingCities[city]}
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
                  $isFavorite={favoriteCities.includes(city)}
                  onClick={() => onFavoriteToggle(city)}
                  aria-label={
                    favoriteCities.includes(city)
                      ? `Remove ${city} from favorites`
                      : `Add ${city} to favorites`
                  }
                  aria-pressed={favoriteCities.includes(city)}
                  title={
                    favoriteCities.includes(city)
                      ? "Remove from favorites"
                      : "Add to favorites"
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
          ))
        ) : (
          <p>No matching cities or countries found.</p>
        )}
        </ForecastGrid>
      </PageContainer>
    </CityWeatherSection>
  );
};
